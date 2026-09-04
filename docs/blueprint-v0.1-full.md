# ReturnToKin — Full Product & Brand Blueprint v0.1

*Saved 4 September 2026 — Complete reference document*

---

## 1. Brand Foundation

**Brand Name:** ReturnToKin
**Meaning:** Return = العودة, Kin = الأهل، الأقارب، العائلة → العودة إلى الأهل
**Primary Tagline:** Every missing person deserves a way back. (كل مفقود يستحق طريقًا للعودة)
**Secondary:** Someone, somewhere, may know something. / One clue can bring someone home. / Helping people find their way back to those who love them.

## 2. Mission

ReturnToKin exists to create a trusted global network that connects missing-person reports, sightings, unidentified individuals, families, humanitarian organizations, and relevant institutions. The platform transforms fragmented information into actionable, verified leads while protecting the privacy and safety of vulnerable individuals.

## 3. Vision

A world where no missing person is lost between disconnected systems. The global reconnection infrastructure for missing people — connecting families, public, organizations, hospitals, shelters, rescue, authorities, and databases without requiring all information in one database.

## 4. Core Principle

ReturnToKin is NOT a Missing Persons Directory — it's a Reconnection Network. Report → Search → Sighting → Match → Verify → Reconnect

## 5. Core Users (6 categories)

1. Family Member — person searching for a relative
2. Missing Person — lost contact and wants to know if someone is looking
3. Public Reporter — witnessed someone who may be missing
4. NGO / Humanitarian Organization — manages missing/unidentified cases
5. Hospital / Shelter / Rescue Organization — found someone of unknown identity
6. Authority — official verification and lawful information exchange

## 6. Five Primary User Actions

1. REPORT SOMEONE MISSING
2. REPORT A SIGHTING
3. SEARCH
4. I MAY BE MISSING
5. I FOUND SOMEONE

## 7. Homepage Structure

**Hero:** "Someone is missing. Someone, somewhere, may know something." + CTAs for Report Missing / Report Sighting + Search bar (name, location, case ID) + Search by photo (restricted in v1)

**Sections:**
1. How ReturnToKin Works (Report → Search → Match → Verify → Reconnect)
2. Every clue matters
3. For Organizations (Become a Partner)
4. Safety Comes First
5. Recently Verified Cases

## 8. Missing Person Report (Wizard)

**Step 1 — Who are you looking for?** Relationship: Parent, Child, Sibling, Spouse, Relative, Friend, Other
**Step 2 — Identity:** Required: First name, Family name, Gender, Approx age/DOB, Nationality. Optional: Nickname, Alternate spelling, Previous name
**Step 3 — Physical Description:** Height, Build, Hair, Eyes, Skin tone, Facial hair, Tattoos, Scars, Birthmarks, Disability, Other distinguishing features. All optional except where necessary.
**Step 4 — Photos:** Min 1, Recommended 3-5. Recent, clear face, different angles, no filters. Auto-detect duplicates, validate face exists, calculate image quality. Original preserved securely.
**Step 5 — Last Known Info:** Last Seen Date, Country, City, approximate area. Optional: Last contact date, clothing, transport, destination, companions, route. Circumstances: Lost contact, Migration, Armed conflict, Natural disaster, Child missing, Elderly/vulnerable, Travel, Accident, Unknown, Other.

## 9. Data Visibility Classification

- **Public:** Safe information shown on public case page
- **Restricted:** Available to verified family or partner organizations
- **Confidential:** Only ReturnToKin authorized staff
- **Highly Restricted:** Very sensitive information requiring special permission

## 10. Case ID Format

RTK-26-JD-7F42A — structure should not expose sensitive information. QR codes link to the case.

## 11. Public Case Page

Example: "Ahmad A. MISSING — VERIFIED. Age: 27. Last Seen: Istanbul, Türkiye. 14 August 2026. Languages: Arabic/English." Primary CTA: "HAVE YOU SEEN AHMAD?" Secondary: Share Case. Public page must NOT show: exact address, family phone, current unverified sightings, private documents, passport info, identity numbers.

## 12. Report a Sighting

No account required for basic submission. Fields: Approximate location, date, time, description, optional photo, optional contact info. Question: "Is the person currently in immediate danger?" (Yes/No/Unknown) → if yes, local emergency guidance based on location.

