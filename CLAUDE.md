# The Risk Chain — project context

Single‑file, browser‑based training **simulation** about preventing a choking incident in
adult social care. The player is the management team of *Meadow View Supported Living*
supporting a new resident, *Michael Turner*, across rounds — reading records, spending
limited time, choosing actions, and living with the consequences.

**It is a serious training product, pitched to feel like a premium (~£50k) simulation.**

---

## Setup & workflow

- **Everything lives in `index.html`** — one file. CSS in a `<style>` block near the top,
  all logic in one `<script>` at the bottom. No build step, no dependencies.
- **Deploy = git push.** Repo `chrisf-bit/the-risk-chain`, branch `main` auto‑deploys to
  **Render**. Flow: edit `index.html` → commit → `git push` → user hard‑refreshes
  (Ctrl+Shift+R). There is no local dev server; the user reviews on the Render URL.
- **Before every push, syntax‑check the JS** (the file is huge; a typo breaks the app):
  ```
  awk '/<script>/{f=1;next}/<\/script>/{f=0}f' index.html > /tmp/rc.js && node -c /tmp/rc.js
  ```
- Windows machine; commit trailer: `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

---

## Architecture (all in `index.html`)

- `S` = state object (`initState()`), persisted to `localStorage` (`riskchain_v1`).
  Key fields: `screen`, `round`, `tab`, `kpi{}`, `prevention`, `prevHistory[]`,
  `opened{}`, `selected{}`, `committed{}`, `theme`.
- `render()` — routes on `S.screen`, sets `innerHTML = topbar() + view + footer()`.
  Re‑renders fully on every interaction (tab switch, select, etc.).
- **Screens (view functions):** `viewLanding`, `viewIntro` (meet Michael), `viewBridge`
  (between rounds), `viewDashboard` (main gameplay), `viewReveal` (consequences),
  `viewRiskChain`, `viewSummary`, `viewReport`. (`viewBriefing` exists but is now
  bypassed — intro flow is **2 screens**: landing → meet Michael → game.)
- **Dashboard building blocks:** `hudStrip(round)` (top HUD), `guideBlocks()`+`care()`
  (left guide care‑cards), `srcCard(doc)` (record cards), `actCard(a)` (decision cards),
  `sparkPath()` (trend‑chart geometry), `kpiRow()`, `zoneClass()`.
- **Content:** the `DATA` object holds each round's `title`, `brief`, `status`, `alerts[]`,
  `docs[]` (records), `actions[]` (decisions). `KPIS`, `START_KPI`, `START_PREVENTION`.
- Records support an **optional `img:'url'`** field → renders a photo banner with a
  cohesive blue overlay; no image falls back to an icon tile. (See photo shortlist below.)
- CSS is layered historically (v5 → v6 → **v7 NHS**). The **v7 NHS block near the end of
  `<style>` is the source of truth** and overrides earlier layers. When changing styles,
  edit/extend the v7 block rather than the old ones.

---

## Design system — v7 "NHS clinical" (current)

Direction agreed with the user: **minimal + clinical, NHS colour palette.** Light is the
default; a clinical dark variant is on the theme toggle.

- **Palette tokens** (`:root`, plus `@media dark` / `[data-theme]`):
  - NHS Blue `--teal:#005eb8` (primary/links/active), deep `--teal-deep:#00437f`.
  - NHS Green **buttons** `#007f3b` with a `0 3px 0 #00602c` drop.
  - Semantic meters: `--g-green:#009639`, `--g-amber:#ffb81c`, `--g-red:#d5281b`.
  - Ink `#212b32`, greys, `--line:#d8dde0`, surfaces white/`#f4f7f8`/`#eef1f3`.
  - Font: **Arial** stack (NHS fallback face). Radii small/clinical (`--r:8px`).
- **Dashboard layout:** top **HUD strip** (full width) that **leads with an animated
  Prevention‑capability trend chart** + Time + performance‑indicator bars; below, a
  2‑column body = **Guide rail (left)** + **Work area (centre)**; a **bottom action bar**
  with the green *Review & submit* button.
