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

- **Two sims, two URLs (important):** the Render root `the-risk-chain.onrender.com` serves
  **The Risk Chain** (`index.html`, the management/rounds sim). The **Frontline** sim is a
  separate page at **`/frontline.html`**. Videos, the SME questions, the coach tour, etc. all
  live in Frontline, NOT in The Risk Chain (which has no video by design).
- **Done (2026-09 session):** **`viewReveal` reworked to fit one screen.** It used to render in
  normal-scroll mode while the dashboard ran in the viewport-locked `is-console` shell, so its
  content dropped off the bottom. Now the reveal joins `is-console` (render toggles it for
  `S.screen==='reveal'` too), with a compact header band (dial inline, long intro paragraph
  dropped), a 2-col body sized to the viewport, and the Continue button pinned in view (panels
  scroll internally with hidden scrollbars only if ever needed). The "How earlier rounds shaped
  this" reflection moved out of the reveal into the end **report** (`viewReport`) as a new
  "How earlier decisions shaped later rounds" section (recomputed from final flags). **All
  em-dashes removed** from `index.html` (40, all in CSS/JS comments, swapped to hyphens); both
  sims are now em-dash-free (`grep -c "—"` = 0). Same one-screen treatment could still be applied
  to `viewSummary` / `viewReport` if they overflow (not yet checked).
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
  handover{eyebrow,text,q,cta,videoD,vttD,videoM?,vttM?}, debrief{A..D:{video,vtt}}, meters(),
  domains[{k,nodes,note}], scoreAdjust(k), ccHold, outcomes{A..D}, reveal(), crossTrack(),
  toolkitBase/Fail`. **Adding a widget** = a `node.type` branch in `momentCard`, a `*Body()`
  render fn, dispatcher cases, a `scoreForNode` special‑case, config on `SC.build`, and state
  fields in `initState`.
- **Scoring / debrief (S2–S4 generic path):** `scoreProfileGeneric` averages `scoreForNode`
  (kind→100/55/15, or the widget score) over each domain's nodes, then applies the scenario's
  `SC.build.scoreAdjust(domainKey)` delta to reward evidence use (e.g. opening the governing
  record, plan‑to‑hand). Each domain carries a `note` rendered under its bar (`.dom-note`) in
  both the S1 and generic debriefs. `summariseEventsGeneric` surfaces the signature‑interaction
  result per scenario (reconcile, flow‑test, on‑call). Debrief video = one clip per outcome
  from `SC.build.debrief[outcome]` via `debriefMedia()` (single slot, no stitching).
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
- **Scene-image STATUS (2026‑08): ALL COMPLETE.** S2/S3/S4 each have `scene-s<n>-n1..n5.jpg`
  wired into `sceneImg` (N6 reuses N5; S2 NR reuses N1). S1 keeps its original `scene-*.jpg`.
- **Image intake workflow (for any future scene image):** Copilot stamps a "Made with AI"
  badge in the top‑right — crop it off. `identify`/ImageMagick are NOT installed and the
  `convert` on PATH is the **Windows disk utility, do NOT run it**. Use **PowerShell +
  System.Drawing** to crop the top ~100px and re‑encode as JPEG q85 (`Image.FromFile`,
  `DrawImage` a `cropTop=100` source rect onto a `Bitmap`, save with the JPEG encoder). Name
  `scene-s<n>-n<k>.jpg`, keep **under 2000px**, then add to that scenario's `sceneImg`.
- **Video intake workflow (compress every new clip):** `ffmpeg` is installed (winget
  `Gyan.FFmpeg`; if not on PATH use the WinGet `Packages\...\bin\ffmpeg.exe`). All 25 clips were
  re‑encoded 1080p→**720p H.264 CRF 23, AAC 128k, +faststart** (208MB→38MB, visually lossless
  at the ≤~600px player). Run any new avatar clip through the same before wiring:
  `ffmpeg -i in.mp4 -vf "scale=-2:720" -c:v libx264 -preset slow -crf 23 -c:a aac -b:a 128k -movflags +faststart -y out.mp4`.
  Captions stay inline base64 in the HTML (separate from the mp4).
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

### DONE (2026-09 session, SME "DT feedback" v0.1 + coach tour)
Implemented the SME content-additions doc (Donna Thompson feedback). All in `frontline.html`:
- **Section 3 (scoring / verdict):** green/amber/red redefined. Green (Ready) requires a safe
  outcome, no critical control tripped, correct answers, ALL records opened, and the scenario's
  key judgement done. Amber (Developing) now NAMES the specific gaps (helpers `commonGaps` /
  `s1Gaps` / `genericGaps` / `joinGaps`, plus per-scenario `SC.build.greenGaps`). Red = a
  critical control tripped or an unsafe outcome. **Client decision: a well-recovered near miss
  (outcome B) reads amber, not red** (a misjudgement happened, but the recovery is credited);
  C and D stay red, so "a missed control is never offset" still holds for emergencies.
  `readiness()` / `readinessGeneric()` rewritten to branch on outcome, then gaps.
- **Section 2 (Q1-Q10):**
  - **Recog-node calm-branch fix (Q9 Priya, Q10 Marcus):** the recog node (N5) takes optional
    `optionsCalm` / `qCalm`, served via `optsFor(node)` when NOT primed, so a safely-finished
    meal asks how to CLOSE it (record + escalate) instead of showing "call for help". S1-S4.
  - **S1:** new knowledge nodes `QF` (Q3 Level 0 fluids/thickener) and `QC` (Q1 proportionate
    cough); N5 reworded to Q2 (becomes an emergency). New nodes carry `knowledge:true` (guarded
    out of supervision/priming in `applyEffects`). `FLOW_S1` = N1,QF,N2,N3,N4,QC,N5. S1
    `scoreProfile` blends QF into person-centred and QC into response.
  - **Knowledge questions:** `QM` (Q5 over-modification, S2), `QL` (Q7 Level 3 description) +
    `QT` (Q8 spoon-tilt, S3), `QS` (Q6 Level 5 = 4mm, S4). Each wired into that scenario's
    `base` flow + a domain's `nodes[]` + a reused `sceneImg` key.
  - **Q4 paramedics select-all:** shared multi-select handover node `QP` (`PARAMEDIC_ITEMS`,
    `PARAMEDICS_NODE`, injected in `bindScenarioData`), pushed into `flow()` after the emergency
    node and reached ONLY when 999 was called (path C). `paramedicsBody` / `paraToggle` /
    `paraConfirm`; scored via `scoreForNode` into Response & learning; shown in "captured this run".
- **Section 4:** optional end-of-session **questionnaire + declaration** (`QUIZ`, `DECLARATION`,
  `endOfSessionCTA`, `viewQuestionnaire`, stage `questionnaire`, `quizSubmit`). Answers live ONLY
  in `S.quiz` / `S.quizFree` (localStorage `frontline_v2`) and reset per run; the manager flag is
  an on-screen message only. Currently launched from EVERY scenario's debrief.
- **Navigation "More below" scroll cue:** rule 3 hides scrollbars, so `.m-pad` (options) and
  `.evi-scroll` (records) could hide content below the fold. `wireScrollCues()` toggles a navy
  "More below" pill (`.scroll-cue`) only when a container can still scroll down; updates on
  render, scroll and resize. (This fixed the "learners miss answers" issue Donna flagged.)
- **How-to-play coach tour:** contextual by stage (`TOURS` keyed to picker/landing/handover/
  node/debrief), launched by a topbar **"How to play"** button (`data-act="how-to-play"`).
  First-time users get the gameplay tour auto-run once on the first `node` (localStorage
  `frontline_tour_v1`). Spotlight + anchored pop mounted on `<body>` (`#fl-tour-root`, survives
  re-renders); navy accents for contrast; steps auto-skip missing/hidden targets; re-positions
  on resize; click the dimmed area to skip. Ported from The Risk Chain's tour pattern.