## 13. Sighting Location Protection

Public: "Dubai, UAE" — Internal: "25.204849, 55.270783" — Verified investigator: may receive more precise location if authorized.

## 14. Match Engine (ReturnToKin Match)

**Weights (configurable):** Face similarity 35%, Age compatibility 10%, Physical characteristics 10%, Geographic compatibility 15%, Timeline compatibility 15%, Language/nationality 5%, Distinguishing marks 5%, Contextual data 5%.

**Terminology rules:** Never "this is definitely the same person." Use: Low Probability, Possible Match, Strong Possible Match, High Priority Review. Human verification mandatory.

## 15. Match Workflow

New Sighting → Candidate Retrieval → Metadata Filtering → Visual Similarity → Geographic Analysis → Timeline Analysis → Match Score → Human Review → Family/Partner Verification → Confirmed/Rejected/Unresolved

## 16. Search Engine

Fields: Name, Alternative name, Case ID, Country, City, Age range, Gender, Last seen date, Nationality. Future: Natural Language Search.

## 17. "I Am the Missing Person"

Page: "Is someone looking for you?" User provides name, photo, identity info. If match exists → NOT automatic disclosure → "Request Secure Contact" instead.

## 18. Found/Unidentified Person

For organizations. Fields: Approx age, gender, languages, physical description, recovery location/date, condition, photos (if legally permissible), known possessions. Case name: "Unidentified Person — RTK-U-34211"

## 19. Trust Levels (0-5)

0 Anonymous — limited tips only
1 Email/phone verified
2 Identity verified
3 Family relationship verified
4 Verified organization
5 Verified authority/institutional partner

## 20. Verification Methods

**Identity:** Government ID, passport, biometric/selfie where lawful
**Relationship:** Family document, birth certificate, corroborating evidence, partner org verification
**Organization:** Corporate/NGO registration, official email, manual review

## 21. High Risk Flags

Child, Domestic violence, Human trafficking concern, Conflict zone, Political persecution concern, Witness/security concern, Mental vulnerability, Elderly, Unknown risk. Influence visibility and workflow.

## 22. Critical Safety Rules

- Never reveal located person's current location automatically
- Even 99% algorithmic match cannot override this rule
- Child cases: verified guardian status, law enforcement, recognized child protection org required
- Every public case must have "Report Abuse"
- High-risk cases can be suspended from public search while active internally

## 23. Organization Dashboard

Metrics: Active Cases, New Cases, Sightings, Potential Matches, Cases Awaiting Review, Cases Reconnected

## 24. Partner Case Workspace

Overview, Timeline, People, Sightings, Matches, Documents, Notes, Organizations, Communications, Audit Log

## 25. Timeline Distinctions

Verified, Probable, Unverified, Rejected

## 26. ReturnToKin Graph (Data Model)

Person → Identity, Family, Cases, Photos, Sightings, Locations, Documents, Organizations, Matches, Events

## 27. Public Sharing

Share Link, QR Code, WhatsApp Card, Instagram Story, Facebook Card, X Post, Printable Poster

## 28. Smart Translation

Initial: English, Arabic. Architecture must support expansion. Next: Turkish, French, Spanish, German, Persian, Dari, Pashto, Russian, Ukrainian. Original Text + Translated Text (never replace source evidence).

## 29. Case Status System

Draft → Pending Verification → Active → Restricted → Possible Match → Under Review → Located — Verification Pending → Reconnected → Closed — Other → Rejected/Fraudulent

## 30. Admin Command Center (5 queues)

New Cases, Verification, Sightings, Potential Matches, Safety & Abuse

## 31. Admin Dashboard

Active Cases, New Today, Sightings, Potential Matches, High Priority, Safety Reviews

## 32. Mandatory Audit Trail

Every sensitive action logged: user, action, case, timestamp, IP/device where lawful, reason. No silent changes.

## 33. MVP Pages (28)

Home, Search, Search Results, Public Case, Report Missing (5-step), Submitted, Report Sighting, Sighting Submitted, Login, Signup, My Cases, Case Dashboard, Notifications, Organization Landing, Partner Application, Admin Dashboard, Verification Queue, Match Review, Safety Review, Privacy & Safety, Terms, Contact/Help

## 34. MVP Database Tables