- **App chrome is navy (as of 2026‑07):** the HUD strip is a **full‑size navy instrument
  panel** (`--navy`→`--navy-2` gradient, light text; `--teal` re‑scoped to `#6cc6ff`
  inside `.hudstrip` so accents stay legible). **Do not shrink the HUD.** The **guide rail
  is a deeper navy** (`#022354`→`#001d45`) so it reads as recessed chrome with white care
  cards floating on it. Topbar is also navy — the three navy bands are intentional.
- **The dashboard must fit ONE screen — no scrolling anywhere** (firm user rule). Achieve
  by limiting card count, NOT by shrinking the HUD. Round 1 was trimmed to **9 decisions**
  (a clean 3×3). Watch decision/record counts in new rounds against this.
- **Guide = NHS "care cards"** — coloured header strip (blue = task / good‑to‑know,
  red header = alert) + white body. They draw the eye and are clearly separate from work.
- **Records** = clean white cards, optional photo banner, icon fallback; reviewed = pale
  green card. **Decisions** = clean cards, category‑coloured icon, **pale‑blue selected
  state**, checkbox. Tabs = underline style connected to content.

Reference mockups built during design (claude.ai artifacts): NHS direction is the accepted one.

---

## HARD DESIGN RULES — do not break these (repeatedly, firmly given)

1. **NEVER use em dashes (—) in any user‑facing copy. Ever.** (En dash in number ranges
   like "15–20" is acceptable.) Use full stops / restructure instead.
2. **No "handles":** never add left‑edge accent bars or top accent strips on cards/panels.
   Differentiate by fill colour, elevation, and hue only.
3. **No visible scrollbars** anywhere (hidden globally; wheel/trackpad still scroll).
4. **Selection = a colour change (fill), never a thin outline.**
5. **Icons: consistent size within a tier, and generously sized** (content tiles ~46px
   tile / ~25px glyph). Don't make them small/apologetic.
6. **Don't lead the player.** No reliability labels on record cards ("Outdated" etc.) and
   no "acting on assumption" tags on decisions — the player must judge for themselves.
7. **Contrast / accessibility (WCAG AA).** Light text on dark, dark text on light. White
   on bright cyan/teal fails — use `--teal-deep` for white‑text fills. Don't put dark text
   on saturated fills (looks messy); prefer light text on deep fills.
8. **Premium = restraint.** Avoid gimmicks (no "clip‑art" gradient covers, no rainbow
   segmented meters, no cheap colour fades). Clean type, space, one confident accent.
9. **Intuitive over text.** Lead with visuals/hierarchy; keep copy short and scannable —
   the user should not have to read paragraphs to know what to do.
10. Make good use of screen real estate; keep the layout balanced and deliberate.

Watch out for **old CSS layers overriding new rules** (e.g. a stale `.src.opened h4{color:#fff}`
once made reviewed cards unreadable; a `.prose{max-width:66ch}` once capped the hero column).
When something looks wrong, grep for competing rules on the same selector.

---

## Current state & possible next steps

- **Done (earlier):** NHS theme across the app; dashboard rebuilt (top HUD, care‑card
  guide, action bar, animated prevention trend); landing rebalanced; record photo slot
  wired; intro trimmed to 2 screens; em dashes removed; accessibility contrast fixes.
