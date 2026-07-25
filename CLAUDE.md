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

- **Done:** NHS theme across the app; dashboard fully rebuilt (top HUD, care‑card guide,
  action bar, animated prevention trend); landing rebalanced (wide text column, square
  media, clean "How to play" cards); record photo slot wired; intro trimmed to 2 screens;
  em dashes removed; accessibility contrast fixes.
- **Not yet bespoke‑polished to NHS level:** `viewReveal`, `viewRiskChain`, `viewSummary`,
  `viewReport` currently **inherit** the palette/components but haven't been hand‑built to
  match the dashboard. Likely next job.
- **Photography:** records can take real images via `img:`. The user is sourcing assets.
  Suggested subjects (small banner accents, cohesive desaturated/blue‑overlay treatment):
  discharge → hospital exterior; previous provider → a different care home; SALT letter →
  clinical/swallowing assessment; family message → phone/message; staff/rota → team or
  rota board; medication → blister packs/pharmacy; breakfast → dining table; audit → files;
  staffing board → whiteboard; food from home → sandwich at reception; kitchen → plated
  texture‑modified meal. Use royalty‑free/stock only; never real identifiable
  patients/records.

## The user

Cares deeply about visual quality and gives direct, specific feedback. Prefers: action
over questions once a direction is set; honesty about trade‑offs; changes shown live on
Render. Has been frustrated by repeated near‑misses on "premium" — the NHS clinical
direction is the agreed anchor, so stay faithful to it and to the hard rules above.
