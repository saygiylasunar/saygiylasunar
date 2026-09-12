# Portfolio V5 — Header + Hero Directions

These directions use the **same information** on purpose. The goal is to compare composition and character rather than copywriting tricks.

None of them is the final design. Do not merge their strongest gimmicks into one direction before testing them separately.

---

## Shared content for all three prototypes

### Identity

**Ersen Filiz**

**Saygıyla Sunar** is the author mark / publishing identity, not an agency name.

### Working orientation

The hero should communicate, in plain language, that the work spans:

- software / systems,
- interface and visual design,
- security / operations,
- music and authored experiments.

Do not force all four nouns into a single slogan if the result sounds like a LinkedIn headline.

### Current state candidates

The prototype may use a compact live/current surface with examples such as:

- Portfolio V5
- EFSS PDE
- security / field training thread
- music / visual experiments

The final implementation should source this from one maintainable content object rather than hard-coding “current” text across components.

### Core actions

Keep actions limited. Likely priorities:

1. Work / Archive
2. Contact

A third contextual action is allowed only if it has real value.

### Header constants

Preserve for all directions:

- `S/`
- Ersen Filiz
- Saygıyla Sunar
- main navigation
- language control
- theme control

Do not redesign the header structure merely to make the three directions look more different.

---

# Direction A — Editorial Instrument

## Character

A severe authored page that treats typography and information like an editorial instrument.

The page should feel closer to a technical publication, independent magazine or annotated research sheet than a product landing page.

## Composition

Desktop hypothesis:

```text
┌─────────────────────────────────────────────────────────────────────┐
│ S/  ERSEN FILIZ / SAYGIYLA SUNAR          WORK ...        TR   ◐   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  01 / AUTHOR                                                        │
│                                                                     │
│  ERSEN                                                              │
│  FILIZ                                         EF / CURRENT          │
│                                                ─────────────         │
│  Software, systems and visual work            PORTFOLIO V5          │
│  with an occasional strange object.           EFSS PDE              │
│                                                2026 / ACTIVE         │
│                                                                     │
│  [ WORK / ARCHIVE → ]   CONTACT                                    │
│                                                                     │
│                                                        S/ 2026      │
└─────────────────────────────────────────────────────────────────────┘
```

The left side carries identity with unusual scale.
The right side is not a “card”; it is a ruled information region aligned into the page grid.

## Visual devices

- strong large type,
- thin rules,
- one oversized index or section number,
- minimal radius,
- warm neutral background,
- one controlled accent,
- metadata in a compact technical voice.

## Motion

Very restrained.

Possible sequence:

1. grid/rule establishes,
2. identity resolves,
3. current marker moves into its active position.

No cascade of five separate fade-ups.

## Best quality

Strong authorship without needing illustration or decorative graphics.

## Failure mode

Can become a fashionable editorial/designer portfolio if the metadata is fake or the typography performs harder than the actual content.

## Test question

Does it look like Ersen publishes work here, or like a designer made a magazine-themed portfolio?

---

# Direction B — Working Console

## Character

The site is visibly alive and maintained.
The hero behaves like a real working surface rather than a poster.

“Console” here means **stateful interface**, not green monospace terminal cosplay.

## Composition

Desktop hypothesis:

```text
┌─────────────────────────────────────────────────────────────────────┐
│ S/  Ersen Filiz · Saygıyla Sunar          WORK ...          TR ◐   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ERSEN FILIZ                                                        │
│  I build systems, interfaces,                                      │
│  records and stranger things.                                      │
│                                                                     │
│  [ OPEN WORK ]  CONTACT                                             │
│                                                                     │
├───────────────────────────────┬─────────────────────────────────────┤
│ CURRENT                       │ ACTIVE THREADS                       │
│ Portfolio V5                  │ 01  EFSS PDE                         │
│ Design grammar / prototype    │ 02  security / operations           │
│                               │ 03  music / visual work              │
├───────────────────────────────┴─────────────────────────────────────┤
│ LAST UPDATED / 2026.09.xx                         STATUS / ACTIVE    │
└─────────────────────────────────────────────────────────────────────┘
```