- **Done (2026‑07 session):**
  - **Dashboard chrome → navy:** HUD strip is a full‑size navy instrument panel; guide
    rail a deeper navy (see design‑system section). Single‑screen, no‑scroll rule enforced.
  - **Round 1 trimmed 12→9 decisions** (removed `hospital`, `experienced`, `genericflag`;
    also removed from `INFORMED_BY`). Scoring uses OR‑conditions/optional bonuses, so this
    was dependency‑safe and did not change difficulty.
  - **Decision cards:** time‑cost moved into a left column UNDER the icon tile as a uniform
    clock + 3 pips widget (`timeCost()`, 0 = empty pips, never prose); tiles top‑aligned to
    the title (`.act{align-items:flex-start}`, `.a-left{margin-top:16px}`).
  - **Records:** modal rebuilt to read like a document (emblem + "Record on file" kicker +
    source provenance); **dropped the reliability/credibility chip** (led the player, rule
    6). Card teasers trimmed to short orienting lines (topic only; finding lives in the
    record). Fixed reviewed/selected‑card text being unreadable in light theme (dead v6
    rule forcing near‑white text on the v7 pale‑tint selected state). Fixed the
    "Review record" pill (leaked border + zero padding → now a padded teal‑tint pill).
  - **Guide‑card bodies** now share the task/info card typography (`.care-b` base type).
  - **Situation tab:** removed the unlabelled alert‑count badge.
  - **Confirm modal ("Before you commit") = neutral summary** (stats + chosen list +
    confidence chooser). The "acting on assumption / decisions without the evidence" and
    "reviewed X of Y" nudges were **moved to the round reveal** (`viewReveal` `.blind-box`)
    as post‑commit feedback, not pre‑commit leading (rule 6). Fixed a flex‑gap bug that put
    rogue spaces around bold words in the reveal confidence note (`.conf-note`).
  - **`viewReveal` partly hand‑built:** header is now a 2‑col grid (text left, **Prevention
    dial in the header's right side**, blended into the navy, enlarged to 110px with solid
    white number and no arc glow — `viewBox` added to the ring svg so it scales). KPI card +
    Continue button sit in the right column below.
- **Not yet bespoke‑polished to NHS level:** `viewReveal` is partway there (header done, the
  KPI/performance card is still a single tall column — could go 3×3 to balance);
  `viewRiskChain`, `viewSummary`, `viewReport` still just **inherit** components. Likely
  next job. Full design‑rule detail is also in the user's auto‑memory `risk-chain-design-rules`.
- **Photography:** records can take real images via `img:`. The user is sourcing assets.
  Suggested subjects (small banner accents, cohesive desaturated/blue‑overlay treatment):
  discharge → hospital exterior; previous provider → a different care home; SALT letter →
  clinical/swallowing assessment; family message → phone/message; staff/rota → team or
  rota board; medication → blister packs/pharmacy; breakfast → dining table; audit → files;
  staffing board → whiteboard; food from home → sandwich at reception; kitchen → plated
  texture‑modified meal. Use royalty‑free/stock only; never real identifiable
  patients/records.

## Frontline sim (`frontline.html`) — separate sim, same repo

`frontline.html` is a SECOND, standalone sim: the **four‑scenario Prevention‑of‑Choking
frontline track** (first‑person support worker), deployed from the same repo/Render at
`<render-url>/frontline.html`. Independent of The Risk Chain — do **not** couple them.
Single file, no build step. Before **every** push verify brace/paren/bracket balance **and**
`node -c` the extracted script (the file is huge; a typo breaks the app):
`node -e "const s=require('fs').readFileSync('frontline.html','utf8');for(const[c,o,cl]of[['{}','{','}'],['()','(',')'],['[]','[',']']]){const a=s.split(o).length-1,b=s.split(cl).length-1;console.log(c,a===b?'ok':'MISMATCH')}"`
then `awk '/^<script>/{f=1;next}/^<\/script>/{f=0}f' frontline.html > /tmp/fl.js && node -c /tmp/fl.js`.
There is also a static mobile *mockup* `frontline-mobile.html` (one screen, design ref only).

### Four‑scenario architecture (multi‑scenario engine) — built 2026‑08
The sim is now a **scenario‑select picker → per‑scenario shift**. Four scenarios, **gated** so
each unlocks when the previous is completed. Each has its own **deep signature interaction**:
- **S1 The Teatime Shift** — Daniel · Larkfield House · L6/L0 · supervision. (Original F1; its
  data + logic remain the **bespoke path**.)
- **S2 New Arrival, Old Plan** — Priya · own flat · L5/L2 · documentation conflict. Signature:
  **reconcile widget** (`type:'reconcile'`, closing node `NR`).
- **S3 Preparation Under Pressure** — Aaron · shared house · L3/L2 · texture accuracy. Signature:
  **flow/spoon‑tilt test** (`type:'flowtest'`, node `N2`).
- **S4 Happy Birthday** — Marcus · restaurant · L5/L2 · best‑interests. Signature:
  **manager‑then‑on‑call exchange** (`type:'oncall'`, node `N3`).

