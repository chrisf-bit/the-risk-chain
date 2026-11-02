# Safeguarding image shot list (SG-F3 first; F1/F2/F4 to follow)

**For:** sourcing / generating scene photography · **From:** Chris / Rapid Learn
**Companion to:** the choking `frontline-image-shotlist.md`. **Same house treatment carries across.**

Each decision node renders a **placeholder banner** (a blank tinted panel) above the moment card.
Dropping a real image in is one line per key in the scenario's `sceneImg` map in `safeguarding.html`.
This list gives, per image, the subject, framing, a generation prompt and stock search terms.

## House treatment (apply to every image, for cohesion with the choking set)
- **Ratio / size:** landscape, 16:9. Export **under 2000px on the long edge** (hard API limit for
  in-thread review; ~1600px is plenty). The scene shows as a banner above the moment card.
- **Grade:** natural but slightly desaturated, cool daylight, calm. A subtle teal / navy tint helps
  them sit under the UI; the app applies its own overlay, so avoid heavy colour of your own.
- **People:** **no identifiable faces.** Hands, over-the-shoulder, mid-distance or environmental
  framing. Adult social care, dignity first.
- **Never real:** no real names, records, medication labels or branding. Documents in shot are blank
  or clearly mocked. Royalty-free stock or generated only.
- **Register:** ordinary, undramatic, warm domestic light. Nothing staged or "stock-photo drama".
- **Safeguarding-specific:** **the abuse is never depicted or implied in an image.** No menace, no
  distress as spectacle, no villain framing of any person. Scenes are of ordinary rooms and objects.
  The aftermath stills are cold and procedural (a room, a file, a letter), never a depiction of harm.

---

## SG-F3 - She Tells You at Ten Past Four (Nadia · Sandhill Road · late shift)

The ten decision nodes mostly share the same kitchen / downstairs setting (it is one continuous
afternoon in one house), so several keys can reuse a small set of calm, static scene banners rather
than needing ten distinct shots. Grouped below by what each node actually needs.

| Node | Key moment | Scene subject | Framing / notes |
|---|---|---|---|
| N1 | The first thirty seconds | The kitchen, late afternoon | A tidy shared-house kitchen in cool late-afternoon light, two mugs on the side, a chair pulled out. Calm, lived-in, no people. Establishes "she has just come down". |
| N2 | The promise | Same kitchen, closer | A closer, quieter detail of the same kitchen: a kitchen table corner, afternoon light low across it. Stillness. Reuse N1 grade. |
| N3 | Letting her speak | Same kitchen | Reuse N1 / N2. No new shot needed. |
| N4 | Crime and immediate risk | A phone on the side | A mobile phone face-down on a kitchen worktop, screen-light just visible, nobody holding it. The boyfriend's calls. Understated. |
| N5 | Evidence | The hallway / bathroom door | A plain supported-living hallway with a bathroom door ajar, towels on a rail, cool light. Ordinary, not clinical. No person. |
| N6 | Six o'clock | The front door and the bag | A packed overnight bag by a front door, late daylight through the glass, a set of car keys or a coat nearby. A car just visible outside, soft focus. No people. |
| N7 | Report | The office phone | A small staff office corner: a desk phone, a lever-arch file, a notepad, a landline handset off its cradle. The route that is not answering. No person. |
| N8 | Record | The record being written | A blank incident / record form and a pen on the desk, under a desk lamp, cool evening light. Blank or clearly mocked, no readable text. |
| N9 | The second thread | The phone again | Reuse N4 (the phone), or a second angle of it lighting up. The boyfriend as a separate thread. |
| N10 | Afterwards | The quiet house | The shared-house lounge after teatime, lamps on, calm and settled, no people. The other three, and the evening. |

**Minimum distinct shots to produce: 6** (N1 kitchen, N4 phone, N5 hallway, N6 door + bag, N7 office
phone, N8 record), with N2/N3 reusing the kitchen, N9 reusing the phone and N10 a lounge.

**Generation prompts**
- `N1` kitchen: "A tidy shared supported-living house kitchen in cool late-afternoon daylight, two
  mugs on the worktop, a chair pulled out from a small table, lived-in and calm, no people, slightly
  desaturated, 16:9."
- `N4` phone: "A mobile phone lying face down on a kitchen worktop with the screen glow just visible
  at the edges, nobody holding it, soft cool light, shallow depth of field, no people, 16:9."
- `N5` hallway: "A plain supported-living hallway with a bathroom door slightly ajar and towels on a
  rail, cool even daylight, ordinary and domestic not clinical, no people, 16:9."
- `N6` door and bag: "A packed overnight holdall sitting by a front door with late daylight through
  the glass panel and a car softly out of focus outside, a coat on a hook nearby, no people,
  slightly desaturated, 16:9."
- `N7` office phone: "A small care-home staff office corner with a desk telephone handset off its
  cradle, a lever-arch file and a notepad, cool evening light, no readable text, no people, 16:9."
- `N8` record: "A blank incident record form and a pen on a desk under a desk lamp in cool evening
  light, the paper blank with no readable text, shallow depth of field, no people, 16:9."
- `N10` lounge: "A shared supported-living lounge after a meal, table lamps on, cushions settled,
  calm and quiet, warm but slightly desaturated, no people, 16:9."

**Stock search terms:** shared house kitchen no people afternoon · phone face down worktop ·
supported living hallway bathroom door · overnight bag by front door daylight · care office desk
phone file · blank incident form pen desk lamp · supported living lounge lamps evening.

### Aftermath stills (cold, procedural; spec s5.2 "consequences, never depiction")
The forward-aftermath windows (72 hours / three months) want a small, deliberately cold still set.
**Never** a depiction of the abuse or of Nadia in distress.

| Window | Still subject | Prompt |
|---|---|---|
| 72 hours | The Monday morning | "An empty breakfast place setting at a care-home table, untouched, cold morning light through a window, no people, muted and quiet, 16:9." |
| Three months | The file / the letter | "A closed buff case file and a formal letter on a plain desk, cold even light, no readable text, procedural and impersonal, no people, 16:9." |

---

## To follow (as the scenarios are built)
- **SG-F1** (Tomas, Ashcombe House, morning personal care): a bathroom / personal-care moment handled
  with total dignity (hands, towels, no body), the daily-notes file, a body-map form (blank), the
  rota board, the wardrobe. Record photos optional.
- **SG-F2** (Yvonne, her own flat, domiciliary): near-empty cupboards, unopened post, a bank card on a
  side table, a visitor's coat by the door. Dignity-first, her home not a crime scene.
- **SG-F4** (Colin, Ashcombe House, late shift): a call bell out of reach on a windowsill, a chair
  against a bedroom door, a supper tray held back, a shared lounge at teatime. The ordinariness is the
  point; nothing dramatic.

## Count (SG-F3)
| Set | Images |
|---|---|
| Scene banners (6 distinct, rest reuse) | 6 |
| Aftermath stills | 2 |
| **SG-F3 total** | **8** |

Keep every export **under 2000px** so it can be reviewed in-thread.
