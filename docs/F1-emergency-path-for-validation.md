# F1 "The Teatime Shift" — Emergency Path (Path C/D) on-screen wording

**For:** Emma (SME) — clinical validation
**From:** Chris / Rapid Learn (build)
**Status:** DRAFT for clinical sign-off. **Not built into the prototype and not to be demonstrated** until validated.
**Sources used:** TK2.3 Incident Escalation Flowchart · TK7.1a Choking Red Flags · TK7.2a Incident Response – Who to Call · TK7.3a Staff Pocket Guide · TK7.4 Grab Checklist & Flowchart · TK7.7 Family Information Leaflet.

---

## 1. What we need from you

Please validate two things:

1. **Clinical accuracy** of the on-screen wording in §4–§6 below (especially anything a learner is told to *do*).
2. **The step mapping** — each screen cites the toolkit source it came from; please confirm the mapping is faithful, and flag anything missing or mis-ordered.

Specific clinical questions are collected in **§7**. Nothing here is finalised or demo-ready until you have confirmed it.

---

## 2. How the fatal outcome is reached — the credible chain

Emma's condition: the fatal outcome must follow *"a credible chain of missed evidence, delays or unsafe decisions… not one incorrect choice."* The mechanics already enforce this. To reach the worst case, **three independent failures must stack up**:

| Gate | What must go wrong | Existing mechanic |
|---|---|---|
| 1. Priming | A critical control is broken earlier in the shift — an unsafe (uncut) plate is served **(CC2)**, or supervision is broken while food is in reach **(CC1)**. | `UNSAFE_MOUTHFUL_POSSIBLE = true` |
| 2. Emerging signs (N5) | At the first cough/quiet phase the learner fails to recognise and act — they hesitate ("wait and see") or make it worse ("offer a drink"). | N5 = risky or failing |
| 3. Emergency response (N6, new) | Faced with a full obstruction, the learner does not run the emergency response — they freeze, leave to fetch help, or do not call 999. | N6 = failing |

- Pass gate 1 → **Path A, Prevention** (already built).
- Fail gate 1, pass gate 2 → **Path B, Near miss, recovered** (already built).
- Fail gates 1–2, pass gate 3 → **Path C, Emergency — survived** (new).
- Fail gates 1–3 → **Path D, Emergency — fatal** (new).

The fatal outcome is therefore never one click, never forced, and Path A is always reachable. This matches TK2.3's premise that escalation follows *"any choking incident"* and the Master Spec's "never forced" rule.

---

## 3. New decision node required: N6 — Emergency response

Path C/D needs one new node after N5. Daniel has a full obstruction (silent choking). The learner must run the response. The three options below map to **TK2.3 stages 1–4**, **TK7.1a** (recognition) and **TK7.2a / TK7.3a** (call 999 + start first aid).

**Scene text (on screen):**
> Daniel cannot breathe, speak or cough. He is silent, gripping the table, his face changing colour. This is a choking emergency.

*[Source: TK7.1a — "Cannot breathe, speak or cough → Airway blocked → Stop meal, call 999, follow choking response"; "Silent choking → Person cannot cough or call out → Emergency response, do not delay". TK7.7 emergency panel — "Cannot breathe or speak / Is choking and it won't stop / Collapses during eating".]*

**Prompt:** *He cannot clear it. What do you do?*

| Option | On-screen text | Result |
|---|---|---|
| **Defensible** | "Shout for help, start choking first aid straight away, and call 999 without stopping support." | → Path C (survived) |
| **Risky** | "Start first aid, but deal with the 999 call only once you have a free moment." | → Path C (survived), delay flagged |
| **Failing** | "Leave Daniel to run for the shift leader upstairs." *(or)* "Try to wash it down with a drink." | → Path D (fatal) |

*[Source for the response actions: TK2.3 Stage 1 "Choking Incident Identified", Stage 2 "Assess Airway and Breathing", Stage 3 "Call 999 if Airway Obstructed", Stage 4 "Provide Emergency First Aid". TK7.2a — "Choking, cannot breathe or speak → 999 → Immediately → Start choking first aid". TK7.3a — "Cannot breathe or speak → 999… Start choking first aid immediately."]*

> **Clinical check needed (see §7):** we have deliberately **not** scripted a specific first-aid technique (back blows / abdominal thrusts / CPR if unconscious), because the toolkit sources say "start choking first aid" without technique detail. Please tell us whether to name the technique on screen or keep it at "follow choking first aid", and confirm the correct 999-vs-first-aid ordering.

---

## 4. Path C — Emergency, survived

Reached when N6 = defensible or risky. Daniel's obstruction is cleared / he is stabilised and taken to hospital; he survives. The screen then walks the **post-incident escalation**, mapped stage-for-stage to TK2.3.

**Outcome banner:** *Emergency — resolved*
**Heading:** *Daniel is stabilised and taken to hospital*

**Body:**
> The obstruction was serious. You recognised the emergency, gave choking first aid and called 999, and the paramedics took over. Daniel is alive because the response was run without delay — but this was not a near miss. What follows is not optional; it is the escalation every incident requires.

**"What happens next" sequence (numbered steps on screen):**