**How it's wired (all in `frontline.html`):**
- `SCENARIOS` registry = per‑scenario **meta** + a **`build`** bundle; active scenario is `SC`.
  `setScenario()` and the **boot rebind (at the END of the script, after all build bundles are
  defined — do not move it earlier)** call `bindScenarioData()`, which points the engine globals
  (`NODES/DOCS/DOC_ORDER/FLOW/SCENE_IMG/RECOVERY_STEPS/WORKER_STEPS/ORG_STEPS/ORG_STEP_FATAL`)
  at `SC.build`.
- **S1 logic is byte‑unchanged**, guarded by `if(S.scenario!=='S1')` early‑returns into a
  **generic layer**: `applyEffectsGeneric`, `superstripGeneric`, `scoreProfileGeneric`,
  `viewOutcomeGeneric`, `debriefShell`, generic readiness/toolkit/events, `SC.build.crossTrack`.
  Generic logic is driven by **node/option metadata**: `opt.kind` (defensible/risky/failing),
  `opt.cc` (CC1/CC2), `opt.primes/dignity/escalation/events`; node `recog/emergency/recogText/cue/type`.
- Each built scenario's `SC.build` supplies: `nodes, docs, docOrder, base` (flow),
  `recogNode, emergencyNode, closingNode?, recordsLabel, sceneImg, intro{video,vtt},
  handover{eyebrow,text,q,cta,videoD,vttD,videoM?,vttM?}, meters(), domains, ccHold,
  outcomes{A..D}, reveal(), crossTrack(), toolkitBase/Fail`. **Adding a widget** = a `node.type`
  branch in `momentCard`, a `*Body()` render fn, dispatcher cases, a `scoreForNode` special‑case,
  config on `SC.build`, and state fields in `initState`.
- **Gated progression:** completion persisted **separately** from run‑state (`frontline_progress_v1`,
  marked at `resolve()`); unlock chain in `SCEN_ORDER`/`isUnlocked()`; picker states Locked /
  Ready / Completed. Run‑state localStorage key is `frontline_v2`.
- **Picker** (`viewPicker`): white intro panel over a deeper `.pick-screen` backdrop, light
  cards, **scenario ICON badges** (`badgeIcon`, not "S1/S2" text), and a **dynamic
  `document.title`** per stage.

### Brand & design system (FINALISED this session — client‑approved hex)
Locked to the official PracticE Ready brand palette in both themes (`:root` light default,
`@media dark`, `[data-theme]`). Values live on the token lines; edit those, not components.
- **Navy `#072A6B`** (`--ink` main text, `--navy` header chrome), **Dark Navy `#0B1F5D`**.
- **Teal `#16AFC2`** (`--teal`, records / primary accent), **Cyan `#21B8D9`** (`--z-monitor`).
- **Orange `#FF7A1A`** (`--go`) = **CTAs ONLY** (firm user rule — not for decoration).
- **Purple `#8A3CCB`** (`--violet`, tools zone), **Magenta `#D94A8A`** (accent).
- **Amber `#D99A2B`** (warn — kept a darker variant for WCAG), grey lines `#C9CDD4`.
  Green/red are semantic status only (the brand has neither).
- **Font: Source Sans 3, self‑hosted inline** (base64 `@font-face`, offline/SCORM‑safe),
  aliased to `--sans/--serif/--scene/--mono`. It is the free substitute for
  Frutiger/Helvetica/Clearview (proprietary — only render if licensed `.woff2` are embedded).
- **9‑step type scale** `--t-hero…--t-nano`. `--sheen` = white top‑highlight token used for gloss.

**Zone system** — each function tinted from the palette so panels read distinctly: metrics
(neutral white‑glass tiles), **records = teal** (`.sec-records`), **tools = violet**
(`.sec-tools`), **actions = orange** (currently the `.opt` accent — see OPEN DECISIONS).
Landing fact‑tile icons are solid glossy chips (magenta / dark‑teal `#0f8a9e` / purple,
white glyphs; teal had to be darkened so the white shows).

