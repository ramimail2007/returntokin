// ReturnToKin — AI Intelligence Module
// Uses OpenRouter Vision for face matching, age progression, and document analysis
// All AI results are advisory — never final — human review always required

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || '';
const VISION_MODEL = process.env.RTK_VISION_MODEL || 'google/gemini-3.6-flash';
const { db, uuid } = require('./db');

// ── Face Matching ──────────────────────────────────────────────────────
// Compares two face images and returns a similarity assessment.
// Never states "this is the same person" — only provides confidence level.

async function matchFaces(imageBase64, candidateImageBase64, mimeType = 'image/jpeg') {
  if (!OPENROUTER_KEY) return { error: 'OpenRouter not configured', score: 0, threshold_met: false };

  const prompt = `You are a forensic facial comparison assistant. Compare the two faces in the provided images.

Rules:
- Analyze facial structure, features, proportions, and distinguishing marks.
- Return ONLY valid JSON with these fields:
  {
    "similarity_score": 0.0-1.0,
    "facial_analysis": "brief description of similarities and differences",
    "confidence": "low|medium|high",
    "same_person_assessment": "unlikely|possible|probable|highly_probable",
    "distinguishing_features": ["list of matching or notable features"],
    "age_difference_estimate": "years if apparent"
  }
- Never state "this is definitely the same person."
- If image quality is insufficient, set similarity_score to 0 and note it.`;

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENROUTER_KEY}` },
      body: JSON.stringify({
        model: VISION_MODEL,
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: [
            { type: 'text', text: 'Compare these two faces:' },
            { type: 'image_url', image_url: { url: `data:${mimeType};base64,${imageBase64}` } },
            { type: 'image_url', image_url: { url: `data:${mimeType};base64,${candidateImageBase64}` } },
          ]},
        ],
        max_tokens: 1000,
        temperature: 0.1,
      }),
    });

    if (!res.ok) throw new Error(`Vision API ${res.status}`);
    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content || '';
    const result = extractJson(raw);
    if (!result) return { error: 'Could not parse AI response', score: 0, threshold_met: false, raw };

    const score = Math.min(1, Math.max(0, result.similarity_score || 0));
    return {
      score,
      threshold_met: score >= 0.6,
      analysis: result.facial_analysis || '',
      confidence: result.confidence || 'low',
      assessment: result.same_person_assessment || 'unlikely',
      features: result.distinguishing_features || [],
      age_estimate: result.age_difference_estimate || null,
    };
  } catch (e) {
    return { error: e.message, score: 0, threshold_met: false };
  }
}

// ── Age Progression ────────────────────────────────────────────────────
// Generates a description of how a person may look at a target age.
// Uses the original photo + age gap + known physical changes.

async function ageProgression(imageBase64, currentAge, targetAge, mimeType = 'image/jpeg', gender = 'unknown') {
  if (!OPENROUTER_KEY) return { error: 'OpenRouter not configured' };

  const ageGap = Math.abs(targetAge - currentAge);
  const direction = targetAge > currentAge ? 'older' : 'younger';

  const prompt = `You are a forensic age progression specialist. Analyze this photo of a person.

Current age: approximately ${currentAge} years old
Target age: ${targetAge} years old (${direction} by approximately ${ageGap} years)
Gender: ${gender}

Return ONLY valid JSON:
{
  "age_progression_description": "detailed description of how the person likely looks at the target age — hair, skin, facial structure changes",
  "key_unchanged_features": ["features that remain recognizable despite aging"],
  "confidence": "low|medium|high",
  "aging_factors_considered": ["genetics", "lifestyle", "environmental", "sun exposure", "weight changes"],
  "distinguishing_marks_likely_persistent": ["scars", "tattoos", "birthmarks", "facial features unlikely to change"]
}`;

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENROUTER_KEY}` },
      body: JSON.stringify({
        model: VISION_MODEL,
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: [
            { type: 'text', text: `Generate age progression from ${currentAge} to ${targetAge}:` },
            { type: 'image_url', image_url: { url: `data:${mimeType};base64,${imageBase64}` } },
          ]},
        ],
        max_tokens: 1000,
        temperature: 0.2,
      }),
    });

    if (!res.ok) throw new Error(`Vision API ${res.status}`);
    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content || '';
    const result = extractJson(raw);
    return result || { error: 'Could not parse response', raw };
  } catch (e) {
    return { error: e.message };
  }
}

// ── Consent Wall Logic ─────────────────────────────────────────────────
// The core safety mechanism: NO contact information is ever shared
// without the explicit consent of the found person.

function createConsentRequest(caseId, foundPersonName, foundPersonContact) {
  const id = uuid();
  const token = require('crypto').randomBytes(16).toString('hex');
  db.prepare(`INSERT INTO consent_wall (id, case_id, found_person_token, found_person_name, found_person_contact, status)
    VALUES (?,?,?,?,?,?)`).run(id, caseId, token, foundPersonName, foundPersonContact, 'pending');
  return { id, token, status: 'pending' };
}

function getConsentStatus(caseId) {
  return db.prepare('SELECT * FROM consent_wall WHERE case_id = ? ORDER BY created_at DESC').get(caseId);
}

