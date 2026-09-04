// ReturnToKin — Express API Server
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { db, generateCaseId, uuid, auditLog } = require('./db');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const JWT_SECRET = process.env.JWT_SECRET || 'rtk-dev-secret-change-in-production';
const PORT = process.env.PORT || 4000;

// File upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

// ── Auth Middleware ──────────────────────────────────────────────
function auth(roles = []) {
  return (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Authentication required.' } });
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions.' } });
      }
      next();
    } catch {
      return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid or expired token.' } });
    }
  };
}

// ── Auth Routes ──────────────────────────────────────────────────
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: { code: 'VALIDATION', message: 'Email and password required.' } });
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) return res.status(409).json({ error: { code: 'CONFLICT', message: 'Email already registered.' } });
    const id = uuid();
    const hash = bcrypt.hashSync(password, 10);
    db.prepare('INSERT INTO users (id, email, password_hash, name) VALUES (?,?,?,?)').run(id, email, hash, name || null);
    const token = jwt.sign({ id, email, role: 'user', trust_level: 0 }, JWT_SECRET, { expiresIn: '7d' });
    auditLog(id, 'signup', 'user', id, 'User signed up');
    res.status(201).json({ token, user: { id, email, name, role: 'user', trust_level: 0 } });
  } catch (e) { res.status(500).json({ error: { code: 'SERVER', message: e.message } }); }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user || !bcrypt.compareSync(password || '', user.password_hash)) {
      return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid email or password.' } });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role, trust_level: user.trust_level }, JWT_SECRET, { expiresIn: '7d' });
    auditLog(user.id, 'login', 'user', user.id, 'User logged in');
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role, trust_level: user.trust_level } });
  } catch (e) { res.status(500).json({ error: { code: 'SERVER', message: e.message } }); }
});

app.get('/api/auth/me', auth(), (req, res) => {
  const user = db.prepare('SELECT id, email, name, role, trust_level, language FROM users WHERE id = ?').get(req.user.id);
  res.json({ user });
});

