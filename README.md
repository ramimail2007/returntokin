# ReturnToKin — Product & Brand Blueprint v0.1

**Project Type:** Global Missing Persons & Family Reconnection Platform
**Working Entity:** ReturnToKin
**Primary Mission:** Help missing people and their families find one another safely through verified reports, public participation, institutional cooperation, and intelligent matching.

---

## 1. Brand Foundation

**Name:** ReturnToKin — Return = العودة, Kin = الأهل/الأقارب/العائلة → العودة إلى الأهل

**Primary Tagline:** Every missing person deserves a way back. (كل مفقود يستحق طريقًا للعودة)

**Secondary:** Someone, somewhere, may know something. / One clue can bring someone home. / Helping people find their way back to those who love them.

**Mission:** Create a trusted global network connecting missing-person reports, sightings, unidentified individuals, families, humanitarian organizations, and relevant institutions — transforming fragmented information into actionable, verified leads while protecting privacy and safety.

**Vision:** A world where no missing person is lost between disconnected systems. → The global reconnection infrastructure for missing people.

**Core Principle:** ReturnToKin is NOT a Missing Persons Directory — it's a Reconnection Network. Report → Search → Sighting → Match → Verify → Reconnect

---

## 2. Core Users (6)

1. **Family Member** — searching for a relative
2. **Missing Person** — wants to know if someone is looking for them
3. **Public Reporter** — witnessed someone who may be missing
4. **NGO / Humanitarian Organization** — manages cases of missing/unidentified
5. **Hospital / Shelter / Rescue** — found someone of unknown identity
6. **Authority** — official verification and lawful information exchange

---

## 3. Five Primary User Actions (Homepage)

1. REPORT SOMEONE MISSING
2. REPORT A SIGHTING
3. SEARCH
4. I MAY BE MISSING
5. I FOUND SOMEONE

---

## 4. Core Workflow

Report → Search → Sighting → Match → Verify → Reconnect

**Match Engine signals (configurable weights):**
- Face similarity (35%)
- Age compatibility (10%)
- Physical characteristics (10%)
- Geographic compatibility (15%)
- Timeline compatibility (15%)
- Language/nationality (5%)
- Distinguishing marks (5%)
- Contextual data (5%)

**Critical rule:** NEVER state "this is definitely the same person." Use: Low Probability, Possible Match, Strong Possible Match, High Priority Review. Human verification is mandatory.

**Safety golden rule:** Never reveal a located person's current location automatically.

---

## 5. Data Model

**Person** → Identity, Family, Cases, Photos, Sightings, Locations, Documents, Organizations, Matches, Events

**Case Statuses:** Draft → Pending Verification → Active → Restricted → Possible Match → Under Review → Located — Verification Pending → Reconnected → Closed — Other → Rejected/Fraudulent

**Trust Levels (0-5):** Anonymous → Email/phone verified → Identity verified → Family verified → Verified organization → Verified authority

**Data Visibility:** Public / Restricted / Confidential / Highly Restricted

**High Risk Flags:** Child, Domestic violence, Human trafficking, Conflict zone, Political persecution, Witness/security, Mental vulnerability, Elderly, Unknown

---

## 6. Missing Person Report (Wizard, 5 steps)

1. Who are you looking for? (relationship)
2. Identity (name, gender, age, nationality)
3. Physical description (height, build, hair, eyes, tattoos, scars, etc.)
4. Photos (min 1, 3-5 recommended, auto-detect duplicates/quality)
5. Last known information + circumstances

---

## 7. MVP Build Order (by priority)

1. Authentication & Roles
2. Missing Case Creation
3. Case Visibility & Public Pages
4. Search
5. Sightings
6. Admin Verification
7. Candidate Matching
8. Notifications
9. Sharing
10. Partner Accounts

**MVP success:** A real end-to-end workflow: Family creates verified case → Public case generated → Sighting submitted → System identifies candidate → Admin reviews → Family notified → Status changes.

---

## 8. MVP Pages (28)

Home, Search, Search Results, Public Case, Report Missing (5-step wizard), Submitted, Report Sighting, Login, Signup, My Cases, Case Dashboard, Notifications, Organization Landing, Partner Application, Admin Dashboard, Verification Queue, Match Review, Safety Review, Privacy, Terms, Contact/Help

---

## 9. Technical Architecture

**Frontend:** Next.js (responsive web app)
**Backend:** FastAPI or Node/NestJS
**Database:** PostgreSQL
**Storage:** S3-compatible encrypted object storage
**Cache/Queue:** Redis
**Search:** PostgreSQL initially → OpenSearch/Elasticsearch later
**AI:** Modular — not tied to one provider
**Face recognition:** Restricted to internal matching + verified organizations only

---

## 10. Business Model

- **Families:** Free forever (core searching/reporting never requires payment)
- **Organizations:** Community (free), Professional (advanced case mgmt), Enterprise (large volume + API)
- **Governments:** Custom institutional contracts
- **Grant-eligible:** Humanitarian innovation, migration, child protection, refugee assistance, disaster response

---

## 11. Key Differentiators

1. Cross-border interoperability
2. Multi-source matching
3. Human verification
4. Safety-first information sharing
5. Institutional network effects

---

## 12. Brand & Design

**Visual direction:** NOT police posters, charity sites, crime portals, or government bureaucracy. Communicate: Hope, Trust, Humanity, Technology, Safety. Clean, international, calm, modern. Generous whitespace, large typography, human photos only when necessary.

**Logo concept:** Two incomplete lines moving toward one another forming a single continuous symbol (separation → reconnection). Avoid: magnifying glasses, fingerprints, police imagery, red emergency visuals, crying faces.

**Brand voice:** Calm, clear, compassionate, without exaggeration, without false hope. Never say "We will find your loved one." Say "We help connect information that may lead to answers."

---

## 13. KPIs (not page views)

Cases Reconnected, Verified Leads Generated, Time to First Valid Lead, Cases with Potential Match, Partner Organizations, Case Verification Time, False Match Rate, Abuse Detection Rate

---

## 14. Timeline

- **Week 1:** Brand basics, UX wireframes, data schema, safety architecture, technical environment
- **Week 2:** Missing case workflow, search, public cases, accounts, image upload
- **Week 3:** Sightings, admin, verification, notifications, Arabic
- **Week 4:** Basic matching, sharing, audit logs, security review, private beta
- **90-day target:** 1,000 verified cases, 10 partner organizations, 5,000+ users, first verified reconnection

---

## 15. North Star

> One person. One clue. One connection. One way back.

Every missing person deserves a way back.