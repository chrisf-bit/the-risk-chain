# Frontline image shot list (S2 · S3 · S4)

**For:** sourcing / generating scene photography · **From:** Chris / Rapid Learn

Each scenario currently renders **placeholder banners** (blank tinted panels) at the
handover and each node. Dropping a real image in is one line per key in the scenario's
`sceneImg` map in `frontline.html` (same mechanism S1 uses: `handover`, `N1`, `N2`, …;
`N6` reuses `N5`). This list gives, per image, the subject, framing, a generation prompt,
and stock search terms.

## House treatment (apply to every image, for cohesion)
- **Ratio / size:** landscape, 16:9. Export **under 2000px on the long edge** (hard API limit
  for review; ~1600px is plenty). The scene shows as a banner above the moment card.
- **Grade:** natural but slightly desaturated, cool daylight, calm. A subtle teal/navy tint is
  fine and helps them sit under the UI; the app also applies its own overlay, so avoid heavy
  colour of your own.
- **People:** **no identifiable faces.** Use hands, over-the-shoulder, mid-distance or
  environmental framing. This is adult social care, dignity first.
- **Never real:** no real names, real care records, real medication labels, or real branding.
  Documents in shot must be blank or clearly mocked. Royalty-free stock or generated only.
- **Register:** ordinary, undramatic, warm domestic light. Nothing clinical-looking unless
  stated. No "stock-photo drama".

---

## S2 — New Arrival, Old Plan (Priya · her own supported-living flat)

| Key | Subject | Framing / notes |
|---|---|---|
| `handover` | The flat, homely | Tidy supported-living flat living/kitchen area, morning light, a meal covered on the counter. Establishes "her own home". |
| `N1` | Prompt card vs record | A small printed care-prompt card stuck by a kitchen cupboard, and a folded discharge-style letter on the counter. Both **blank / mocked**. |
| `N2` | The roast | A plated roast dinner (sliced meat, whole veg) on a kitchen counter. Regular texture, clearly not modified. |
| `N3` | The biscuit | A packet/plate of biscuits on a home dining table, a visitor's hand nearby. No faces. |
| `N4` | Her table, her choice | Over-the-shoulder at a home dining table, a hand reaching toward a plate. Warm, domestic. |
| `N5` | A glass of water | A glass of water and a partly-eaten plate at the table, quiet mid-meal. Used for the emerging-signs / emergency beat (kept understated). |

**Generation prompts**
- `handover`: "Interior of a tidy modern UK supported-living flat, small open-plan kitchen and living area, soft morning daylight through a window, a covered plate on the worktop, no people, calm and homely, slightly desaturated, 16:9."
- `N1`: "Close-up on a kitchen worktop: a small printed care note pinned to a cupboard and a folded blank medical discharge letter beside it, blank paper no readable text, soft daylight, shallow depth of field, 16:9."
- `N2`: "A plated traditional roast dinner with sliced meat and whole vegetables on a home kitchen counter, regular unmodified texture, natural light, no people, 16:9."
- `N3`: "A plate of biscuits on a home dining table with a visitor's hand reaching in, no faces, warm domestic light, 16:9."
- `N4`: "Over-the-shoulder view at a home dining table, an older adult's hand reaching toward a plate, no identifiable face, warm and dignified, slightly desaturated, 16:9."
- `N5`: "A glass of water and a half-eaten plate on a dining table, quiet and still, soft light, no people, 16:9."

**Stock search terms:** supported living flat interior · homely kitchen no people · roast dinner plate · biscuits on table hand · dining table over shoulder hand · glass of water half eaten meal.

---

## S3 — Preparation Under Pressure (Aaron · shared house, disrupted breakfast)

| Key | Subject | Framing / notes |
|---|---|---|
| `handover` | Disrupted shared house | Shared-house kitchen/lounge with signs of building work: a propped fire door, a toolbox or dust sheet, breakfast things moved to a lounge table. Busy, a bit chaotic. |
| `N1` | Agency colleague at the kettle | A support worker (from behind / hands) reaching for one of two thickener tins by a kettle. No face. |
| `N2` | Two thickener tins | Two tubs of thickening powder by a kettle, a scoop, a beaker of thickened drink mid-prep. **Blank / mocked** labels. This is the flow-test moment. |
| `N3` | The blender | A blender on a worktop with separate small bowls of pureed components beside it (the dignified version), or a single over-full jug (the trap). Prep in progress, no faces. |
| `N4` | Noisy lounge | A lounge set for breakfast with a TV on in the background and daylight from a propped door, distracting and unsettled. |
| `N5` | Breakfast bowl and spoon | A bowl of smooth pureed breakfast and a spoon at a lounge table, quiet. Emerging-signs / emergency beat. |