// ── Person Routes ────────────────────────────────────────────────
app.post('/api/persons', auth(), (req, res) => {
  try {
    const id = uuid();
    const { first_name, family_name, nickname, gender, date_of_birth, approximate_age, nationality, languages,
      height, build, hair, eyes, skin_tone, facial_hair, tattoos, scars, birthmarks, disability, other_features } = req.body;
    db.prepare(`INSERT INTO persons (id, first_name, family_name, nickname, gender, date_of_birth, approximate_age,
      nationality, languages, height, build, hair, eyes, skin_tone, facial_hair, tattoos, scars, birthmarks, disability, other_features)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(id, first_name, family_name, nickname, gender, date_of_birth,
      approximate_age, nationality, languages, height, build, hair, eyes, skin_tone, facial_hair, tattoos, scars, birthmarks, disability, other_features);
    auditLog(req.user.id, 'create_person', 'person', id, 'Created person record');
    res.status(201).json({ person: db.prepare('SELECT * FROM persons WHERE id = ?').get(id) });
  } catch (e) { res.status(500).json({ error: { code: 'SERVER', message: e.message } }); }
});

// ── Case Routes ──────────────────────────────────────────────────
app.post('/api/cases', auth(), (req, res) => {
  try {
    const caseId = uuid();
    const displayId = generateCaseId();
    const {
      person_id, last_seen_date, last_seen_country, last_seen_city, last_seen_area,
      last_seen_destination, last_seen_transport, last_seen_companions, last_seen_clothing,
      circumstances, circumstance_type, description, risk_level, flags
    } = req.body;
    if (!person_id) return res.status(400).json({ error: { code: 'VALIDATION', message: 'person_id is required.' } });
    db.prepare(`INSERT INTO cases (id, display_id, person_id, status, visibility, risk_level, flags,
      last_seen_date, last_seen_country, last_seen_city, last_seen_area, last_seen_destination,
      last_seen_transport, last_seen_companions, last_seen_clothing, circumstances, circumstance_type,
      description, reporter_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(
      caseId, displayId, person_id, 'pending_verification', 'private', risk_level || 'unknown',
      flags || null, last_seen_date, last_seen_country, last_seen_city, last_seen_area,
      last_seen_destination, last_seen_transport, last_seen_companions, last_seen_clothing,
      circumstances, circumstance_type, description, req.user.id);
    // Link reporter
    db.prepare('INSERT INTO case_reporters (id, case_id, user_id, relationship, is_primary) VALUES (?,?,?,?,?)').run(uuid(), caseId, req.user.id, req.body.relationship || 'self', 1);
    auditLog(req.user.id, 'create_case', 'case', caseId, `Created case ${displayId}`);
    res.status(201).json({ case: db.prepare('SELECT * FROM cases WHERE id = ?').get(caseId) });
  } catch (e) { res.status(500).json({ error: { code: 'SERVER', message: e.message } }); }
});

app.get('/api/cases', auth(), (req, res) => {
  const cases = db.prepare(`SELECT c.*, p.first_name, p.family_name, p.nationality,
    (SELECT MIN(i.file_data) FROM person_images i WHERE i.person_id = c.person_id AND i.is_primary = 1) as primary_image
    FROM cases c JOIN persons p ON p.id = c.person_id WHERE c.reporter_id = ? ORDER BY c.created_at DESC`).all(req.user.id);
  res.json({ cases });
});

app.get('/api/cases/public', (req, res) => {
  const { search, country, city, status } = req.query;
  let sql = `SELECT c.id, c.display_id, c.status, c.last_seen_date, c.last_seen_country, c.last_seen_city,
    c.risk_level, c.circumstance_type, p.first_name, p.family_name, p.approximate_age, p.nationality,
    (SELECT MIN(i.file_data) FROM person_images i WHERE i.person_id = c.person_id AND i.is_primary = 1) as primary_image
    FROM cases c JOIN persons p ON p.id = c.person_id WHERE c.visibility = 'public' AND c.status NOT IN ('draft','rejected','closed')`;
  const params = [];
  if (search) { sql += ' AND (p.first_name LIKE ? OR p.family_name LIKE ? OR c.display_id LIKE ?)'; params.push(`%${search}%`, `%${search}%`, `%${search}%`); }
  if (country) { sql += ' AND c.last_seen_country = ?'; params.push(country); }
  if (city) { sql += ' AND c.last_seen_city LIKE ?'; params.push(`%${city}%`); }
  sql += ' ORDER BY c.created_at DESC LIMIT 50';
  const cases = db.prepare(sql).all(...params);
  res.json({ cases });
});

app.get('/api/cases/:id', (req, res) => {
  const c = db.prepare(`SELECT c.*, p.first_name, p.family_name, p.nickname, p.gender, p.approximate_age,
    p.nationality, p.languages, p.height, p.build, p.hair, p.eyes, p.skin_tone, p.tattoos, p.scars, p.birthmarks
    FROM cases c JOIN persons p ON p.id = c.person_id WHERE c.display_id = ? OR c.id = ?`).get(req.params.id, req.params.id);
  if (!c) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Case not found.' } });
  const images = db.prepare('SELECT id, is_primary, file_mime, file_size FROM person_images WHERE person_id = ?').all(c.person_id);
  const events = db.prepare('SELECT * FROM case_events WHERE case_id = ? AND visibility = \'public\' ORDER BY created_at DESC').all(c.id);
  res.json({ case: c, images, events });
});

app.put('/api/cases/:id/status', auth(['admin', 'reviewer']), (req, res) => {
  const { status, visibility } = req.body;
  db.prepare('UPDATE cases SET status=?, visibility=?, updated_at=datetime(\'now\') WHERE id=?').run(status, visibility || 'private', req.params.id);
  // Create event
  db.prepare('INSERT INTO case_events (id, case_id, type, description, created_by) VALUES (?,?,?,?,?)').run(uuid(), req.params.id, 'status_change', `Status changed to ${status}`, req.user.id);
  auditLog(req.user.id, 'update_case_status', 'case', req.params.id, `Status -> ${status}`);
  res.json({ case: db.prepare('SELECT * FROM cases WHERE id = ?').get(req.params.id) });
});

// ── Image Upload ─────────────────────────────────────────────────
app.post('/api/persons/:id/images', auth(), upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: { code: 'NO_FILE', message: 'No image uploaded.' } });
  const id = uuid();
  const isPrimary = req.body.is_primary === 'true' ? 1 : 0;
  const data = req.file.buffer.toString('base64');
  db.prepare('INSERT INTO person_images (id, person_id, is_primary, file_data, file_mime, file_size) VALUES (?,?,?,?,?,?)').run(id, req.params.id, isPrimary, data, req.file.mimetype, req.file.size);
  auditLog(req.user?.id || 'system', 'upload_image', 'person_image', id, 'Uploaded person image');
  res.status(201).json({ image: db.prepare('SELECT id, person_id, is_primary, file_mime, file_size FROM person_images WHERE id = ?').get(id) });
});

