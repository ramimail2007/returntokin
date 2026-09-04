// ReturnToKin — Database layer
// SQLite (dev) with PostgreSQL-ready schema (production)
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, 'returntokin.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  trust_level INTEGER DEFAULT 0,
  email_verified INTEGER DEFAULT 0,
  phone TEXT,
  country TEXT,
  language TEXT DEFAULT 'en',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token TEXT NOT NULL,
  expires_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  relationship_to_case TEXT,
  verification_status TEXT DEFAULT 'pending',
  id_document_hash TEXT,
  organization_id TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS organizations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  country TEXT,
  registration_number TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,
  status TEXT DEFAULT 'pending',
  verified INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS organization_members (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role TEXT DEFAULT 'member',
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS persons (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  family_name TEXT,
  nickname TEXT,
  gender TEXT,
  date_of_birth TEXT,
  approximate_age INTEGER,
  nationality TEXT,
  languages TEXT,
  height TEXT,
  build TEXT,
  hair TEXT,
  eyes TEXT,
  skin_tone TEXT,
  facial_hair TEXT,
  tattoos TEXT,
  scars TEXT,
  birthmarks TEXT,
  disability TEXT,
  other_features TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS person_images (
  id TEXT PRIMARY KEY,
  person_id TEXT NOT NULL,
  is_primary INTEGER DEFAULT 0,
  file_data TEXT,
  file_mime TEXT,
  file_size INTEGER,
  face_detected INTEGER DEFAULT 0,
  image_quality REAL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (person_id) REFERENCES persons(id)
);

CREATE TABLE IF NOT EXISTS cases (
  id TEXT PRIMARY KEY,
  display_id TEXT UNIQUE NOT NULL,
  person_id TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  visibility TEXT DEFAULT 'private',
  risk_level TEXT DEFAULT 'unknown',
  flags TEXT,
  last_seen_date TEXT,
  last_seen_country TEXT,
  last_seen_city TEXT,
  last_seen_area TEXT,
  last_seen_destination TEXT,
  last_seen_transport TEXT,
  last_seen_companions TEXT,
  last_seen_clothing TEXT,
  circumstances TEXT,
  circumstance_type TEXT,
  description TEXT,
  reporter_id TEXT,
  verified INTEGER DEFAULT 0,
  verified_at TEXT,
  reconnected INTEGER DEFAULT 0,
  reconnected_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (person_id) REFERENCES persons(id),
  FOREIGN KEY (reporter_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS case_reporters (
  id TEXT PRIMARY KEY,
  case_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  relationship TEXT,
  is_primary INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (case_id) REFERENCES cases(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS case_visibility (
  id TEXT PRIMARY KEY,
  case_id TEXT NOT NULL,
  field_name TEXT NOT NULL,
  level TEXT DEFAULT 'public',
  FOREIGN KEY (case_id) REFERENCES cases(id)
);

CREATE TABLE IF NOT EXISTS sightings (
  id TEXT PRIMARY KEY,
  case_id TEXT,
  reporter_name TEXT,
  reporter_email TEXT,
  reporter_phone TEXT,
  location_lat REAL,
  location_lng REAL,
  location_city TEXT,
  location_country TEXT,
  sighting_date TEXT,
  sighting_time TEXT,
  description TEXT,
  direction_travel TEXT,
  companions TEXT,
  immediate_danger TEXT,
  photo_data TEXT,
  photo_mime TEXT,
  status TEXT DEFAULT 'pending',
  reviewed INTEGER DEFAULT 0,
  reviewed_by TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (case_id) REFERENCES cases(id)
);

CREATE TABLE IF NOT EXISTS matches (
  id TEXT PRIMARY KEY,
  case_id TEXT NOT NULL,
  sighting_id TEXT,
  person_id TEXT,
  score REAL,
  face_similarity REAL,
  age_compatibility REAL,
  geographic_score REAL,
  timeline_score REAL,
  status TEXT DEFAULT 'pending_review',
  reviewed INTEGER DEFAULT 0,
  reviewed_by TEXT,
  review_notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (case_id) REFERENCES cases(id),
  FOREIGN KEY (sighting_id) REFERENCES sightings(id)
);

CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT,
  body TEXT,
  case_id TEXT,
  read INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS abuse_reports (
  id TEXT PRIMARY KEY,
  case_id TEXT,
  reported_by TEXT,
  reason TEXT,
  details TEXT,
  status TEXT DEFAULT 'pending',
  reviewed_by TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  actor TEXT,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  details TEXT,
  ip_address TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS case_events (
  id TEXT PRIMARY KEY,
  case_id TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  visibility TEXT DEFAULT 'public',
  created_by TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (case_id) REFERENCES cases(id)
);

CREATE TABLE IF NOT EXISTS case_notes (
  id TEXT PRIMARY KEY,
  case_id TEXT NOT NULL,
  user_id TEXT,
  content TEXT,
  visibility TEXT DEFAULT 'private',
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (case_id) REFERENCES cases(id)
);

CREATE TABLE IF NOT EXISTS partner_applications (
  id TEXT PRIMARY KEY,
  organization_name TEXT NOT NULL,
  organization_type TEXT,
  country TEXT,
  registration_number TEXT,
  website TEXT,
  email TEXT,
  contact_person TEXT,
  contact_role TEXT,
  reason TEXT,
  estimated_cases INTEGER,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS consent_wall (
  id TEXT PRIMARY KEY,
  case_id TEXT NOT NULL,
  found_person_token TEXT,
  found_person_name TEXT,
  found_person_contact TEXT,
  reporter_id TEXT,
  status TEXT DEFAULT 'pending',
  consent_given INTEGER DEFAULT 0,
  consent_date TEXT,
  ngo_mediation INTEGER DEFAULT 0,
  ngo_notes TEXT,
  safety_assessment TEXT,
  rejection_reason TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (case_id) REFERENCES cases(id)
);

CREATE TABLE IF NOT EXISTS age_progressions (
  id TEXT PRIMARY KEY,
  person_id TEXT NOT NULL,
  source_image TEXT,
  target_age INTEGER,
  result_data TEXT,
  confidence REAL,
  model_used TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (person_id) REFERENCES persons(id)
);

CREATE TABLE IF NOT EXISTS face_matches (
  id TEXT PRIMARY KEY,
  source_person_id TEXT NOT NULL,
  target_person_id TEXT,
  sighting_id TEXT,
  similarity_score REAL,
  threshold_met INTEGER DEFAULT 0,
  reviewed INTEGER DEFAULT 0,
  review_decision TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS geo_alerts (
  id TEXT PRIMARY KEY,
  case_id TEXT NOT NULL,
  latitude REAL,
  longitude REAL,
  radius_km REAL DEFAULT 50,
  country TEXT,
  city TEXT,
  status TEXT DEFAULT 'active',
  sent_count INTEGER DEFAULT 0,
  last_sent TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (case_id) REFERENCES cases(id)
);

CREATE TABLE IF NOT EXISTS api_keys (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  name TEXT,
  permissions TEXT DEFAULT 'read',
  active INTEGER DEFAULT 1,
  last_used TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

CREATE TABLE IF NOT EXISTS partner_dashboard_settings (
  id TEXT PRIMARY KEY,
  organization_id TEXT UNIQUE NOT NULL,
  auto_approve_matches INTEGER DEFAULT 0,
  notify_on_sighting INTEGER DEFAULT 1,
  notify_on_match INTEGER DEFAULT 1,
  data_sharing_level TEXT DEFAULT 'restricted',
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);
`;

db.exec(SCHEMA);

// Helper: generate a case ID like RTK-26-X7F3
function generateCaseId() {
  const year = new Date().getFullYear().toString().slice(-2);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `RTK-${year}-${code}`;
}

// Helper: generate UUID
function uuid() {
  const { randomUUID } = require('crypto');
  return randomUUID();
}

// Helper: log audit
function auditLog(actor, action, targetType, targetId, details, ip) {
  const stmt = db.prepare('INSERT INTO audit_logs (id, actor, action, target_type, target_id, details, ip_address) VALUES (?,?,?,?,?,?,?)');
  stmt.run(uuid(), actor, action, targetType || null, targetId || null, details || null, ip || null);
}

module.exports = { db, generateCaseId, uuid, auditLog };