**Generation prompts**
- `handover`: "A shared supported-living house kitchen and lounge mid-renovation, a propped fire door, a dust sheet and toolbox to one side, breakfast things moved onto a lounge table, morning light, no people, slightly desaturated, 16:9."
- `N1`: "Close-up of a kitchen worktop with a kettle and two tubs of thickening powder, a support worker's hand reaching for the nearer tub, blank unbranded labels, no face, soft light, 16:9."
- `N2`: "Two tubs of food thickener beside a kettle with a measuring scoop and a clear beaker of thickened drink, blank labels no readable text, kitchen worktop, shallow depth of field, 16:9."
- `N3`: "A kitchen worktop with a blender and, beside it, three small bowls of separately pureed breakfast components, food preparation in progress, no people, natural light, 16:9."
- `N4`: "A supported-living lounge laid for breakfast with a television on in the background and daylight from a propped door, slightly cluttered and distracting, no people, 16:9."
- `N5`: "A bowl of smooth pureed breakfast and a spoon on a lounge side table, quiet and still, soft daylight, no people, 16:9."

**Stock search terms:** home renovation kitchen dust sheet · thickening powder tub scoop · blender pureed food bowls · lounge breakfast tv on · pureed meal bowl spoon.

---

## S4 — Happy Birthday (Marcus · busy restaurant, with family)

| Key | Subject | Framing / notes |
|---|---|---|
| `handover` | Before the meal | A warm, busy restaurant interior, a table laid for a family celebration with a small "happy birthday" touch (balloon/banner, generic). Inviting, a little noisy. |
| `N1` | The order | A restaurant table from above with menus open and a plate of fish and chips arriving. Hands only, no faces. |
| `N2` | Around the table | Mid-distance restaurant family table, celebratory, drinks and starters, warm light. No identifiable faces (backs of heads / soft focus). |
| `N3` | The phone call | A support worker stepping to a quiet corner of a restaurant, phone to ear, a care folder in hand. From behind, no face. This is the on-call moment. |
| `N4` | Cake and toast | A birthday cake being brought to a restaurant table and glasses raised for a toast, celebratory, warm. Hands and cake, no faces. |
| `N5` | Fizzy drink and plate | A glass of a fizzy drink and a half-eaten plate on a busy restaurant table, noise implied. Emerging-signs / emergency beat. |

**Generation prompts**
- `handover`: "Warm, busy restaurant interior in the evening, a table laid for a family birthday with a small generic banner or balloon, inviting and a little noisy, no identifiable people, slightly desaturated cinematic light, 16:9."
- `N1`: "Overhead view of a restaurant table with open menus and a plate of fish and chips being set down, only hands visible, warm light, 16:9."
- `N2`: "Mid-distance view of a family celebrating at a restaurant table, drinks and starters, backs of heads and soft focus so no faces are identifiable, warm evening light, 16:9."
- `N3`: "A support worker seen from behind stepping to a quiet corner of a restaurant, phone held to the ear, a care folder in the other hand, no face, warm bokeh background, 16:9."
- `N4`: "A birthday cake carried to a restaurant table with glasses raised for a toast, hands and cake in focus, no identifiable faces, celebratory warm light, 16:9."
- `N5`: "A tall glass of a fizzy drink and a half-eaten plate on a busy restaurant table, background softly blurred, no people in focus, 16:9."

**Stock search terms:** restaurant family celebration table · fish and chips overhead · birthday cake restaurant toast hands · person on phone restaurant from behind · fizzy drink restaurant table.

---

## Optional (nice-to-have, not blocking)
- **Record photos:** individual records can also take a small `img:` banner (icon fallback exists,
  so these are optional). Good candidates: S2 discharge letter, S3 thickener tins, S4 the menu.
- **Per-scenario welcome stills:** if a per-scenario landing image is wanted instead of the
  reusable welcome video, one hero still per person in the same treatment.

## Count
| Scenario | Scene images (banner + nodes) |
|---|---|
| S2 Priya | 6 |
| S3 Aaron | 6 |
| S4 Marcus | 6 |
| **Total** | **18** (record photos optional on top) |

Keep every export **under 2000px** so they can be reviewed in-thread; oversized images have
failed to load all along.