// ── Sighting Routes ──────────────────────────────────────────────
app.post('/api/sightings', (req, res) => {
  try {
    const id = uuid();
    const { case_id, reporter_name, reporter_email, reporter_phone, location_city, location_country,
      sighting_date, sighting_time, description, direction_travel, companions, immediate_danger } = req.body;
    db.prepare(`INSERT INTO sightings (id, case_id, reporter_name, reporter_email, reporter_phone,
      location_city, location_country, sighting_date, sighting_time, description, direction_travel,
      companions, immediate_danger) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(id, case_id || null,
      reporter_name, reporter_email, reporter_phone, location_city, location_country,
      sighting_date, sighting_time, description, direction_travel, companions, immediate_danger);
    auditLog('anonymous', 'create_sighting', 'sighting', id, 'Sighting submitted');
    res.status(201).json({ sighting: { id, status: 'pending', message: 'Your sighting has been received and will be reviewed.' } });
  } catch (e) { res.status(500).json({ error: { code: 'SERVER', message: e.message } }); }
});

app.get('/api/sightings', auth(['admin', 'reviewer']), (req, res) => {
  const sightings = db.prepare(`SELECT s.*, c.display_id, p.first_name, p.family_name
    FROM sightings s LEFT JOIN cases c ON c.id = s.case_id LEFT JOIN persons p ON p.id = c.person_id
    ORDER BY s.created_at DESC LIMIT 50`).all();
  res.json({ sightings });
});

// ── Dashboard ────────────────────────────────────────────────────
app.get('/api/dashboard', auth(), (req, res) => {
  const myCases = db.prepare('SELECT COUNT(*) c FROM cases WHERE reporter_id = ?').get(req.user.id).c;
  const pendingVerification = db.prepare("SELECT COUNT(*) c FROM cases WHERE reporter_id = ? AND status = 'pending_verification'").get(req.user.id).c;
  const notifications = db.prepare('SELECT COUNT(*) c FROM notifications WHERE user_id = ? AND read = 0').get(req.user.id).c;
  const recentCases = db.prepare(`SELECT c.id, c.display_id, c.status, c.created_at, p.first_name, p.family_name
    FROM cases c JOIN persons p ON p.id = c.person_id WHERE c.reporter_id = ? ORDER BY c.created_at DESC LIMIT 5`).all(req.user.id);
  const recentNotifications = db.prepare('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 5').all(req.user.id);
  res.json({ stats: { total_cases: myCases, pending_verification: pendingVerification, unread_notifications: notifications }, recent_cases: recentCases, notifications: recentNotifications });
});

// ── Organization Routes ──────────────────────────────────────────
app.post('/api/organizations/apply', (req, res) => {
  try {
    const id = uuid();
    const { organization_name, organization_type, country, registration_number, website, email, contact_person, contact_role, reason, estimated_cases } = req.body;
    if (!organization_name || !email) return res.status(400).json({ error: { code: 'VALIDATION', message: 'Organization name and email required.' } });
    db.prepare(`INSERT INTO partner_applications (id, organization_name, organization_type, country,
      registration_number, website, email, contact_person, contact_role, reason, estimated_cases)
      VALUES (?,?,?,?,?,?,?,?,?,?,?)`).run(id, organization_name, organization_type, country,
      registration_number, website, email, contact_person, contact_role, reason, estimated_cases || null);
    res.status(201).json({ application: { id, status: 'pending', message: 'Your application has been received.' } });
  } catch (e) { res.status(500).json({ error: { code: 'SERVER', message: e.message } }); }
});

// ── Notification Routes ──────────────────────────────────────────
app.get('/api/notifications', auth(), (req, res) => {
  const notifications = db.prepare('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 20').all(req.user.id);
  const unread = notifications.filter(n => !n.read).length;
  res.json({ notifications, unread_count: unread });
});

app.put('/api/notifications/:id/read', auth(), (req, res) => {
  db.prepare('UPDATE notifications SET read = 1 WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
  res.json({ success: true });
});

// ── Match Routes (Admin) ─────────────────────────────────────────
app.get('/api/matches', auth(['admin', 'reviewer']), (req, res) => {
  const matches = db.prepare(`SELECT m.*, c.display_id, p.first_name, p.family_name, s.location_city, s.location_country, s.sighting_date
    FROM matches m JOIN cases c ON c.id = m.case_id JOIN persons p ON p.id = c.person_id
    LEFT JOIN sightings s ON s.id = m.sighting_id ORDER BY m.created_at DESC`).all();
  res.json({ matches });
});

app.put('/api/matches/:id/review', auth(['admin', 'reviewer']), (req, res) => {
  const { status, review_notes } = req.body;
  db.prepare('UPDATE matches SET status=?, reviewed=1, reviewed_by=?, review_notes=?, updated_at=datetime(\'now\') WHERE id=?').run(status, req.user.id, review_notes, req.params.id);
  auditLog(req.user.id, 'review_match', 'match', req.params.id, `Match status -> ${status}`);
  res.json({ match: db.prepare('SELECT * FROM matches WHERE id = ?').get(req.params.id) });
});

// ── Abuse Report ─────────────────────────────────────────────────
app.post('/api/abuse', (req, res) => {
  const { case_id, reason, details } = req.body;
  db.prepare('INSERT INTO abuse_reports (id, case_id, reported_by, reason, details) VALUES (?,?,?,?,?)').run(uuid(), case_id, req.user?.id || 'anonymous', reason, details);
  res.status(201).json({ message: 'Report received.' });
});

// ── Admin Routes ─────────────────────────────────────────────────
app.get('/api/admin/stats', auth(['admin']), (req, res) => {
  const stats = {
    total_cases: db.prepare('SELECT COUNT(*) c FROM cases').get().c,
    pending_verification: db.prepare("SELECT COUNT(*) c FROM cases WHERE status = 'pending_verification'").get().c,
    total_sightings: db.prepare('SELECT COUNT(*) c FROM sightings').get().c,
    pending_matches: db.prepare("SELECT COUNT(*) c FROM matches WHERE status = 'pending_review'").get().c,
    total_users: db.prepare('SELECT COUNT(*) c FROM users').get().c,
    total_organizations: db.prepare("SELECT COUNT(*) c FROM organizations WHERE status = 'active'").get().c,
    abuse_reports: db.prepare("SELECT COUNT(*) c FROM abuse_reports WHERE status = 'pending'").get().c,
    high_risk_cases: db.prepare("SELECT COUNT(*) c FROM cases WHERE risk_level IN ('high','critical') AND status NOT IN ('closed','reconnected','rejected')").get().c,
  };
  res.json(stats);
});

app.get('/api/admin/verification-queue', auth(['admin', 'reviewer']), (req, res) => {
  const cases = db.prepare(`SELECT c.*, p.first_name, p.family_name, u.name AS reporter_name, u.email AS reporter_email
    FROM cases c JOIN persons p ON p.id = c.person_id LEFT JOIN users u ON u.id = c.reporter_id
    WHERE c.status = 'pending_verification' ORDER BY c.created_at ASC`).all();
  res.json({ queue: cases });
});

// ── Seed Demo Data ───────────────────────────────────────────────
app.post('/api/seed', (req, res) => {
  const demo = [
    { first: 'Sofia', family: 'Martin', age: 22, nationality: 'Spain', city: 'Barcelona', country: 'Spain', date: '3 Mar 2026', risk: 'low' },
    { first: 'Daniel', family: 'Kim', age: 28, nationality: 'South Korea', city: 'Seoul', country: 'South Korea', date: '15 May 2024', risk: 'medium' },
    { first: 'Aisha', family: 'Rahman', age: 31, nationality: 'Bangladesh', city: 'Dhaka', country: 'Bangladesh', date: '22 Feb 2026', risk: 'medium' },
    { first: 'Lucas', family: 'Moreau', age: 45, nationality: 'France', city: 'Marseille', country: 'France', date: '8 Apr 2026', risk: 'low' },
    { first: 'Chiamaka', family: 'Nwachukwu', age: 24, nationality: 'Nigeria', city: 'Lagos', country: 'Nigeria', date: '11 Jan 2026', risk: 'high' },
    { first: 'Maria', family: 'Silva', age: 36, nationality: 'Brazil', city: 'São Paulo', country: 'Brazil', date: '30 Jun 2026', risk: 'low' },
    { first: 'Ahmed', family: 'Al-Hassan', age: 27, nationality: 'Jordan', city: 'Istanbul', country: 'Türkiye', date: '14 Aug 2026', risk: 'medium' },
    { first: 'Sergey', family: 'Ivanov', age: 52, nationality: 'Ukraine', city: 'Kyiv', country: 'Ukraine', date: '3 Sep 2026', risk: 'high' },
  ];

  let count = 0;
  for (const d of demo) {
    const personId = uuid();
    db.prepare('INSERT INTO persons (id, first_name, family_name, approximate_age, nationality) VALUES (?,?,?,?,?)').run(personId, d.first, d.family, d.age, d.nationality);
    const caseId = uuid();
    const displayId = generateCaseId();
    db.prepare(`INSERT INTO cases (id, display_id, person_id, status, visibility, risk_level, last_seen_city, last_seen_country, last_seen_date, description)
      VALUES (?,?,?,?,?,?,?,?,?,?)`).run(caseId, displayId, personId, 'active', 'public', d.risk, d.city, d.country, d.date, `${d.first} ${d.family} was last seen in ${d.city}, ${d.country}.`);
    db.prepare('INSERT INTO case_events (id, case_id, type, description, visibility) VALUES (?,?,?,?,?)').run(uuid(), caseId, 'created', 'Case created and verified.', 'public');
    db.prepare('INSERT INTO case_events (id, case_id, type, description, visibility) VALUES (?,?,?,?,?)').run(uuid(), caseId, 'verified', 'Case verified by ReturnToKin.', 'public');
    count++;
  }
  res.json({ message: `Seeded ${count} demo cases.` });
});

// ── Health ────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// ---- AI & Feature Modules ----
const ai = require('./ai');

// ── Consent Wall ──────────────────────────────────────────────────
app.post('/api/consent/request', auth(), (req, res) => {
  const { case_id, found_person_name, found_person_contact } = req.body;
  if (!case_id || !found_person_name) return res.status(400).json({ error: { code: 'VALIDATION', message: 'case_id and found_person_name required.' } });
  const result = ai.createConsentRequest(case_id, found_person_name, found_person_contact);
  auditLog(req.user.id, 'create_consent_request', 'consent', result.id, 'Consent request created');
  res.status(201).json(result);
});

app.get('/api/consent/status/:caseId', auth(), (req, res) => {
  const status = ai.getConsentStatus(req.params.caseId);
  res.json({ consent: status || null });
});

app.post('/api/consent/respond', (req, res) => {
  const { token, decision, safety_assessment } = req.body;
  if (!token || !decision) return res.status(400).json({ error: { code: 'VALIDATION', message: 'Token and decision required.' } });
  const result = ai.recordConsent(token, decision, safety_assessment);
  if (result.error) return res.status(400).json(result);
  auditLog('consent-system', 'consent_response', 'consent', token, `Decision: ${decision}`);
  res.json(result);
});

// ── AI Face Matching ──────────────────────────────────────────────
app.post('/api/ai/match-faces', auth(['admin', 'reviewer']), async (req, res) => {
  const { image_base64, candidate_base64, mime_type } = req.body;
  if (!image_base64 || !candidate_base64) return res.status(400).json({ error: { code: 'VALIDATION', message: 'Both images required.' } });
  const result = await ai.matchFaces(image_base64, candidate_base64, mime_type || 'image/jpeg');
  res.json(result);
});

// ── AI Age Progression ────────────────────────────────────────────
app.post('/api/ai/age-progression', auth(), async (req, res) => {
  const { image_base64, current_age, target_age, mime_type, gender } = req.body;
  if (!image_base64 || !current_age || !target_age) return res.status(400).json({ error: { code: 'VALIDATION', message: 'Image, current_age and target_age required.' } });
  const result = await ai.ageProgression(image_base64, current_age, target_age, mime_type, gender);
  res.json(result);
});

// ── Geo-Alerts ────────────────────────────────────────────────────
app.post('/api/geo-alerts', auth(['admin', 'reviewer']), (req, res) => {
  const { case_id, latitude, longitude, radius_km, country, city } = req.body;
  if (!case_id || !latitude || !longitude) return res.status(400).json({ error: { code: 'VALIDATION', message: 'case_id, lat, lng required.' } });
  const alert = ai.createGeoAlert(case_id, latitude, longitude, radius_km, country, city);
  auditLog(req.user.id, 'create_geo_alert', 'geo_alert', alert.id, `Alert for ${case_id}`);
  res.status(201).json(alert);
});

app.get('/api/geo-alerts/nearby', (req, res) => {
  const { lat, lng, radius } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: { code: 'VALIDATION', message: 'lat and lng required.' } });
  const alerts = ai.getActiveAlerts(parseFloat(lat), parseFloat(lng), parseFloat(radius) || 50);
  res.json({ alerts });
});

// ── API Keys (Partner Connect) ────────────────────────────────────
app.post('/api/partner/api-keys', auth(['admin', 'reviewer']), (req, res) => {
  const { organization_id, name, permissions } = req.body;
  if (!organization_id) return res.status(400).json({ error: { code: 'VALIDATION', message: 'organization_id required.' } });
  const result = ai.generateApiKey(organization_id, name, permissions);
  res.status(201).json({ message: 'API key created. Store this key securely — it will not be shown again.', key: result.key, id: result.id });
});

// ── Cross-Database Matching ───────────────────────────────────────
app.get('/api/match/cross/:caseId', auth(['admin', 'reviewer']), (req, res) => {
  const result = ai.crossMatchCases(req.params.caseId);
  if (result.error) return res.status(404).json(result);
  res.json(result);
});

// 404
app.use((req, res) => res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Endpoint not found.' } }));

// Start
app.listen(PORT, () => console.log(`ReturnToKin API on :${PORT}`));

// Seed on first run if empty
const count = db.prepare('SELECT COUNT(*) c FROM persons').get().c;
if (count === 0) {
  console.log('No data found — seeding demo cases...');
  // Re-run seed logic inline
  const demo = [
    { first: 'Sofia', family: 'Martin', age: 22, nationality: 'Spain', city: 'Barcelona', country: 'Spain', date: '3 Mar 2026', risk: 'low' },
    { first: 'Daniel', family: 'Kim', age: 28, nationality: 'South Korea', city: 'Seoul', country: 'South Korea', date: '15 May 2024', risk: 'medium' },
    { first: 'Aisha', family: 'Rahman', age: 31, nationality: 'Bangladesh', city: 'Dhaka', country: 'Bangladesh', date: '22 Feb 2026', risk: 'medium' },
    { first: 'Lucas', family: 'Moreau', age: 45, nationality: 'France', city: 'Marseille', country: 'France', date: '8 Apr 2026', risk: 'low' },
    { first: 'Chiamaka', family: 'Nwachukwu', age: 24, nationality: 'Nigeria', city: 'Lagos', country: 'Nigeria', date: '11 Jan 2026', risk: 'high' },
    { first: 'Maria', family: 'Silva', age: 36, nationality: 'Brazil', city: 'São Paulo', country: 'Brazil', date: '30 Jun 2026', risk: 'low' },
    { first: 'Ahmed', family: 'Al-Hassan', age: 27, nationality: 'Jordan', city: 'Istanbul', country: 'Türkiye', date: '14 Aug 2026', risk: 'medium' },
    { first: 'Sergey', family: 'Ivanov', age: 52, nationality: 'Ukraine', city: 'Kyiv', country: 'Ukraine', date: '3 Sep 2026', risk: 'high' },
  ];
  for (const d of demo) {
    const personId = uuid();
    db.prepare('INSERT INTO persons (id, first_name, family_name, approximate_age, nationality) VALUES (?,?,?,?,?)').run(personId, d.first, d.family, d.age, d.nationality);
    const caseId = uuid();
    const displayId = generateCaseId();
    db.prepare(`INSERT INTO cases (id, display_id, person_id, status, visibility, risk_level, last_seen_city, last_seen_country, last_seen_date, description)
      VALUES (?,?,?,?,?,?,?,?,?,?)`).run(caseId, displayId, personId, 'active', 'public', d.risk, d.city, d.country, d.date, `${d.first} ${d.family} was last seen in ${d.city}, ${d.country}.`);
    db.prepare('INSERT INTO case_events (id, case_id, type, description, visibility) VALUES (?,?,?,?,?)').run(uuid(), caseId, 'created', 'Case created and verified.', 'public');
    db.prepare('INSERT INTO case_events (id, case_id, type, description, visibility) VALUES (?,?,?,?,?)').run(uuid(), caseId, 'verified', 'Case verified by ReturnToKin.', 'public');
  }
  console.log(`Seeded ${demo.length} demo cases.`);
}