# PracticE Ready - Analytics & Reporting Platform

**Scoping document. Status: draft for discussion. Owner: Chris.**

The goal: turn the data the simulations already produce into a **paid analytics
add-on** that a care provider cannot say no to. Best-in-class interactive
dashboards for managers and L&D, individual coaching reports for learners, and a
recommendations engine that funnels learners into the rest of the PracticE Ready
catalogue. Built and hosted by us, secure enough for a care-sector DPO to sign
off, and priced as an optional extra on top of the licence.

This document covers: the data asset we already have, the architecture, the
dashboards (the product), the recommendations layer, security and compliance,
scale, a phased build plan, and the commercial shape.

---

## 1. Why this is very doable

Two things make this lower-risk than it looks:

1. **We already generate the data.** The sim's `log()` calls capture rich,
   decision-level telemetry today (records opened, critical controls tripped,
   domain scores, signature-interaction results, timings, questionnaire answers).
   It currently dies in the learner's `localStorage`. The analytics product does
   not need new instrumentation to start; it needs somewhere to send what already
   exists. (Full event list in the Appendix.)
2. **The volume is tiny.** A completion emits a few dozen events, once. Even at
   hundreds of clients with hundreds of users each, this is a low-write,
   read-mostly workload. The scale challenge is negligible; the differentiator is
   the **quality of the visualisation and the strength of the compliance story**,
   not throughput.

So the engineering effort concentrates where it should: on making the dashboards
genuinely valuable, and on best-in-class security.

---

## 2. Guiding principles

- **Learner dignity.** This measures readiness, never ranks people to punish them.
  Language mirrors the sim: "developing", "focus area", not "failure".
- **Data minimisation by default.** Prefer pseudonymous learner IDs; the provider
  holds the ID-to-person mapping. We can run the whole analytics product without
  ever storing a care worker's name if the client prefers (strongly recommended).
- **Multi-tenant isolation.** Every record is scoped to a client (organisation)
  and cohort. No query can cross a tenant boundary. This is the load-bearing
  security property.
- **Accessible dashboards.** The same WCAG 2.1 AA bar we hold the sim to applies
  to the reporting UI (colour-independent encodings, keyboard, screen-reader,
  contrast). "Best in class" includes being usable by everyone.
- **Insight, not just charts.** Every view answers a manager's real question
  ("who needs support, and with what?"), and every learner view ends with a next
  step, not just a score.

---

## 3. The data asset (what we already capture)

The sim emits structured events per run. Grouped by what they tell us:

| Signal | Events (existing) | What it powers |
|---|---|---|
| Outcome | `OUTCOME`, `NEARMISS_RECORDED`, `SHIFT_TIMEOUT` | Result mix, pass/fail, incident-path rates |
| Critical controls | `SUPERVISION_BREAK`, `PLATE_VERIFIED`, `PRODUCT_VERIFIED`, `DOC_RELIED` | Blind-spot maps (most-tripped control) |
| Evidence use | `DOC_OPENED`, `PLAN_TO_HAND`, `MEDCLUE_FLAGGED` | "Did they read the records?" behaviour |
| Judgement | `CONFIDENCE`, per-node choice quality (domain scores) | Domain profiles, over/under-confidence |
| Signature interactions | `ALIGNMENT_DONE`, `FLOWTEST_DONE`, `BEST_INTERESTS_PROCESS`, `PARAMEDICS_HANDOVER` | Scenario-specific competence |
| Emergency response | `REDFLAG_RECOGNISED`, `FIRST_AID`, `ESCALATION`, `LEFT_TABLE` | Recognition latency, response quality |
| Knowledge | `END_SESSION_QUESTIONNAIRE` (answers + free text + declaration) | Confidence self-report, flagged-for-manager |
| Derived | domain scores (0-100), readiness band, time taken | The headline metrics |

Every event carries a timestamp and node context, so we get **latency and
sequence**, not just outcomes. That is what makes the analytics richer than a
typical LMS score line.

---

## 4. Architecture

The sim stays a single self-contained file. Around it:

```
[ Sim (browser) ]
   -> emitter (on completion): compact JSON result + event list
        |  HTTPS, signed, pseudonymous learner id + tenant id
        v
[ Ingest API ]  (stateless, autoscaling; validates, rate-limits, authenticates)
        v
[ Store ]  managed Postgres (primary)  +  object storage (raw event archive)
        v
[ Query/aggregation layer ]  (materialised rollups per cohort/org)
        v
[ Dashboard app ]  RBAC: learner | manager | org admin | PracticE Ready superadmin
```

- **Two ingestion modes, same payload:** (a) direct to our API for clients on our
  hosted player; (b) via **SCORM/xAPI** for clients delivering through their own
  LMS (the LMS forwards, or we run a lightweight LRS). One canonical result
  schema underneath both.
- **Rollups:** nightly (or on-write) materialised aggregates per cohort/org so
  dashboards are instant and never run heavy queries against raw data.
- **Stateless API + managed DB** means horizontal scale is trivial and there is
  no server state to secure.

---

## 5. Data model (multi-tenant)

Core tables (simplified):

- `org` (tenant): name, region, licence terms, retention policy, branding.
- `cohort`: belongs to org (team, service, region, intake).
- `learner`: pseudonymous id, belongs to org; optional display name (client's
  choice); never shared across orgs.
- `attempt`: one run. FK learner, scenario, started_at, completed_at,
  duration_s, outcome, readiness_band, timed_out.
- `attempt_domain`: attempt x domain -> score.
- `attempt_event`: the raw event stream (typed), FK attempt.
- `questionnaire_response`: answers, free text, declaration, flagged_for_manager.
- Rollup tables: `cohort_daily`, `org_scenario_summary`, etc.

Every table above `learner` carries `org_id`; row-level security enforces the
tenant boundary at the database, not just the application.

---

## 6. The dashboards (the product)

This is where clients decide it is worth paying for. Four audiences, each with a
focused view. All views are **interactive** (filter, drill, compare, export) and
**accessible** (never colour-only; keyboard and screen-reader complete).

### 6.1 Learner
- **Coaching report**: their debrief, retained. Result band, strongest area,
  focus area (the summary card, persisted and dated).
- **Progress over time**: a trend line of readiness/domain scores across re-takes
  and across the four scenarios. Shows growth, which is motivating.
- **Your development journey**: recommended next steps and courses (section 7).

### 6.2 Line manager / team lead
The core sell. "Who on my team needs support, and with what?"
- **Team readiness board**: a sortable roster with each person's latest band per
  scenario, completion status, and last-active date. Colour + icon + label
  (accessible), filterable by cohort.
- **Cohort domain heatmap**: people x domains, cell = score band. Instantly shows
  systemic weak spots (a whole team amber on "Person-centred practice" is a
  training-need signal, not an individual one).
- **Blind-spot panel**: the most-tripped critical control and the weakest shared
  domain across the team, with the count and trend. This is the "I did not know
  that about my team" moment.
- **At-risk list**: anyone whose latest run tripped a critical control or hit an
  unsafe outcome, surfaced for a supportive conversation.
- **Questionnaire flags**: learners who self-flagged low confidence or asked for
  support (from `END_SESSION_QUESTIONNAIRE`).

### 6.3 Organisation admin / L&D
- **Rollout dashboard**: completion and readiness across all cohorts, with
  filters (service, region, role, time window). Compliance-style "% of workforce
  ready" for board reporting.
- **Trends over time**: readiness mix month on month; the story of the
  intervention working.
- **Cohort comparison**: benchmark teams/services against each other and against
  the org average (and, anonymised, against the PracticE Ready cross-client
  baseline as a premium feature).
- **Incident-path analytics**: rate of near-miss vs emergency paths, recognition
  latency distribution. Genuinely useful risk intelligence for a provider.
- **Exports**: CSV/PDF board packs, scheduled email digests.

### 6.4 PracticE Ready (internal superadmin)
- Cross-client anonymised benchmarks (the data network effect: the more clients,
  the more valuable the benchmark you can sell back).
