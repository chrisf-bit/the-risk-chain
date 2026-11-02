# Safeguarding Adults Connected Simulation — build plan

**For:** build planning · **From:** Chris / Rapid Learn
**Source of truth:** *PracticE Ready - Safeguarding Adults Connected Simulation - Master Specification v1.0* (Emma Reeve, 21 Aug 2026).
**Companion build docs:** the choking programme (`index.html`, `frontline.html`, and the `F1`/`F2-F4` video + image docs). This sim reuses that architecture, brand and asset pipeline.

> This is the Rapid Learn build plan that sits under Emma's spec. The spec fixes the
> architecture, scenarios, coverage, critical controls and scoring. This doc translates that
> into *what we build, in what order, as a standalone product*, and lists the assets (video
> scripts, image prompts) each scenario needs.

---

## 1. Product shape and deploy

- **Standalone single file: `safeguarding.html`**, same repo (`chrisf-bit/the-risk-chain`),
  deployed to the same Render static site at **`<render-url>/safeguarding.html`**. This mirrors
  exactly how Frontline was added alongside The Risk Chain: one repo, one static publish path,
  separate URLs, no coupling between products. Deploy = `git push` → user hard-refreshes.
- **No build step, no dependencies.** CSS in one `<style>` block near the top, all logic in one
  `<script>` at the bottom. Self-hosted font, inline base64 video captions, SCORM-safe offline.
- **Decoupled from the choking sims by rule.** It reuses *patterns and brand*, never imports or
  links them. Same discipline as Frontline vs The Risk Chain.
- **Before every push:** brace/paren/bracket balance check + `node -c` the extracted script (the
  same guard used on `frontline.html` — the file will be large and a typo breaks the app).

## 2. Engine architecture (reuse the proven Frontline engine, rebuilt clean)

The Frontline choking engine already does ~70% of what the safeguarding *frontline* track needs,
so we lift the proven shape into a fresh file rather than reinvent it:

- **Picker → per-scenario run → forward-aftermath → structured debrief.** A `SCENARIOS` registry
  with per-scenario `meta` + a `build` bundle; active scenario `SC`; `bindScenarioData()` points
  engine globals at `SC.build`. Gated progression persisted separately from run-state.
- **Evidence interface:** document cards/pills the learner opens and *relies on* (telemetry
  distinguishes opened vs relied-upon — already proven on the choking build).
- **Decision nodes** with **defensible / risky / failing** options (the spec is written in exactly
  this three-column shape, so it maps 1:1).
- **Critical controls** with two handlings: **hard-fail** (irreversible; ends the run to the
  failing path) and **forced-recovery** (first trip gives a recovery branch; recognised-and-
  recovered is a valid success). The spec's §14 register lists all 20 CCs and their split.
- **Three outcome paths** (not four): **A protected · B protection delayed · C serious harm
  continues**. All reachable, none forced. (Choking used A/B/C/D; safeguarding collapses to three
  per spec §18 `OUTCOME` enum and §20.)
- **Telemetry event dictionary** (spec §18) emitted as the learner acts — this *is* the scoring
  model and the debrief's evidence. Build to the payloads as specified.