### DONE (2026-09 session, SME "Emma" Source of Truth v0.2 gap-check)
Checked the live S2-S4 build against the SME-confirmed **Source of Truth v0.2** and Build Pack
v1.0. All four people's locked plans (IDDSI levels, settings, clues) and CC triggers already
matched. Emma then made three rulings, all now implemented in `frontline.html`:
- **Serving off-plan food/drink is a HARD FAIL in ALL four scenarios (SoT §4.1).** Reverses the
  "DT feedback" amber-near-miss call FOR THE SERVING CONTROL ONLY. New `servedUnsafe()` helper
  (serving control = S1 `cc2`, S2-S4 `cc1`); `resolve()` + `goesToEmergency()` route a serving
  trip straight to the emergency with no rescue, result is red (C/D), N6 still decides survived
  vs fatal. B (amber near miss) is now reachable ONLY via the remaining forced-recovery controls
  (supervision break S1 cc1; unverified handoff S2/S3 cc2; decision-without-authority S4 cc2),
  which stay soft. `servingFailLead()` renders a red debrief banner that OPENS with the serving
  decision ("the mistake that can kill, you never know which time"), wired into both the S1 and
  generic debriefs. Also fixed the S1 debrief badge to label all four outcomes via `outcomeMeta()`
  (it previously only knew A vs "near miss"). See auto-memory `frontline-serving-hardfail`.