users, profiles, organizations, organization_members, persons, person_names, person_images, person_attributes, cases, case_reporters, case_relationships, case_visibility, locations, case_locations, sightings, sighting_images, matches, match_signals, match_reviews, verifications, documents, case_events, case_notes, notifications, abuse_reports, audit_logs

## 35. Technical Architecture

**Frontend:** Next.js (Responsive Web App)
**Backend:** FastAPI or Node/NestJS
**Database:** PostgreSQL
**Storage:** S3-compatible encrypted object storage
**Cache/Queue:** Redis
**Search:** PostgreSQL initially → OpenSearch/Elasticsearch later
**Background Workers:** Image processing, translations, matching, notifications

## 36. AI Architecture (Modular)

Case → Normalization → Candidate Retrieval → Image Embedding → Metadata Matching → Geo/Timeline Scoring → Combined Ranking → Human Review

## 37. Facial Recognition Policy

NOT a public facial surveillance service. Face search restricted to: internal system matching, verified organizations, verified cases, controlled workflows. No public interface for uploading any person's photo and retrieving identities.

## 38. Data Security

Encryption in transit + at rest, role-based access, 2FA for staff, secure password hashing, document isolation, signed image URLs, rate limiting, bot protection, abuse detection, backups, disaster recovery, audit logging

## 39. Privacy Philosophy

Collect Less, Reveal Less, Control More

## 40. Business Model

**Families:** Free forever (core searching/reporting never requires payment)
**Organizations:** Community Partner (free), Professional Partner (advanced), Enterprise Partner (large volume + API)
**Governments:** Custom institutional contracts
**ReturnToKin Connect:** Future API layer

## 41. Grant Eligibility

Humanitarian innovation, migration, child protection, refugee assistance, disaster response, civic technology, human rights technology

## 42. KPIs

Cases Reconnected, Verified Leads Generated, Time to First Valid Lead, Cases with Potential Match, Partner Organizations, Case Verification Time, False Match Rate, Abuse Detection Rate

## 43. First Pilot Geography

MENA ↔ Türkiye ↔ Europe (but visually/technically global — not branded as Middle Eastern)

## 44. 30-Day Build Target

**Week 1:** Brand basics, UX wireframes, data schema, safety architecture, technical environment
**Week 2:** Missing case workflow, search, public cases, accounts, image upload
**Week 3:** Sightings, admin, verification, notifications, Arabic
**Week 4:** Basic matching, sharing, audit logs, security review, private beta

## 45. 90-Day Target

1,000 verified cases, 10 partner organizations, 5,000+ users, 100+ legitimate sightings, multiple credible matches. Ultimate milestone: First Verified Reconnection.

## 46. Visual Identity

NOT: police wanted posters, charity donation websites, crime portals, government bureaucracy
Communicate: Hope, Trust, Humanity, Technology, Safety
Style: International, Calm, Human, Serious, Modern. Generous whitespace, large typography, human photography only when necessary. No sensational language.

## 47. Logo Concept

Two incomplete lines moving toward one another forming a single continuous symbol (separation → reconnection). Avoid: magnifying glasses, fingerprints, police imagery, red emergency, crying faces.

## 48. Brand Voice

Calm, clear, compassionate, without exaggeration, without false hope. Never "We will find your loved one." Say "We help connect information that may lead to answers."

## 49. Brand Architecture

ReturnToKin (main), ReturnToKin Network (public platform), ReturnToKin Match (matching engine), ReturnToKin Partners (institutional network), ReturnToKin Connect (API), ReturnToKin Safe (safety/privacy framework)

## 50. Core Positioning Sentence

"ReturnToKin is a trusted global network that connects missing-person reports, sightings and institutional information to help families find answers and reconnect safely."

## 51. Key Differentiators

1. Cross-border interoperability
2. Multi-source matching
3. Human verification
4. Safety-first information sharing
5. Institutional network effects

## 52. Development Priority

Module 01: Authentication & Roles → 02: Missing Case Creation → 03: Case Visibility & Public Pages → 04: Search → 05: Sightings → 06: Admin Verification → 07: Candidate Matching → 08: Notifications → 09: Sharing → 10: Partner Accounts

## 53. Product Rule

Before every new feature: "Does this materially increase the chance of safely connecting a missing person with useful information?" If not, it's not a priority.

## 54. North Star

"One person. One clue. One connection. One way back. Every missing person deserves a way back."