Unlike A, the current state is structural rather than peripheral.

## Visual devices

- compact status rows,
- selected-state marker,
- deliberate table-like alignment,
- limited rectangles with little/no radius,
- current/updated information,
- clear distinction between identity and changing state.

## Motion

This direction earns more interaction.

Possible behavior:

- active marker slides between current threads,
- hovering a thread reveals a one-line context or associated artifact,
- last-updated/status values resolve as the page becomes interactive.

The movement must communicate state.

## Best quality

Immediately conveys “this is a maintained workbench.”
Strong fit for engineering and ongoing experiments.

## Failure mode

Very easy to turn into a dashboard, admin panel or SaaS landing page.
If each piece becomes a bordered widget, reject the composition.

## Test question

Would someone want to explore the work, or only admire the UI system?

---

# Direction C — Author + Artifact

## Character

The shell is quiet and stable; a single representative artifact provides emotional variation.

The artifact can come from different parts of Ersen’s work without changing the underlying portfolio identity.

## Composition

Desktop hypothesis:

```text
┌─────────────────────────────────────────────────────────────────────┐
│ S/  ERSEN FILIZ / SAYGIYLA SUNAR          WORK ...          TR ◐   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ERSEN FILIZ                         ┌────────────────────────────┐  │
│                                      │                            │  │
│  Software / systems / design         │  CURRENT ARTIFACT          │  │
│  Security / operations               │                            │  │
│  Music / strange experiments         │  [pixel / diagram /        │  │
│                                      │   interface fragment /     │  │
│  [ VIEW WORK → ]                     │   release artwork]         │  │
│                                      │                            │  │
│  EF / ACTIVE                         └────────────────────────────┘  │
│                                      ARTIFACT / 01                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

The right side contains **one** artifact, not a carousel of project thumbnails.

Possible artifact types:

- an EFSS PDE pixel-processing fragment,
- a precise interface crop,
- a technical diagram,
- a music visual,
- a restrained Kemirkent/pixel-art fragment,
- a generated visual clearly presented as experimental work.

## Visual devices

- calm shell,
- high contrast between clean typography and the artifact,
- artifact label/index,
- minimal framing,
- no decorative mock-device frames.

## Motion

The artifact may have a small authored behavior appropriate to its medium.

Examples:

- pixel processing resolves from source → disciplined output,
- diagram draws one meaningful connection,
- image reveals a crop/detail,
- audio release art responds subtly to focus/hover.

No autoplay video just to make the hero move.

## Best quality

Shows range without listing range.
The user understands there is a person with actual artifacts behind the interface.

## Failure mode

Can degrade into a marketing slideshow or Dribbble-shot hero.
The artifact must be real work, not generic decoration.

## Test question

If the artifact were removed, would the shell still feel like Saygıyla Sunar?
If the answer is no, the shell is too weak.

---

# Comparison matrix

| Criterion | A — Editorial Instrument | B — Working Console | C — Author + Artifact |
| --- | ---: | ---: | ---: |
| Authorship | Very high | High | Very high |
| Engineering/system feel | High | Very high | Medium–high |
| Creative range | Medium | Medium | Very high |
| Information density | Medium | High | Low–medium |
| Risk of generic portfolio | Medium | Medium | Medium |
| Risk of SaaS/dashboard | Low | High | Low |
| Risk of visual gimmick | Medium | Low–medium | High if artifact is decorative |
| Ease of maintaining “current” data | High | Medium | High |
| Natural home for subtle weirdness | Medium | Medium | Very high |

---

# Current recommendation

Do **not** pick a winner on paper.

The most promising design experiment is:

- use **A** as the control because it tests pure authorship and typography,
- use **B** to test whether “living workbench” can avoid dashboard aesthetics,
- use **C** to test whether Ersen’s creative/technical range can be felt without being listed.

Build only Header + first viewport for each direction.
Use identical copy and approximately identical navigation.
No final font decision yet.
No GSAP choreography yet.
No full-page redesign yet.

The winner should be the direction that still feels compelling after most decorative effects are removed.