| # | On-screen step | Source |
|---|---|---|
| 5 | Inform the manager immediately. | TK2.3 Stage 5 "Inform Manager Immediately" |
| 6 | Complete the incident report. | TK2.3 Stage 6; TK7.4 "Incident form completed" |
| 7 | Notify Daniel's family / advocate. | TK2.3 Stage 7 "Notify Family/Advocate"; TK7.4 "Family or next of kin contacted" |
| 8 | Consider a safeguarding notification. | TK2.3 Stage 8; TK7.2a — "Safeguarding concern → Safeguarding Lead / Local Authority → Without delay" |
| 9 | Complete a root cause analysis. | TK2.3 Stage 9; TK7.4 "Root cause review initiated" |
| 10 | Review the EDAR and support plans. | TK2.3 Stage 10 "Review EDAR and Support Plans" |
| 11 | Implement learning and actions. | TK2.3 Stage 11 "Implement Learning and Actions" |

*(Steps 1–4 were the emergency response itself, handled at N6. Steps 5–11 are the post-incident chain, verbatim from TK2.3.)*

**Close:** move to debrief (as Paths A/B), plus the cross-track reveal.

---

## 5. Path D — Emergency, fatal (worst case)

Reached only when all three gates fail (N6 = failing). To be handled *"carefully and with a clear learning purpose"* (Emma). The point is the consequence of the chain, not shock.

### Screen 5a — The outcome
**Banner:** *Emergency*
**Heading:** *Daniel does not survive*

**Body:**
> The airway stayed blocked. Without the emergency response being run in time, Daniel could not be resuscitated. This is the outcome the whole shift was working to prevent.
>
> It did not come from one moment. It came from a chain: a plate that did not meet Daniel's plan, supervision that broke while food was in reach, a medication change no one had connected, and an emergency that was not answered in time. Any one link, held, would have changed the ending.

*[Source: TK2.3 premise; F1 build script §7 "Worst-case handling"; the chain mirrors the run's own CC1/CC2/medication mechanics.]*

### Screen 5b — Aftermath and notifications
> In the hours that follow: the manager is informed, the incident is reported, and Daniel's family are contacted. A safeguarding notification is made, and — because a person has died — the service notifies CQC. A root cause review begins.

*[Source: TK2.3 Stages 5–9; TK7.2a — "Serious incident (harm or death) → CQC → Manager to notify"; TK7.4 "Immediately after the incident" and "Incident to Learning Flowchart" Step 2 Notifications.]*

### Screen 5c — The team
> You are not expected to carry this alone. The team holds a debrief, colleagues who witnessed it are checked on, and emotional support is offered to staff. Being affected by this is not a weakness; it is human.

*[Source: TK7.4 — "Staff supported and removed from immediate pressure", "Quick debrief held", "Emotional support offered to staff", "Check in with others in the home who witnessed the incident".]*

### Screen 5d — Reflection (learning purpose)
Structured reflection, framed around prevention, not blame:
> Sit with what this shift shows. The links that led here were ordinary and preventable. In the debrief you will see where each one could have held.

*[Source: intended to use TK5.4 Emotional Impact reflection — see §7, this document is not in the set provided.]*

Then → debrief + cross-track reveal, as other paths.

---

## 6. Recognition wording bank (for reuse / consistency)

Exact phrases drawn from the toolkit, to keep on-screen recognition language faithful:

- **Silent / total obstruction:** "Cannot breathe, speak or cough" · "Silent choking" · "Blue or grey lips or face" — *TK7.1a, Immediate danger.*
- **Escalating signs (pre-obstruction, N5):** "Coughing during or after swallowing" · "Wet or gurgly voice after eating" — *TK7.1a, Eating and drinking.*
- **"A quiet phase after coughing can mean the airway is blocking. Do not wait it out."** — current prototype line; supported by TK7.1a "Silent choking… Emergency response, do not delay." *(Confirm this paraphrase is acceptable.)*
- **Who to call:** "999 — Immediately — Start choking first aid" — *TK7.2a.*

---

## 7. Open clinical questions for Emma

1. **First-aid technique on screen** — name the technique (encourage coughing → back blows → abdominal thrusts; CPR if unconscious) or keep it at "follow choking first aid"? Toolkit sources are silent on technique.
2. **Ordering** — confirm the correct relationship between starting first aid and calling 999 for a lone worker (e.g. shout for help first; call 999 if obstruction not cleared). We have drafted "start first aid AND call 999 without delay" as defensible.
3. **Collapse / unconsciousness** — if Daniel becomes unconscious, should the sim branch to a CPR prompt, or is that beyond F1 scope?
4. **Fatal outcome explicitness** — is "Daniel does not survive" the right level of directness, or do you want softer/again wording for Screen 5a?
5. **Family notification tone (Screen 5b)** — confirm this stays first-person-about-the-worker's role and does not script what is said to the family.
6. **TK5-series references** — Screens reference TK5.4 (emotional impact), the incident report (TK5.5a) and Early Watch (TK5.1); these TK5/TK1 documents were not in the set shared. Please confirm titles/refs, or send them so we can source the exact wording.
7. **Safeguarding vs CQC** — we cite TK7.2a's "Serious incident (harm or death) → CQC → Manager to notify". Confirm the sim should surface CQC notification on the fatal path.

---

## 8. Once validated

On your sign-off we will:
- add node **N6** and the **Path C / Path D** branches to the flow,
- wire the outcome/aftermath/reflection screens with your confirmed wording,
- add telemetry for the emergency response (recognition + action latency, 999 called, first aid given),
- keep Path A always reachable and the fatal outcome gated behind the full three-failure chain.

No part of this is added to the working prototype until then.