- Licence/seat usage, renewal signals, engagement health per client.

### 6.5 Visualisation catalogue (best-in-class, accessible)
Purposeful chart types, each chosen for the question it answers:
- Trend lines (progress over time), small multiples per domain.
- Heatmaps (people x domain, cohort x scenario).
- Distribution/histogram (recognition latency, time taken) with cohort overlay.
- Diverging bars (above/below org benchmark).
- Funnel (started -> completed -> ready -> next course enrolled).
- Sankey/flow (decision paths through a scenario; where cohorts diverge).
- KPI tiles with sparklines and period-on-period deltas.
- Animated, filterable, drill-through everywhere; deep-linkable filtered views.

Visualisation standards: one consistent design system, colour-blind-safe
categorical + sequential palettes, every colour paired with a label/shape/pattern,
full keyboard and screen-reader support, data tables behind every chart, respects
reduced-motion. (When we build these, use the project's dataviz guidance so the
charts read as one system in light and dark.)

---

## 7. Recommendations engine & development journeys (the upsell)

The commercial hook that ties analytics back to revenue:

- Map each learner's **weakest domains and tripped controls** to targeted
  micro-content and to **other PracticE Ready courses**.
- Generate a **personalised development journey**: "Your focus area is Person-
  centred practice -> here are two modules and the next course."
- Managers get a **team development plan**: the courses that would lift the most
  people, ranked by aggregate need.
- Every recommendation is a click-through into the catalogue: the analytics
  product pays for itself by driving course sales.

Start rules-based (transparent, defensible: "amber on domain X -> course Y"), and
only add statistical/ML personalisation once there is enough data and it can be
explained. Avoid opaque scoring in a care/safeguarding context.

---

## 8. Security & compliance (best-in-class)

This is what turns it from a demo into something a provider's DPO signs off, and
it is a genuine differentiator to lead with in sales.

**Data protection (UK GDPR / DPA 2018)**
- Lawful basis, and a **Data Processing Agreement** per client (we are processor,
  they are controller).
- **Data minimisation**: default to pseudonymous learner IDs; offer a
  name-free deployment. Care-worker training data is personal data; the less we
  hold, the smaller the risk and the easier the sale.
- UK data residency; documented retention and automatic deletion; DSAR and
  erasure workflows built in, not bolted on.
- ROPA, DPIA template, and a clear privacy notice for learners.

**Platform security**
- Encryption in transit (TLS 1.2+) and at rest.
- **Row-level multi-tenant isolation** enforced in the database.
- **RBAC** (learner/manager/org-admin/superadmin) with least privilege; **SSO
  (SAML/OIDC)** for enterprise clients; MFA for admins.
- Full **audit logging** (who saw what, when), tamper-evident.
- Secrets management, dependency scanning, WAF, rate limiting, backups with
  tested restore, and a documented incident-response plan.

**Certifications (the sales-unlock ladder)**
- **Cyber Essentials** then **Cyber Essentials Plus** (care buyers routinely ask).
- **ISO 27001** as the platform matures (the credibility ceiling for enterprise).
- Independent **penetration test** before launch and annually.
- Accessibility: **WCAG 2.1 AA** conformance for the dashboards, with a published
  accessibility statement.

Lead the sales conversation with this section. In the care sector, "we can prove
it is safe with your data" closes deals.

---

## 9. Scale & performance

- Workload is low-write, read-mostly. Managed Postgres with read replicas and
  materialised rollups serves hundreds of orgs x hundreds of users with headroom.
- Stateless API autoscaling handles completion bursts (e.g. a whole team trained
  in one afternoon) without fuss.
- Cost scales gently and predictably; this is not an expensive system to run at
  the described scale.

---

## 10. Recommended tech stack (indicative)

- **Ingest/API**: Node/TypeScript (shares language with the sim) or similar;
  serverless or a small container service.
- **DB**: managed Postgres (row-level security, JSONB for the event stream).
- **Dashboard**: a modern SPA (React) with an accessible charting approach; SSR
  for the marketing/report-share pages.
