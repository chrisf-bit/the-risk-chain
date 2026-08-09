# F1 "The Teatime Shift" — talking-head video scripts

**For:** avatar production · **From:** Chris / Rapid Learn
**Personas (recommend two, for consistency):**
- **COLLEAGUE** — the support worker going off shift / up to the medication round. Diegetic, warm, slightly rushed. Used for the handover only.
- **EDUCATOR** — a calm practice educator / assessor. Used for the welcome and the whole debrief. One recurring face across all debrief segments.

*(If you'd rather use a single face throughout, the EDUCATOR can voice the handover too — just make it third-person "You take the handover…" instead of the colleague's first-person.)*

**Universal production notes**
- Keep framing, background, wardrobe and lighting identical across all EDUCATOR clips — they get stitched together per run, so cuts must match.
- Every clip is **self-contained** — never "as I said earlier / in a moment" — because which clips play, and in what order, changes each run.
- Burn in captions **or** supply a caption/transcript track (accessibility + SCORM).
- Neutral, unhurried delivery. This sim's register is "nothing dramatic" — avoid theatrics, especially on the fatal segment.
- Durations are targets; shorter is better.

---

## 1. WELCOME (introduction only)  ·  EDUCATOR  ·  ~22s
*Plays as the opening introduction. Pure welcome. The disclaimer has been moved to the end of the shift (see section 1b) at the client's request, so this clip no longer contains it and there is no acknowledge gate.*

> Welcome to The Teatime Shift.
>
> For the next fifteen minutes, you're going to lead a real teatime at a care home, supporting a man called Daniel through his meal, on your own.
>
> There are no hints, and no single right answer. What happens is whatever your choices make happen.
>
> Nothing about this shift looks dramatic, and that is exactly the point. This is how real practice feels, and it is where real judgement is made.
>
> When you're ready, begin your shift.

*Alternative closing line, if you'd rather hand straight to the colleague: "When you're ready, begin your shift. Your colleague is about to hand over to you."*

---

## 1b. DISCLAIMER at the end  ·  on-screen text (no video)
*The SME-owned caveat now appears verbatim on the **summary / debrief** screen, rendered on-screen (the `caveatBox()` component), not spoken. No recording needed. Wording is locked and must stay word for word:*

> **[VERBATIM: This simulation is for learning and reflection. It does not replace or override a person's individual eating, drinking and swallowing plan, professional or clinical guidance, your organisation's own policies and procedures, accredited first-aid training, or the instructions of the emergency services.]**

---

## 2. HANDOVER  ·  COLLEAGUE  ·  ~35s
*Plays in the media band on the handover screen. The colleague hands over and leaves you alone.*

> Right — I've got to get upstairs for the medication round, so teatime's yours now. It's just you and Daniel; his housemate's at the table as well.
>
> Before you go over, take a proper look at what we hold on Daniel — his mealtime plan, his records, the reference tools. They're all there on the right. Nothing's flagged for you, though. Part of this is spotting which ones actually matter today.
>
> When you're set, go to the table. You've got this.

---

## 3. DEBRIEF — one clip per outcome  ·  EDUCATOR

**One self-contained clip per outcome path (A/B/C/D).** The debrief has a single video slot
and plays the clip matching the run's outcome, so there is **no stitching and nothing to
frame-match** between clips (this avoids the Synthesia end-frame / mid-blink problem). Each
clip is the human framing plus the verdict, then hands to the **on-screen breakdown** for the
run-specific detail. Record all four; keep the D / fatal cut sombre, unhurried, no music sting.

**Avatar-safe (Synthesia):** reflective and general — no step-by-step first aid, no "call 999",
no IDDSI numbers. The specifics are on screen (see §3b).

**A · Prevention  ·  ~28s**
> Nothing dramatic happened, and that is exactly the point. The meal stayed safe from start to finish, and Daniel had an ordinary, unhurried teatime. That is prevention doing its job quietly, before anything can go wrong. On the screen you can see how each part of your practice held up, and the two controls that kept the meal safe. And if you connected the smaller signals in the records as well, that is prevention working days ahead, not just in the moment.

**B · Near miss, recovered  ·  ~30s**
> Daniel took an unsafe mouthful, and you caught it. You recognised what was happening and acted, and he came through it. Recognising a near miss and responding is success, not failure. But the conditions for it were set earlier in the shift, and the breakdown on the screen shows where. Recording the near miss, and getting his plan looked at again, is the right way to close it.

**C · Emergency, survived  ·  ~30s**  ·  *reworded after Synthesia rejected the emergency-response wording*
> This one was a close call, and the worst was avoided. But it came far closer than it ever should have. By the time things reached that point, the safe margins earlier in the shift had already gone. The screen shows the chain that led there, and where any single link, held, would have changed it. Sit with it for a moment, because a shift should never get this close.

**D · Fatal  ·  ~38s  ·  sombre, unhurried, no music sting**
> Take a moment before we go on. This shift ended in the outcome the training exists to prevent. Daniel did not survive.
>
> I want to be clear about two things. This was not one mistake, and it is not about blame. It was a chain, and each link, on its own, was recoverable. The screen walks through every link, because any single one of them, held, would have changed the ending.

### 3b. What moved on-screen (no longer spoken — nothing is lost)
The old per-cause spoken segments and the cross-track reveal are now **rendered in the debrief
itself**, so they need no clip and no stitching. Each per-outcome clip above deliberately points
the learner to this on-screen breakdown:
- **Critical controls (CC1 supervision, CC2 unsafe plate)** — the two critical-control cards
  show held or tripped, each with its explanation.
- **The medication clue** (missed, or caught-and-praised) — the debrief **reveal box**.
- **A delayed call for help** on Path C — named in the outcome copy and the "captured this run"
  events line (`EMERGENCY_RESPONSE`).
- **Cross-track reveal** ("the shift your paperwork produced") — on-screen text at the foot of
  the debrief (`crossTrackReveal()`), every run. Not a clip.

---

## 4. OPTIONAL — escalation replies (short reaction clips)
*Only if you want the "who to call" learning reinforced in the moment. Keep to a few seconds each; these are cutaways, not scenes. **Not currently used in the app.***

> **Synthesia caution:** an avatar speaking emergency/first-aid instruction ("follow the choking first-aid guidance", "ambulance is on its way") is exactly what Synthesia rejects. If you build these, keep the spoken line to a human reassurance only and let any procedural detail sit on screen. Safer rewrites below.

**Shift leader answers (N4 escalate)  ·  ~6s**
> I'm on my way down, thirty seconds behind you. Stay with Daniel.

**999 call handler (N6, correct response)  ·  ~8s**
> Help is on its way to you now. Stay with him, keep doing what you're doing, and tell me the moment anything changes.

---

## Clip count summary
| Group | Clips |
|---|---|
| Welcome | 1 |
| Handover | 1 |
| Debrief — one clip per outcome (A/B/C/D) | 4 |
| **Core total** | **6** |
| Optional escalation replies | +2 |

The debrief is now **one self-contained clip per outcome** (no cause segments, no separate
reveal clip): the app plays the single clip matching the run, and all run-specific detail
(critical controls, medication reveal, delayed-call note, cross-track reveal) is rendered
**on screen**. This removes the stitching entirely, so there is no end-frame / mid-blink
mismatch to worry about.

## Clinical note
All emergency wording is held at "recognise the emergency, call 999, follow choking first-aid guidance" — no physical technique is taught or shown, per Emma (SME). Any change to the emergency or caveat wording is Emma's to confirm before recording.
