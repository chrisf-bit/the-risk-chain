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

## 3. DEBRIEF — modular segments  ·  EDUCATOR

The debrief plays **opening + any triggered cause segments + reveal**, in this order. A learner sees ~2–4 of these.

### 3a. Opening / verdict — record all four; play the one matching the outcome

**A · Prevention  ·  ~25s**
> So — nothing dramatic happened. And that is exactly the point. The right texture, steady pacing, eyes on Daniel the whole way through: a busy teatime became fifteen ordinary minutes. That's prevention doing its job, quietly, before anything can go wrong. Let's look at how you got there.

**B · Near miss, recovered  ·  ~28s**
> Daniel took an unsafe mouthful, and he coughed — and you caught it. You stopped the meal, kept him upright, called for help, and he cleared it. Recognising a near miss and acting on it is success, not failure. But the conditions for it were set earlier in the shift, and that's what we need to look at.

**C · Emergency, survived  ·  ~28s**
> This one was serious. It reached a full choking emergency — and Daniel survived, because the response was run. That's not a near miss, and it wasn't luck. But reaching an emergency at all means the safe margins were already gone earlier in the shift. Let's walk back through how it got there.

**D · Fatal  ·  ~35s  ·  sombre, unhurried, no music sting**
> Take a moment before we go on. This shift ended in the outcome the training exists to prevent. Daniel didn't survive.
>
> I want to be clear about two things. This wasn't one mistake — and this isn't about blame. It was a chain of failures, and each one, on its own, was recoverable. We're going to look at every link. Because any single one of them, held, would have changed the ending.

### 3b. Cause segments — record each once; play only if triggered

**Supervision broke (CC1)  ·  ~22s  ·  trigger: `cc1` tripped**
> Supervision broke while food was within Daniel's reach. That is one of the two critical controls, and it's the heart of how a choking risk becomes a choking incident. Eyes on, food managed — that's what keeps a meal safe, and it can't be traded off against good work anywhere else.

**Unsafe plate (CC2)  ·  ~22s  ·  trigger: `cc2` tripped**
> The plate that reached Daniel didn't meet his plan — it wasn't cut down to the texture he needs. That's the other critical control. Checking the food against the plan before he starts is the single most reliable way to stop an unsafe mouthful ever being possible.

**Medication clue missed  ·  ~26s  ·  trigger: `!medFlagged`**
> There was a clue in the records that wasn't connected. A new medication, started about three weeks ago, listing sedation and dry mouth. It began after Daniel's last eating and drinking assessment — so his plan, on its own, understated today's risk. Reading that medication change against the "drowsy lately" note is exactly the judgement that spots trouble before it happens.

**Medication clue caught (praise)  ·  ~22s  ·  trigger: `medFlagged`**
> One thing you did really well. You read the new medication against the "drowsy lately" note, and you flagged that Daniel needs a reassessment. That's prevention working days before any incident — seeing what the plan itself doesn't yet say. That's someone reading the whole picture.

**999 delayed (named unsafe)  ·  ~20s  ·  trigger: Path C and the 999 call was delayed**
> One thing to carry forward. The call to 999 was left until you had a free moment. Daniel came through — but in a full obstruction, the call for help cannot wait. Getting emergency help on its way is part of the first response, not something to fit in afterwards.

### 3c. Cross-track reveal — record once; plays every run, last  ·  ~32s
> Last thing — and it's the important one. The pressures you were working against tonight were set long before teatime. A colleague off sick with no cover. A medication change that never reached Daniel's plan. A reassessment nobody booked.
>
> None of those were decided on the dining-room floor. They were shaped upstream — by the manager, and by the organisation. This is the shift your paperwork produced. In the full programme, you'd take the manager and director shifts that built this one.

---

## 4. OPTIONAL — escalation replies (short reaction clips)
*Only if you want the "who to call" learning reinforced in the moment. Keep to a few seconds each; these are cutaways, not scenes.*

**Shift leader answers (N4 escalate)  ·  ~6s**
> On my way down — keep Daniel safe, I'm thirty seconds behind you.

**999 call handler (N6, correct response)  ·  ~8s**
> Ambulance is on its way. Stay with him, keep following the choking first-aid guidance, and tell me the moment anything changes.

---

## Clip count summary
| Group | Clips |
|---|---|
| Welcome | 1 |
| Handover | 1 |
| Debrief opening (A/B/C/D) | 4 |
| Debrief causes (CC1, CC2, med-missed, med-caught, 999-delayed) | 5 |
| Cross-track reveal | 1 |
| **Core total** | **12** |
| Optional escalation replies | +2 |

Ten of these cover **all ~60 debrief combinations**; a learner only ever sees the opening + their triggered causes + the reveal.

## Clinical note
All emergency wording is held at "recognise the emergency, call 999, follow choking first-aid guidance" — no physical technique is taught or shown, per Emma (SME). Any change to the emergency or caveat wording is Emma's to confirm before recording.