- **Auth**: a managed identity provider supporting SAML/OIDC + MFA.
- **Hosting**: UK/EU region on a mainstream cloud with the compliance posture
  above. Render (already in use) can host the API/DB for early phases.
- **Standards**: emit **xAPI** statements so the data is portable and can also
  land in a client's own LRS if they insist.

Nothing here is exotic; it is all well-trodden, which keeps build risk and
hiring risk low.

---

## 11. Phased delivery (sell sooner, build the moat over time)

- **Phase 0 - Capture (small).** Add the completion emitter to the sim; define the
  canonical result schema; store attempts. Nothing user-facing yet, but the data
  starts accruing (data is the asset).
- **Phase 1 - SCORM/LMS reporting.** Completion, score, pass/fail and
  questionnaire into clients' existing LMSs. Nearest-term revenue; unlocks LMS
  buyers immediately. (Already on the roadmap.)
- **Phase 2 - Manager dashboard MVP.** Team readiness board + cohort heatmap +
  blind-spot panel, on our hosted platform. This is the first thing you can
  demo and charge for as the add-on.
- **Phase 3 - Org/L&D analytics.** Trends, cohort comparison, exports, digests.
- **Phase 4 - Recommendations & journeys.** The course-funnel upsell.
- **Phase 5 - Benchmarks & certifications.** Cross-client anonymised benchmarks;
  ISO 27001; ML personalisation if warranted.

Security/compliance is not a phase; it is built in from Phase 0 and formalised
(Cyber Essentials, pen test) before the first paid dashboard goes live in Phase 2.

---

## 12. Commercial shape

- Priced as an **optional per-seat or per-org add-on** on top of the content
  licence.
- Tiers: **Team** (manager dashboard) -> **Organisation** (L&D analytics, exports,
  SSO) -> **Enterprise** (benchmarks, custom retention, ISO/pen-test evidence).
- The recommendations layer makes the add-on partly self-funding by driving
  catalogue sales.

---

## 13. Open decisions (for Chris)

1. **Names or pseudonyms?** Strongly recommend pseudonymous-by-default. Confirm.
2. **Hosted by us vs into their LMS?** Both, eventually; which first per client?
3. **Build vs buy the dashboard shell?** Custom (full control, best-in-class,
   more effort) vs an embeddable BI tool (faster, less bespoke). Recommend custom
   for the learner/manager views, given the dignity-first framing and branding.
4. **How much cross-client benchmarking** are clients comfortable feeding (even
   anonymised)? A contract and consent question.
5. **First lighthouse client** to co-design Phase 2 with?

---

## Appendix: existing events -> analytics

Every event below is already emitted by `frontline.html` today and maps to an
xAPI statement (`actor` = pseudonymous learner, `verb`, `object` = scenario/node,
`result`/`context` = the payload):

| Event | Analytics use |
|---|---|
| `OUTCOME` | outcome mix, pass/fail |
| `SHIFT_TIMEOUT` | did-not-complete-in-time rate, pacing |
| `NEARMISS_RECORDED` | near-miss recognition and closure |
| `SUPERVISION_BREAK` / `PLATE_VERIFIED` / `PRODUCT_VERIFIED` | critical-control adherence (blind spots) |
| `DOC_OPENED` / `DOC_RELIED` / `PLAN_TO_HAND` | evidence-use behaviour |
| `MEDCLUE_FLAGGED` | proactive risk spotting |
| `CONFIDENCE` | confidence vs correctness (over/under-confidence) |
| `ALIGNMENT_DONE` / `FLOWTEST_DONE` / `BEST_INTERESTS_PROCESS` / `PARAMEDICS_HANDOVER` | signature-interaction competence |
| `REDFLAG_RECOGNISED` / `FIRST_AID` / `ESCALATION` / `LEFT_TABLE` | emergency recognition latency and response quality |
| `END_SESSION_QUESTIONNAIRE` | self-reported confidence, flagged-for-manager |

Plus derived per-attempt: domain scores (0-100), readiness band, duration, and
the strongest/focus areas already computed for the debrief summary card.