**Why standalone and not new Frontline scenarios:** safeguarding has three *tracks* (frontline,
manager, director), two of which are dashboard/turn-based rather than first-person shifts, plus a
forward-aftermath structure and a wellbeing wrap the choking engine doesn't have. A clean file
keeps it separately sellable (the spec's whole §3 commercial argument) and avoids bloating
`frontline.html`.

## 3. The three tracks and seven scenarios (spec map)

| Code | Title | Person · setting | Track | Failure mode | New mechanic it drives |
|---|---|---|---|---|---|
| SG-F1 | Something Doesn't Add Up | Tomas · Ashcombe House | Frontline | Recognition + recording; plausible innocent explanation (seizures) | Document-search recognition (reuses choking mechanic) |
| SG-F2 | A Friend Who Helps Out | Yvonne · own flat, domiciliary | Frontline | Concern that doesn't look like abuse; the person says no | Capacity-vs-consent; pattern-linking |
| SG-F3 | She Tells You at Ten Past Four | Nadia · Sandhill Road, late shift | Frontline | Respond to a disclosure without damaging it; act before 6pm | **Disclosure handling, running deadline, blocked escalation** |
| SG-F4 | The Way We Do Things Here | Colin · Ashcombe House, late shift | Frontline | Name normalised poor practice as abuse; report the colleague you'd normally tell | **Cumulative scoring across a whole shift** (no single decisive node) |
| SG-M1 | Three Concerns and One Afternoon | Registered manager · Ashcombe | Manager | Triage 3 live concerns; threshold, protection, referral, notification | **Dashboard/turn-based**, s42 test, notification chain |
| SG-M2 | The Allegation, and the Person It Is About | Registered manager | Manager | Person-in-position-of-trust; parallel processes; blocked route | Parallel-process integrity, DBS-survives-resignation |
| SG-D1 | Low Numbers Look Like Safety | Regional/operations director | Director | See organisational abuse in reassuring data; don't fix it with training | **Assurance dashboard**, SAR, candour under pressure |

**Shared world (spec §7):** Rowan Care Group (carried from the choking programme), the Ashcombe
locality, four services. People: **Tomas 36** (LD + epilepsy), **Yvonne 47** (MH, exploited),
**Nadia 29** (autistic), **Colin 81** (vascular dementia), **Errol 68** (stroke, pressure ulcer).
Staff are role labels + first names; **no one is written as obviously abusive** (Bev is liked —
that's the point). Local authority = Marston Council (configurable placeholder).

## 4. The new mechanics (the real engineering, none of it in the choking engine)

1. **Disclosure handling with question-type classification (SG-F3, also F1/F2).** The assessment
   turns on distinguishing an **open prompt** from a **leading / repeated** question, and on
   whether the learner **promises confidentiality**. Spec §19.2 flags free-text-vs-menu as an open
   build question. **Recommendation: menu-choice with carefully written option stems** for the
   first build (reliable classification, scores cleanly via `QUESTION_TYPE` / `PROMISE_MADE`
   enums), with a note that a free-text + classifier variant is a later enhancement. This keeps the
   prototype honest and shippable without an LLM-in-the-loop dependency.
2. **A real running deadline (SG-F3).** The 6 o'clock collection as a genuine live clock, same
   pattern as Frontline's 15:00 shift countdown (`startShiftClock()`), but here it **gates an
   outcome**: if the collection proceeds (CC2) it's a hard-fail. Clock drives jeopardy, not just
   flavour.
3. **Blocked / alternative escalation routing (F1, F3, F4, M2).** On-call rings out; the obvious
   person to tell *is the concern*. The learner must reach the **alternative route** (nominated
   individual → local authority → regulator → police). Modelled as an escalation node whose
   "correct" target shifts when the normal route is blocked (`ALT_ROUTE_USED` telemetry).
4. **The forward-aftermath sequence (ALL scenarios, spec §5.2).** On the failing path the run
   jumps forward through **three windows — 72 hours · three months · the review** — and **replays
   the learner's own words and timings back to them** from telemetry ("your own daily note read
   back"). Never previewed, never skippable on the path taken, resolves *into* the debrief. This is
   the single sharpest device in the programme and is cheap to build (it's a render over captured
   events). Build it as a first-class screen (`viewAftermath`).
5. **Cumulative whole-shift scoring (SG-F4).** Seven failures spread across four people, the
   routine and the building — no single decisive node. Scores across the shift, not at one moment.
6. **Manager/director dashboards (M1, M2, D1).** Turn-based, evidence-pack + decision-log + the
   notification chain (LA referral, CQC notification, commissioner informed, DBS). A different
   interaction surface from the frontline shift; built after the frontline slice proves out.
7. **Cross-track replay (spec §15).** After a manager run, show the *actual frontline run* their
   service produced ("here is the shift your decisions produced"). On-screen reveal, not a clip.

## 5. Wellbeing wrap — a build requirement, not a nice-to-have (spec §17.1)

A safeguarding sim surfaces real lived experience. This is **designed in**:

- **Content notice before SG-F3 and SG-F4**, naming the themes without spoiling the scenario.
- **A second notice before the aftermath sequence** (where the run hits hardest).
- **An opt-out that carries no score penalty and no visible flag to the employer.**
- **Emotional-impact reflection built into every debrief**, not optional.
- **A signposted support route on the closing screen of every scenario** (configurable to the
  client's own provision).
- **A facilitator wellbeing note** for Tier 2/3 delivery (a doc deliverable, Emma owns the words).

## 6. Design system — inherit the PracticE Ready brand verbatim

Lift the finalised, client-approved brand tokens straight from `frontline.html` (do not
re-derive): navy `#072A6B`, teal `#16AFC2`, cyan `#21B8D9`, orange `#FF7A1A` **(reserved
highlight, not decoration)**, violet `#8A3CCB`, magenta `#D94A8A`; Source Sans 3 self-hosted
inline; glassy cards, soft ring gauges, floating header, near-black bold-accent dark theme.
**Primary CTA = bold teal + white** (the current agreed button, post the orange/navy reversal).

**Hard design rules carry across unchanged:** no em dashes in any user-facing copy; no left/top
accent handles; no visible scrollbars (content may scroll, scrollbars hidden); selection = fill
colour not outline; generously sized icons; don't lead the learner (this is *doubly* true here —
spec §6 "measure behaviour, do not prompt it": the sim must **never** say "this might be a
safeguarding concern"; whether and how fast the learner reaches that word is the primary data
point). WCAG 2.1 AA, both themes.

## 7. Recommended build order (straight from the spec, §19.1 and §20)

The spec is explicit and we should follow it — it's the lowest-risk path to something sellable:

1. **SG-F3 first, as the vertical-slice prototype.** It exercises the fullest chain in the
   shortest run and needs no dashboard, so it proves every new mechanic at once: disclosure
   handling, the running deadline, blocked escalation, recording-as-a-scored-competence, three
   outcome paths, the aftermath sequence, the wellbeing wrap, and the cross-track reveal.
2. **SG-F1 second.** The recognition scenario; reuses the document-search mechanic already proven
   on the choking build, so it's mostly content once the engine exists.
3. **SG-M1 third**, once the two frontline scenarios work — written as a complete connected spec,
   first dashboard/manager build.
4. **SG-F2, SG-F4, SG-M2, SG-D1** specified here and **held** for later releases.

## 8. Asset pipeline (same shape as the choking docs)

Each scenario needs, produced to the existing house rules:

- **Video scripts** (`docs/SG-video-scripts.md`), avatar-safe for Synthesia:
  - **Intro** (per scenario, ~20s) — human framing only; all clinical/legal specifics on screen.
  - **Handover** (per scenario, ~35s) — EDUCATOR second person or a diegetic colleague.
  - **Debrief** — **one self-contained clip per outcome (A/B/C)**, no stitching.
  - **AVATAR SAFETY IS A HARD CONSTRAINT.** The avatar speaks only the human, non-clinical,
    non-legal framing. Every statutory specific (s42, MCA, DBS, "call 999", category names,
    notification duties) lives in **on-screen text**, never in the spoken script. This is even
    tighter than choking because the subject is legal as well as clinical.
- **Image prompts / shot list** (`docs/SG-image-shotlist.md`): one scene banner per decision node,
  house treatment = natural, slightly desaturated, cool, calm, **no identifiable faces**, dignity
  first, nothing staged or dramatic, documents blank/mocked, under 2000px, 16:9. The aftermath
  windows also want a small, cold, procedural still set (an enquiry room, a file, a letter) — never
  a depiction of the abuse itself (spec §5.2 "consequences, never depiction").

## 9. Open decisions from the spec that affect the build (spec §19)

These are mostly Elton/Emma calls, but they change what we build, so flag them before they bite:

- **Disclosure as free-text vs menu (§19.2).** Recommendation above: menu for the prototype.
- **Named fictional LA vs configurable placeholder (§19.1).** Spec recommends placeholder with a
  sensible default; build it as a config object from day one so it's never hard-coded.
- **Content notice + opt-out (§19.1).** "Non-negotiable" — built in from the first scenario.
- **Do cross-track decisions persist (§19.1)?** Recommendation: **no** for the first release; keep
  the replay *reveal* (most of the value, far less build).
- **Hard-fail vs forced-recovery split (§14).** Emma's SME call to confirm; build reads it from a
  per-CC config flag so it's a one-line change per control if she revises it.
- **Configurable default referral timescales (§19.3).** Config value, not content.

## 10. First deliverable — SG-F3 vertical slice

What ships in the first build pass (everything needed to click through SG-F3 end to end, both
themes):

- `safeguarding.html` engine shell: picker (SG-F3 unlocked, others "coming"), landing with intro
  video slot, content-notice + opt-out gate, handover, the shift with the live 6pm clock.
- SG-F3's full node set (N1–N10 per spec §11.3), its 3 critical controls, its document set, its
  injects (SC2/SC3/SC7/SC8/SC11/SC14, max two live at once).
- Three outcome paths (A protected / B delayed / C harm continues), the **aftermath sequence**
  (72h / 3 months / review with own-words replay) on the non-protected paths, and the structured
  debrief with the six frontline scoring domains, the person's-voice close, and the transfer
  question.
- Wellbeing wrap end to end (both content notices, opt-out, emotional-impact reflection, support
  route).
- Draft **SG-F3 video scripts** (intro, handover, 3 debrief clips) and **SG-F3 image prompts**
  added to the asset docs, so you can start production in parallel.
- Placeholder media (blank banners / a placeholder video slot) until the real assets land, exactly
  as Frontline did.

Person-specific facts for Nadia are **provisional in the spec** and get locked in a Source of
Truth file once scope is agreed (spec §19.3). The build will keep them in one config object so a
later lock is a single edit.