**Look:** glassy cards everywhere (gradient surface‑2→surface + `--sheen` inset + soft
shadow + `#C9CDD4` borders), rounded `--r-lg:18px`. **Floating header** constrained to the
1200px content column. **Gauges are soft circular rings** now (`meter()` draws ring + centre
number + label). Records rail is **de‑nested**: a plain "Records & tools" title over two
tinted panels of outlined **pill** items (`.doc-row`). Landing = **hero of two tiles** (copy
tile + inline **intro‑video** tile, 16:9) over three fact tiles, then a **full‑width CTA card**
(`.land-cta` — "When you're ready, click **Begin your shift**" + the orange button) as the
final element after all content. Hero grid `1.05fr 1fr`; copy‑tile vertical padding trimmed
(22px) so it sits roughly level with the video. Dark theme = deep‑navy depth (dark ground,
elevated glassy panels, teal‑tinted records rail). Subtle entrance/hover animations
throughout, all gated by `prefers-reduced-motion`.

### Content / flow (validated with SME "Emma")
- **Four outcome paths:** A prevention · B near‑miss recovered · C emergency **survived** ·
  D emergency **fatal**. The full emergency path (incl. worst‑case fatal) is BUILT, gated
  behind a *credible three‑failure chain* (a critical control fails → N5 not recognised →
  N6 not run); A always reachable, never forced. New node **N6** (emergency response) drives
  C vs D. Post‑incident steps split worker‑owned vs manager/org‑led. Emergency wording held
  at "recognise → call 999 → follow choking first‑aid guidance" (no technique taught). Emma
  owns the clinical wording; full sourcing in `docs/F1-emergency-path-for-validation.md`.
