# F2–F4 talking-head video scripts (Priya · Aaron · Marcus)

**For:** avatar / talking-head production · **From:** Chris / Rapid Learn
**Companion to:** `F1-video-scripts.md` (The Teatime Shift). Same production rules.

These cover the three new frontline scenarios now built and playable:
- **S2 — New Arrival, Old Plan** (Priya, her own flat)
- **S3 — Preparation Under Pressure** (Aaron, shared house)
- **S4 — Happy Birthday** (Marcus, restaurant)

**Decision (client):** each scenario keeps its **own** intro, because a scenario-specific
welcome tees that shift up. So the intro is a per-scenario asset (like the handover): S1
already has one, and S2/S3/S4 need one each (section 0). Each scenario also needs its
**handover clip**. Debrief opening clips (section 4) are optional for now: the debrief shows
a placeholder slot and renders its reveal as on-screen text, so record the intros and
handovers first and the debrief openers when convenient.

The build reads the intro from each scenario's data, so a recorded clip drops straight in
(add `intro:{video, vtt}` to that scenario's build). Until then S2/S3/S4 show a placeholder.

**Personas (keep consistent with F1):**
- **EDUCATOR** — calm practice educator / assessor. One recurring face. Used for the
  welcome and all debrief segments, across every scenario. Framing, wardrobe, lighting
  and background must match the F1 EDUCATOR exactly (clips are stitched per run).
- **COLLEAGUE** — a diegetic handover voice. In lone-worked settings there is no colleague
  in the room, so the handovers below are written for the **EDUCATOR in second person**
  ("Before you start…"). If you prefer a colleague first-person cut where one exists,
  notes are given per scenario.

**Universal production notes (unchanged from F1):**
- Every clip is **self-contained** — never "as I said earlier / next" — order changes per run.
- Neutral, unhurried delivery. Register is "nothing dramatic". No theatrics, especially on any fatal segment.
- Burn in captions **or** supply a caption/transcript track (accessibility + SCORM). Captions ship inline as base64 VTT in the build.
- **No em dashes in spoken lines** (house rule for all user-facing copy). Durations are targets; shorter is better.
- 16:9, 1920×1080. Match the F1 talking-head framing so the landing/handover video tiles are consistent.

**Avatar (Synthesia) safety — important**
Synthesia's medical policy allows general, educational health framing but **rejects
personalised medical advice, diagnoses, treatment or first-aid instructions, medication
directives, and condition-specific claims** an avatar "speaks". So the rule for every clip
below is:
- The **avatar speaks only the human, non-clinical framing** of the shift: the setting, the
  pressure, the people, and the "no hints / your choices decide it" spine.
- **All clinical specifics stay on screen, not in the avatar's mouth** — IDDSI levels, named
  conditions or events (e.g. a seizure), the hospital/discharge detail, capacity and
  best-interests wording, and every emergency / first-aid step. These already live in the
  app as **on-screen text** (the landing intro copy and fact tiles) and in the app's own
  components (records, red-flag and escalation panels), which are not avatar-generated and
  so are outside Synthesia's moderation.

This is why the scripts below are deliberately light on clinical detail: the learner still
gets all of it, just read on screen rather than spoken. If a clip is still flagged, move the
offending line into the on-screen copy and keep the spoken version reflective and general.

---

## 0. PER-SCENARIO INTROS · EDUCATOR · ~20s each
*Each plays inline on that scenario's landing and tees the shift up. Reworded to be
avatar-safe (see the Synthesia note above): the spoken lines carry only the human framing;
the clinical detail sits in the on-screen intro copy. Keep the shared spine ("no hints / no
single right answer / what happens is whatever your choices make happen" + "when you're
ready, begin your shift") consistent with the existing S1 intro. S1 (The Teatime Shift) is
already recorded — see `F1-video-scripts.md` section 1.*

**S2 — New Arrival, Old Plan (Priya)**  ·  *already recorded and wired; low-risk wording, kept as-is*
> Welcome to New Arrival, Old Plan. This is your first shift since Priya came home to her own flat, after a spell in hospital. You are on your own, and the meal left ready for her may not be the one she needs now.
>
> There are no hints, and no single right answer. What happens is whatever your choices make happen.
>
> The hardest risks here are the quiet ones, sitting in the paperwork. When you are ready, begin your shift.

**S3 — Preparation Under Pressure (Aaron)**  ·  *reworded (removed the seizure and texture specifics)*
> Welcome to Preparation Under Pressure. It is a busy, disrupted breakfast. There are contractors on site, colleagues who have not worked with the people here before, and a great deal happening at once. It would be easy to rush, or to cut a corner.
>
> There are no hints, and no single right answer. What happens is whatever your choices make happen.
>
> The small details matter more today than the noise around you suggests. When you are ready, begin your shift.

*Moved to on-screen intro copy (already in the S3 landing text): Aaron was drowsy after a seizure yesterday; his breakfast is Level 3 and his drinks Level 2; the two thickener tins by the kettle.*

**S4 — Happy Birthday (Marcus)**  ·  *reworded (removed the capacity claim)*
> Welcome to Happy Birthday. You are taking Marcus out for his birthday meal, with a family who love him and would like the rules to bend, just for today. The kind thing and the safe thing will not always feel like the same thing, and the pressure will be on you.
>
> There are no hints, and no single right answer. What happens is whatever your choices make happen.
>
> Including him in every part of his day, safely, is what this shift asks of you. When you are ready, begin your shift.

*Moved to on-screen intro copy (already in the S4 landing text): Marcus lacks capacity for eating and drinking risk decisions, so a change to his plan is a best-interests decision, and his "yes" to please his Dad is not informed agreement.*

---

## 1. S2 HANDOVER — Priya · EDUCATOR, second person · ~34s
*Plays in the media band on the S2 handover screen. Setting: Priya's own supported-living flat, first shift since she came home from hospital.*

> This is your first shift since Priya came home to her flat, after a spell in hospital. You are on your own here. The only other worker nearby is a bank colleague, covering other flats, who has never met her.
>
> A meal has been left ready for her, and there is a prompt card up in the flat telling you what she eats. Her daughter is visiting.
>
> Before you go through to the meal, read what the flat holds about Priya. The quickest thing to reach for may not be the one that matters. When you are ready, go through to the meal.

*Colleague-first-person alternative (if you want a phone handover from the outgoing shift): change to "I've just finished with Priya…" and "the nearest cover is a bank worker who's never met her."*

---

## 2. S3 HANDOVER — Aaron · EDUCATOR, second person · ~35s
*Plays in the media band on the S3 handover screen. Setting: Bramble Close shared house, a disrupted breakfast.*

> You are leading breakfast at Bramble Close this morning, and it is not a calm one. Contractors are in replacing a boiler, breakfast has moved to the lounge, and two of the three staff on shift are agency, who have not worked here before.
>
> There is a great deal happening at once, and it would be easy to rush, or to let something slip. This morning rewards care and attention, not speed.
>
> Before you start, take a proper look at what the service holds about the people you are supporting today. When you are ready, start the preparation.

*Synthesia rejected the earlier cut. This version removes every person- and care-specific
line: no "not quite himself", no "his breakfast needs preparing", no "how things should be
done for him". The avatar now speaks only about the disrupted shift and general attention;
everything about Aaron (his name, the seizure, the IDDSI levels, the thickener) is carried
by the on-screen handover text and his records, which are not avatar-generated.*
*Colleague-first-person alternative (an outgoing worker exists here): "I'm handing you a messy one this morning…" then the same, keeping all person/care detail on screen.*

---

## 3. S4 HANDOVER — Marcus · EDUCATOR, second person · ~34s
*Plays in the media band on the S4 handover screen. Setting: before a birthday meal at a busy restaurant.*

> Today you are taking Marcus out for his birthday meal, with his Mum, his Dad and his sibling. You are on your own, in a public place, and the family are excited for him.
>
> The family love Marcus and will want the day to be perfect, and that will put the pressure on you. Not every kind thing in the moment is the safe thing.
>
> Before the food is ordered, check what you have brought with you. Away from base, his plan and the on-call number only help if they are to hand. When you are ready, go to the table.

*Avatar-safe reword: the capacity and best-interests detail is carried by the on-screen landing copy and Marcus's records (the EDAR), not spoken.*
*No colleague is present in S4, so keep this one EDUCATOR second person.*

---

## 4. DEBRIEF — one clip per outcome (per scenario) · EDUCATOR
*One self-contained clip per outcome path (A/B/C/D). The debrief has a **single video slot**
and plays the clip matching the run's outcome, so there is **no stitching** — nothing to
frame-match between clips (this avoids the Synthesia end-frame / mid-blink mismatch). Optional
for now: wire later. Keep the D / fatal cut sombre, unhurried, no music sting. Substitute the
person's name as below.*

**Each clip = human framing + verdict, then hand to the on-screen breakdown.** All run-specific
detail is **rendered in the debrief itself**, so the clip never has to name what actually went
wrong on this run: the **critical-control cards** (held/tripped), the scenario **reveal box**,
the **domain breakdown**, the **targeted toolkit** and the **cross-track reveal** all sit on
screen. The clips below end by pointing the learner there.

**Avatar-safe (Synthesia):** reflective, not instructional — no IDDSI level numbers, no
step-by-step first aid, no "call 999". The specifics are on screen.

### S2 — Priya
- **A · Prevention** > Nothing dramatic happened, and that is the point. You treated the current record as the one that mattered, prepared the right meal for her, and kept Priya's choice and dignity intact in her own home. The trap in the paperwork never reached her plate.
- **B · Near miss, recovered** > There was an unsafe moment at the table, and you caught it in time. You recognised what was happening and acted, and Priya came through it. Recognising a near miss and responding is success, not failure. But the conditions were set earlier, and that is what we will look at.
- **C · Emergency, survived** *(reworded — avatar-safe)* > This one was a close call. On your own in her flat, the margins were always going to be thin, and by the time things reached that point the safe controls earlier had already gone. Priya came through it, but only just. The screen shows the chain that led there. Sit with it, because it should never have got this close.
- **D · Fatal** > Take a moment. This shift ended in the outcome the training exists to prevent. Priya did not survive. This was not one mistake, and it is not about blame. It was a chain, and each link, held, would have changed the ending.

### S3 — Aaron
- **A · Prevention** > Nothing dramatic happened, and that is the point. The right textures, prepared with care, a drink checked before it was served, and a settled, unhurried room. Aaron's breakfast kept its identity and his dignity was intact.
- **B · Near miss, recovered** > An emerging problem showed at the table, and you caught it. You recognised it and acted, and Aaron came through it. Recognising a near miss is success. But the conditions were set earlier, in the preparation and the room.
- **C · Emergency, survived** *(reworded — avatar-safe)* > This one was a close call, made more likely by the rush and the disrupted room. Aaron came through it, but the margins earlier in the shift had already gone by the time it reached that point. The screen shows where the chain could have held. Sit with it for a moment.
- **D · Fatal** > Take a moment. This ended in the outcome the training exists to prevent. Aaron did not survive. This was not one mistake, and it is not about blame. It was a chain, and any single link, held, would have changed the ending.

### S4 — Marcus
- **A · Prevention** > Marcus was included in every part of his birthday, safely. You held the harder middle, safe inclusion, rather than caving to the family or shutting him out with a blanket no. The family were reassured, and the decision was recorded properly.
- **B · Near miss, recovered** > There was an unsafe moment, and you caught it in the noise. You recognised it and acted, and Marcus came through it. Recognising a near miss is success. But the pressure that led there was building earlier.
- **C · Emergency, survived** *(reworded — avatar-safe)* > This one was a close call, in a busy public place with the family around him. Marcus came through it, but by the time it reached that point the safe controls had already gone under the pressure. The screen shows the chain that led there, and where it could have held. Sit with it for a moment.
- **D · Fatal** > Take a moment. This ended in the outcome the training exists to prevent. Marcus did not survive. This was not one mistake, and it is not about blame. It was a chain, and any single link, held, would have changed the ending.

*The cross-track reveal is rendered as on-screen text in each scenario's debrief (no recording needed).*

---

## Clip count summary
| Group | Clips | Notes |
|---|---|---|
| Per-scenario intros | 3 | Priya, Aaron, Marcus — **recorded + wired** (S1 intro already existed) |
| Handovers | 3 | Priya, Aaron, Marcus — **recorded + wired** |
| Debrief — one clip per outcome (A/B/C/D × 3) | +12 | optional; single-slot per run, no stitching |

All intros and handovers (incl. the S1 mobile re-cut) are now recorded and wired; the only
video work left is the optional per-outcome debrief clips.

## Clinical note
All emergency wording is held at "recognise the emergency, call 999, follow choking
first-aid guidance" — no physical technique is taught or shown, per Emma (SME). Any change
to emergency, best-interests or caveat wording is Emma's to confirm before recording.