- **Dropped Aaron's "Capacity and consent" domain (S3)** (SoT §2.3: no capacity reference for
  Aaron). The "choice within his plan" credit folded into Person-centred practice.
- **Full red-flags list, two groups** in ALL three red-flag docs (S1/S3/S4): immediate danger
  (can't breathe/speak/cough; blue/grey lips; silent choking) then eating/drinking signs, per
  SoT §5.1 verbatim. Added a `{h:'...'}` subheading item type to `docModal` (`.dl-h` style).
- **Scroll rule relaxed (client):** a screen MAY now scroll if it needs to ("can't control what
  devices users are using"). The no-visible-scrollbar rule still holds; this just lifts the strict
  one-screen constraint where content genuinely overflows.
- **Left for client (content voice):** Path B copy still says "an unsafe mouthful was taken",
  now only shown for the soft controls, not serving. Generalise if Emma wants. Emma owns updating
  the Source of Truth register itself.

### DONE (2026-09 session, flow-test UX + flicker + WCAG contrast pass)
Frontline polish while prepping for testing + sale. All in `frontline.html`:
- **S3 flow test reworked** (the spoon-tilt widget). Was: separate spoon + fluid drawings
  (fluid floated mid-panel), an empty `<span>`+`%`-height runoff that rendered blank, and a
  confusing "too thin/Level 2/too thick" rating on top of setting scoops. Now ONE inline SVG
  (`ftFlowSvg`) of a tilted spoon with the drink dripping off the lip (SVG `<animate>`, speed/
  splash by texture); the rating step is gone, it's read-tin-label -> add scoops -> tilt to
  test -> Serve or **Adjust the scoops** (`flowRedo`). Scoring keys on serving a true Level 2.
- **"undefined" fix:** recog nodes (N5) had no per-option `note`, so their consequence beat
  printed "undefined". Recog nodes now advance straight to the outcome (which narrates it);
  `consequenceBody` also guards a missing note. Harness updated (recog auto-advances).
- **Re-render flicker fixed (two causes):** (1) entrance animations replayed on every click,
  gated them behind a `no-enter` class keyed to the SCREEN (stage + nodeIdx, NOT sub, so
  decide->consequence and in-widget clicks don't re-animate; only a new node/stage does).
  (2) the scene photo: killed the ken-burns zoom (restarted each render) and set the `<img>`
  to `decoding="sync"` + preload per scenario, so it no longer blanks for a frame.
- **WCAG 2.1 AA contrast pass (light theme; dark already passed bar the CTA).** CTA `.btn-go`
  text `#fff`->navy `#072a6b` (fixed, both themes; white-on-orange was 2.6:1, now 5.2). Semantic
  text tokens darkened for 4.5 on white AND on their tints: `--good` `#1f9d57`->`#0c7038`,
  `--warn` `#bd6510`->`#9a5109`, `--bad` `#d84a42`->`#c0281f`. `--ink-3` `#6d7aa6`->`#5b6892`.
  Teal chip fill `--chip-bg` (light) `#16afc2`->teal-deep `#0b6b78` (white-on-teal was failing).
  Focus ring `var(--teal)`->`var(--teal-strong)`. Flow-test tin label off `--ink-4` onto `--ink-2`.
  **No brand hex changed** (teal/orange/violet/cyan/magenta untouched; `.pr-e` brand "E" left as
  the client-locked `#16afc2`, exempt as a logotype). Reusable check: `node test/contrast-check.js`
  (all audited pairs clear AA). NOT yet certified: browser-only items (axe/Lighthouse, 1.4.4
  resize, 1.4.10 reflow, 1.4.11 across every component, keyboard/focus order, screen reader).
- **Test harness added:** `node test/frontline-logic.js` drives the real state machine across all
  four scenarios (outcome path + readiness); 26/26. Use before any client sign-off.

### DONE (2026-09 session, dark-theme redesign + visual polish for review)
Client reviewed live and pushed hard on the dark theme + polish. All in `frontline.html`:
- **Dark theme redesigned to a near-black, flat, bold-accent look** (client reference: the "Under
  Pressure"/JAM PAN sim). Grounds/surfaces dropped to near-black (`--surface:#0f111a`), panels flat
  with thin borders, brand accents kept but brightened. Fixed a real bug: the `[data-theme="dark"]`
  (toggle) block was MISSING the `--zn-*`/`--violet`/`--sheen` line the system-dark block had, so
  those fell back to LIGHT values on a dark page (bright panels, washed sheen). Restored. A theme
  preview was built as a claude.ai artifact and client-approved before porting.
- **Primary button (`.btn-go`) is now bold TEAL + white** (gradient `#0d8091`->`#0a6675`, white text,
  teal glow), replacing the orange/navy CTA the client disliked. This BREAKS the old "orange = CTA"
  brand rule with client sign-off; orange is now a reserved highlight only. **Teal-led accent
  hierarchy** agreed: teal primary; cyan/magenta/violet supporting; orange reserved; green/amber/red
  status only. Option cards (`.opt`) moved off orange onto teal (icon chip fills `#0d8091`).
- **De-muddied the serving banner** (`.db-lead-fail`): flat `--surface` panel with a red border +
  red icon/kicker instead of the maroon fill.
- **Human-readable event labels** in the debrief "Captured this run" (DOC_OPENED -> "Records opened",
  FLOWTEST_DONE -> "Flow test", etc.); internal `log()` keys unchanged.
- **Type scale bumped** (body 16.5, sm 15.5, cap 14.5, eyebrow 13, nano 12.5) after "fonts too small".
- Contrast re-verified after every change (both themes still clear AA; the navy cross-track/readiness
  panel's coral/gold/amber/green text all 6-10:1).
- **`UNLOCK_ALL=true`** test switch (in `isUnlocked`) keeps all four scenarios selectable for review;
  flip to `false` to restore gated progression before launch.

**Blind-iteration caveat:** the assistant has NO eyes on the rendered app; all visual fixes this
session were driven by user screenshots. Screens NOT yet seen in the new theme: picker, landing,
handover, decision/moment screens, reconcile (S2) + on-call (S4) widgets, emergency/outcome screens,
mobile. Recommend a full click-through of all 4 scenarios in BOTH themes before sending to reviewers.

**Custom domain (in progress):** serving from `rapid-learn.co.uk` via a **subdomain CNAME on GoDaddy**
(e.g. `practiceready.rapid-learn.co.uk`) pointing at the Render target, then Verify in Render (auto
HTTPS). Root domain left alone (company site + email). Frontline is at `/frontline.html` unless we
make it the landing page. NOT for sale yet: needs WCAG 2.1 AA cert (axe/Lighthouse + manual), mobile
pass, SCORM packaging, final SME (Emma) content sign-off.

**NEXT (pending, user leaning yes):** move the end-of-session quiz to run ONCE after all four
scenarios are complete (not per-scenario). Small change (~20-40 lines): gate `endOfSessionCTA()`
on `SCEN_ORDER.every(id=>PROG[id])`, persist quiz completion in the durable `PROG` (not run-state,
so a closed tab mid-quiz is not lost), and add a picker entry point once all four read "Completed".
Decision still needed: once-at-end (recommended) + primary entry point (picker banner / final
debrief / both). Also: **SCORM must report the questionnaire results** (each answer + free-text +
`flagged` boolean + completion/declaration) to the LMS. See auto-memory
`frontline-scorm-questionnaire-reporting`.

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