- **Talking‑head videos** (captions inlined as data‑URI `<track>`; base64 constants live near
  `isMobileView()`). Now **per‑scenario assets, all recorded and wired**:
  - **Intro** plays inline in the landing hero's right tile (`setupIntroVideo`), read from
    `SC.build.intro{video,vtt}`. Files: `intro.mp4`/`INTRO_VTT` (S1); `intro-s2/s3/s4.mp4` +
    `INTRO_S2/S3/S4_VTT`. **Each scenario has its OWN intro** (client preference — it tees the
    shift up). No lightbox, no acknowledge gate.
  - **Handover** read from `SC.build.handover{videoD,vttD,videoM?,vttM?}` (device‑specific via
    `isMobileView()`; falls back to `videoD` when there's no mobile cut). Files: `handover.mp4`
    + `handover-mobile.mp4` (S1, both current — **the old mobile‑gap is CLOSED**);
    `handover-s2/s3/s4.mp4` + `HANDOVER_S2/S3/S4_VTT` (layout‑neutral, so they serve both cuts).
  - **Debrief = ONE self‑contained clip PER OUTCOME** (A/B/C/D), read from
    `SC.build.debrief[outcome]` by `debriefMedia()`/`setupDebriefVideo()`; a single video slot,
    so **no stitching** (this was the deliberate fix for Synthesia's mid‑blink end‑frames). Files
    `debrief-s<1-4>-<a/b/c/d>.mp4` + `DEBRIEF_S<1-4>_<A-D>_VTT`. Falls back to the placeholder if
    a clip is missing. **ALL 16 debrief clips (+ 4 intros + 4 handovers + S1 mobile) are now
    recorded, wired and verified — the video set is COMPLETE.**
  - SME‑owned caveat `SIM_CAVEAT` shows at the **end of the debrief** (`caveatBox()`).
- **AVATAR SCRIPTS ARE SYNTHESIA‑MODERATED — HARD CONSTRAINT.** Synthesia rejects avatar‑*spoken*
  personalised medical advice, diagnoses, treatment/first‑aid instructions, and condition‑specific
  claims (it rejected the first S3 handover cut). **Rule:** the avatar speaks only the human /
  scenario framing; **ALL clinical specifics** (IDDSI levels, named events like a seizure,
  capacity / best‑interests wording, emergency & first‑aid steps) live in **on‑screen text**
  (landing `lead`, fact tiles, records, debrief components), never in the spoken script. S2–S4
  scripts in `docs/F2-F4-video-scripts.md` are the Synthesia‑safe versions (§0 per‑scenario
  intros, §1‑3 handovers, §4 debrief = one clip per outcome); S1 scripts in `docs/F1-video-scripts.md`.
  A **Custom Avatar / enterprise plan** gets broader medical latitude if the topic keeps flagging.
  - **Lesson learned (debrief C, "emergency survived"):** the emergency‑response wording bounced.
    The **"[person] came through it, but only just" survival phrasing was the trigger.** The fix
    that reliably passes: mirror the proven S1 C wording verbatim — "a close call, and the worst
    was avoided … the safe controls had already gone … the screen shows the chain." D ("did not
    survive") passes (different, non‑medical filter). When drafting any new avatar copy, **match
    the wording of a clip that already passed** rather than inventing near‑equivalents.
- **Shift countdown:** the HUD clock is a live **15:00 countdown** ("Time left"), started when
  the handover screen first loads (`startShiftClock()`), runs across the nodes, clamps at
  `00:00`; non‑persisted so a reload restarts it; reset on Restart/begin. Replaced the old
  wall‑clock time in `superstrip()`.
- **Fullscreen** on first interaction + top‑bar toggle. **Mobile:** fluid ring gauges + a
  **[The moment]/[Records] tab** so records aren't buried below the scene. Synthesised UI
  **sound effects** (`AUDIO.sfx`, primed on first gesture; play *after* the context resumes).
- Scene photos: set per scenario via `SC.build.sceneImg = {Nx:{src,pos}, …}`; a missing key
  falls back to a blank placeholder banner (`svgBanner` returns null art for non‑S1). Handover
  and landing DON'T need scene images (their video fills that slot). **N6 (emergency) reuses
  the N5 image; S2's reconcile node NR reuses the N1 (documents) image.** `pos` is the
  `object-position` (banner crops top/bottom). Shot list + prompts + stock terms:
  `docs/frontline-image-shotlist.md`.
- **Scene-image STATUS (2026‑08):** **S2 = complete** (`scene-s2-n1..n5.jpg`). **S3 = 4/5**
  (`scene-s3-n1..n4.jpg` in; **N5 pending** — the emerging‑signs pureed‑bowl shot). **S4 =
  none yet** (needs N1–N5). User hit their Copilot image limit; next images may come from any
  source (AI or free stock — Unsplash/Pexels). S1 keeps its original `scene-*.jpg`.
- **Image intake workflow (do this for every new scene image):** Copilot stamps a "Made with
  AI" badge in the top‑right — crop it off. `identify`/ImageMagick are NOT installed and the
  `convert` on PATH is the **Windows disk utility, do NOT run it**. Use **PowerShell +
  System.Drawing** to crop the top ~100px and re‑encode as JPEG q85 (see the scratchpad
  scripts this session, or reproduce: load `Image.FromFile`, `DrawImage` a `cropTop=100`
  source rect onto a `Bitmap`, save with the JPEG encoder). Name `scene-s<n>-n<k>.jpg`, keep
  **under 2000px** (~1536×924 is what came through), then add to that scenario's `sceneImg`.
- Options key on `id` not array position (`m={a:100,b:55,c:15}`), so reordering is display‑only.

### Brand marks, logo & mobile tweaks
- **Header chip + favicon** are the SAME file: `assets/frontline/brand-icon.png` (the PR
  app‑icon, a self‑contained rounded square; produced by chroma‑keying the green background
  out of the source `PR-icon-transparent.png` + de‑spill, cropped, ~128px). Class
  `.brand-mark` (38px; 32px mobile; 9px radius; `object-fit:contain`; sits directly on the
  navy header, no white plate). Shown on every screen incl. the landing. To swap both,
  overwrite that one file. Favicons cache hard — reopen the tab to see a new one.
- **Landing wordmark** = `brand-logo.png` (light) / `brand-logo-dark.png` (white wordmark for
  dark backgrounds), shown via `.land-logo.ll-light` / `.ll-dark`.
- The word **"PracticE Ready" renders its E in brand teal `#16afc2`** wherever it appears.
- **Mobile (`@media max-width:900px`):** header keeps the brand on one line (nowrap +
  ellipsis) and hides the subtitle; **video captions enlarged** via
  `.vplayer::cue{font-size:1.45em}`. If captions still read small, note that some browsers
  (esp. iOS Safari in native fullscreen) ignore native `::cue` styling and use the device's
  own caption size — the robust fix is a custom caption overlay synced to the VTT.
- The newer intro/handover VTTs ship with their own `STYLE ::cue{background-color:#383943A3}`
  block baked into the caption file (Colossyan export), so those captions carry a dark pill
  regardless of the app `::cue` rule.

### AGREED PLAN — implement next session (user approved)
1. **Orange CTA buttons → navy text.** Use **navy `#072A6B` text on the `#FF7A1A` orange**
   (keeps exact brand orange, passes WCAG ≈ 4.7:1). Applies to `.btn-go` everywhere
   (Begin / Go to the table / Carry on / See how it ends / acknowledge, etc.).
2. **Option buttons (`.opt`) → teal accent.** Switch icon `.ob`, hover border and selected
   fill/tint from orange (`--go`) to **teal**; reserve orange for CTAs only. Glyphs on a
   filled accent need an **on‑accent** colour (white in light theme, dark ink in dark) —
   the dark‑theme accents are light, so plain white‑on‑accent fails. Add a `--on-accent`
   token (light `#fff` / dark `#04252b`), or fill with `--teal-strong` and flip the glyph
   colour per theme.

### DONE — intro video relocation (2026‑08)
Intro is now **welcome‑only**, inline, with the SME disclaimer **at the end**:
- New welcome‑only **`intro.mp4`** (16:9) + captions (`INTRO_VTT`, inline base64) play
  **inline in the landing hero's right tile** (`.land-media.land-video`, a centred 16:9
  frame; `setupIntroVideo()` shows captions, preserves position across re‑renders, and
  attempts autoplay — native `controls` are the pause/play fallback if autoplay is blocked).
- The **"Before you begin" lightbox is gone**: `disclaimerModal()`, `setupDisclaimer()`,
  `disclaimerAcked()`/`ackDisclaimer()`, the `ack-disclaimer` action and the
  `teatime_disc_v6` localStorage key were all deleted. Landing "Begin your shift" is the
  only step forward.
- Verbatim `SIM_CAVEAT` renders at the **end of the debrief** via `caveatBox()`.
- `scene-handover.jpg` is no longer on the landing but is **still used** as the handover
  scene banner (`SCENE_IMG.handover`) — keep it. Dead `.disc-*` CSS remains in the
  `<style>` block (harmless; can be cleared later).

### OPEN THREADS
- **ALL ASSETS COMPLETE** (2026‑08): every scenario has its intro + handover + all 4 debrief
  clips (25 videos, compressed to ~38MB total via ffmpeg 720p CRF23) and all node scene images
  (S2–S4 `scene-s<n>-n<k>.jpg`). No placeholders remain.
- **Em dashes: DONE** — `frontline.html` is em‑dash‑free (`grep -c "—"` = 0). Keep it that way.
- **S2–S4 scoring nuance + debrief polish: DONE** — per‑scenario `SC.build.scoreAdjust(k)`
  rewards evidence use; debrief renders a per‑domain `note` (`.dom-note`) and per‑scenario
  signature‑interaction lines in "captured this run".
- Still open: full **WCAG 2.1 AA** close‑out (axe/Lighthouse + screen‑reader + modal
  focus‑trap). Done so far: captions, video pause, reduced‑motion, focus outline,
  Esc‑closes‑modal, ARIA labels, aria‑pressed tabs, contrast fixes. NOT certified yet.
- Still open: carry the ring/glass language into the **debrief** (domain bars → rings).
- Still open (commercial): **SCORM packaging** for LMS delivery — self‑contained SCORM 1.2,
  per‑scenario packages, baked‑in 12‑month licence expiry; SCORM wrapper (pipwerks) reporting
  completion at the debrief. See the licensing discussion.

### IMPORTANT working note
The user's screenshots have failed to load **all session** because they exceed **2000px**
(API image limit). Ask them to crop/resize under 2000px so you can actually see them —
otherwise you are iterating blind on their word alone.

## The user

Cares deeply about visual quality and gives direct, specific feedback. Prefers: action
over questions once a direction is set; honesty about trade‑offs; changes shown live on
Render. Has been frustrated by repeated near‑misses on "premium" — the NHS clinical
direction is the agreed anchor, so stay faithful to it and to the hard rules above.