function recordConsent(token, decision, safetyAssessment) {
  const record = db.prepare('SELECT * FROM consent_wall WHERE found_person_token = ?').get(token);
  if (!record) return { error: 'Invalid or expired token.' };
  if (record.consent_given === 1) return { error: 'Consent already recorded.' };

  const now = new Date().toISOString();
  db.prepare('UPDATE consent_wall SET consent_given=?, consent_date=?, status=?, safety_assessment=?, updated_at=? WHERE id=?')
    .run(decision === 'yes' ? 1 : 0, now, decision === 'yes' ? 'consented' : 'rejected', safetyAssessment || null, now, record.id);

  // If consented, update case status
  if (decision === 'yes') {
    db.prepare("UPDATE cases SET status='reconnected', reconnected=1, reconnected_at=? WHERE id=?")
      .run(now, record.case_id);
    db.prepare("INSERT INTO case_events (id, case_id, type, description, visibility) VALUES (?,?,?,?,?)")
      .run(uuid(), record.case_id, 'reconnected', 'Consent given — reconnection process initiated.', 'private');
  }

  return { status: decision === 'yes' ? 'consented' : 'rejected', message: decision === 'yes' ? 'Reconnection process initiated.' : 'Consent withheld. Case remains private.' };
}

// ── Geo-Alerts Logic ───────────────────────────────────────────────────

function createGeoAlert(caseId, latitude, longitude, radiusKm, country, city) {
  const id = uuid();
  db.prepare('INSERT INTO geo_alerts (id, case_id, latitude, longitude, radius_km, country, city) VALUES (?,?,?,?,?,?,?)')
    .run(id, caseId, latitude, longitude, radiusKm || 50, country || null, city || null);
  return { id, status: 'active' };
}

function getActiveAlerts(latitude, longitude, radiusKm = 50) {
  // Simple bounding box for MVP — production would use PostGIS or geohash
  const latMin = latitude - (radiusKm / 111.32);
  const latMax = latitude + (radiusKm / 111.32);
  const lonMin = longitude - (radiusKm / (111.32 * Math.cos(latitude * Math.PI / 180)));
  const lonMax = longitude + (radiusKm / (111.32 * Math.cos(latitude * Math.PI / 180)));

  return db.prepare(`SELECT ga.*, c.display_id, p.first_name, p.family_name, p.approximate_age,
    (SELECT MIN(i.file_data) FROM person_images i WHERE i.person_id = c.person_id AND i.is_primary = 1) as primary_image
    FROM geo_alerts ga JOIN cases c ON c.id = ga.case_id JOIN persons p ON p.id = c.person_id
    WHERE ga.status = 'active' AND ga.latitude BETWEEN ? AND ? AND ga.longitude BETWEEN ? AND ?`)
    .all(latMin, latMax, lonMin, lonMax);
}

// ── API Key Management ─────────────────────────────────────────────────

function generateApiKey(organizationId, name, permissions = 'read') {
  const { randomBytes, createHash } = require('crypto');
  const key = `rtk_${randomBytes(24).toString('hex')}`;
  const keyHash = createHash('sha256').update(key).digest('hex');
  const id = uuid();
  db.prepare('INSERT INTO api_keys (id, organization_id, key_hash, name, permissions) VALUES (?,?,?,?,?)')
    .run(id, organizationId, keyHash, name || null, permissions);
  return { id, key, name, permissions }; // Return plain key once at creation
}

function validateApiKey(key) {
  const { createHash } = require('crypto');
  const keyHash = createHash('sha256').update(key).digest('hex');
  const record = db.prepare('SELECT * FROM api_keys WHERE key_hash = ? AND active = 1').get(keyHash);
  if (record) {
    db.prepare('UPDATE api_keys SET last_used = datetime(\'now\') WHERE id = ?').run(record.id);
  }
  return record;
}

// ── Cross-Database Matching Engine ─────────────────────────────────────
// Compares case data across multiple sources without sharing raw data.

function crossMatchCases(caseId) {
  const c = db.prepare('SELECT * FROM cases WHERE id = ?').get(caseId);
  if (!c) return { error: 'Case not found' };

  const person = db.prepare('SELECT * FROM persons WHERE id = ?').get(c.person_id);
  if (!person) return { error: 'Person not found' };

  // Find potential matches by: same country, close age, similar name, same nationality
  const candidates = db.prepare(`
    SELECT c.id, c.display_id, c.status, c.last_seen_city, c.last_seen_country, c.last_seen_date,
           p.first_name, p.family_name, p.approximate_age, p.nationality, p.gender,
           (SELECT MIN(i.file_data) FROM person_images i WHERE i.person_id = c.person_id AND i.is_primary = 1) as primary_image
    FROM cases c JOIN persons p ON p.id = c.person_id
    WHERE c.id != ? AND c.visibility = 'public' AND c.status NOT IN ('draft','rejected','closed','reconnected')
    AND (
      p.nationality = ? OR
      c.last_seen_country = ? OR
      ABS(p.approximate_age - ?) <= 5
    )
    ORDER BY 
      CASE WHEN p.nationality = ? THEN 10 ELSE 0 END +
      CASE WHEN c.last_seen_country = ? THEN 8 ELSE 0 END +
      CASE WHEN ABS(p.approximate_age - ?) <= 3 THEN 5 ELSE 0 END +
      CASE WHEN p.gender = ? THEN 3 ELSE 0 END
    DESC LIMIT 10
  `).all(caseId, person.nationality, c.last_seen_country, person.approximate_age,
    person.nationality, c.last_seen_country, person.approximate_age, person.gender);

  return { candidates, source_case: { display_id: c.display_id, person: `${person.first_name} ${person.family_name}` } };
}

// ── Helper: extract JSON from text ─────────────────────────────────────

function extractJson(text) {
  const m = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (m) { try { return JSON.parse(m[1].trim()); } catch {} }
  try { return JSON.parse(text.trim()); } catch {}
  const obj = text.match(/\{[\s\S]*\}/);
  if (obj) { try { return JSON.parse(obj[0]); } catch {} }
  return null;
}

module.exports = {
  matchFaces, ageProgression,
  createConsentRequest, getConsentStatus, recordConsent,
  createGeoAlert, getActiveAlerts,
  generateApiKey, validateApiKey,
  crossMatchCases,
};