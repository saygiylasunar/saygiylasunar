# Portfolio V5 — Visual Grammar v0.1

This document defines how Saygıyla Sunar should *behave visually* before individual components, fonts or animation libraries are chosen.

It is intentionally stricter about **relationships** than about specific CSS values. The purpose is to make later implementation decisions testable: a choice either belongs to this grammar or it does not.

---

## 1. Core character

### 1.1 The axis

The central visual tension is:

> **disciplined information × controlled eccentricity**

Saygıyla Sunar should look competent before it looks unusual. The unusual parts are discovered through use; they are not sprayed over every surface as decoration.

This allows software engineering, information security, institutional experience, music, pixel art, Çuvuk/Kemirkent and experimental work to live in the same place without pretending they are the same kind of object.

### 1.2 What the site is

Not an agency landing page.
Not a personal-brand funnel.
Not a retro operating-system skin.
Not a cyberpunk HUD imitation.

The closest mental model is:

> **personal workbench + archive + field notebook + publishing surface**

It should feel maintained by one person over time.

### 1.3 The authorship test

Before adding a visual device, ask:

> Would this still make sense if the Saygıyla Sunar name and logo were removed?

If the answer is “yes, this could be any modern portfolio,” the device needs more thought.

---

## 2. Consistency without sameness

V5 does not make every page look identical.

Consistency comes from a shared grammar:

- spacing rhythm,
- information hierarchy,
- line and border behavior,
- indexing / labeling conventions,
- typography roles,
- motion semantics,
- authorship marks,
- restraint.

Different content types may have different compositions.

A security record should not be forced into the same component as a song.
A pixel-art world should not be forced into the same component as institutional experience.
A software project should not become a “card” simply because it appears in a portfolio.

> **Same hand, different objects.**

---

## 3. Information architecture as visual language

The site has three broad internal currents. These are an organizing model, not mandatory navigation labels.

### BUILD

Software, systems, UI/UX, tools, AI workflows, engineering experiments, EFSS PDE and product work.

### OPERATE / SECURE

Institutional IT, information security, BGYS / ISO work, auditing, operational responsibility, private-security-related material and field-oriented work.

### CREATE

Music, lyrics, visual work, pixel art, Çuvuk / Kemirkent, experimental interfaces and authored media.

Some work belongs to more than one current. That overlap is desirable and should not be hidden.

The interface should describe what an item **is**, not force everything into the word “project.”

Useful object types may include:

- Project
- Product
- Tool
- System
- Record
- Credential
- Experiment
- Release
- Note
- World
- Archive

---

## 4. Page archetypes

Pages should inherit the global grammar but choose an archetype appropriate to the information.

### Home — Switchboard

Purpose: orient, establish authorship and expose active currents.

Home is not a complete CV and not a sitemap.
It should answer:

1. Who is this?
2. What kinds of things happen here?
3. What is active now?
4. Where can I go deeper?

Home may contain a small **Current / Now** surface, but it must not become an analytics dashboard.

### Projects / Work — Archive

Unequal objects are allowed unequal visual weight.
A serious product can occupy far more space than a utility.
Do not normalize everything into equal cards.

### Experience — Record

Dense, scannable, documentary.
Institution, period, role, systems/responsibilities and evidence matter more than decorative imagery.

Avoid fake “personnel dossier” cosplay. Borrow the clarity of records, not the costume.

### OGG / security-related surfaces — Field / operations sheet

Clear time, state, instruction and operational information.
Higher density is acceptable.
Decorative military aesthetics are not required.

### Music — Release surface

The music section may shift rhythm and typography, but it remains recognizably inside Saygıyla Sunar.
Avoid generic Spotify-clone UI and automatic “vinyl/cassette” nostalgia unless a release genuinely calls for it.

### Blog / Logbook — Notes

If/when it exists, the writing surface should feel like authored notes or field entries rather than a SaaS CMS theme.
The content model should be sustainable before the visual treatment is finalized.

### Çuvuk / Kemirkent — World

This can break more rules than other areas.
It is allowed to be illustrative, pixel-based and playful.
It should still connect back through shared indexing, spacing and authorship marks.

---

## 5. Grid and composition

### 5.1 Base grid

Use a stable desktop container and a **12-column mental grid**, but do not expose twelve equal boxes everywhere.

The grid is for alignment, not for making a dashboard.

Preferred behavior:

- strong left edges,
- occasional deliberate off-axis elements,
- asymmetrical compositions,
- large empty areas when they create hierarchy,
- dense information only where the information deserves density.

### 5.2 Repetition rule

Three identical cards in a row should be treated as suspicious by default.

Before using a repeated card grid, ask whether the objects truly have equal status and structure.

### 5.3 Alignment

Primary text, labels and records should align aggressively.
Illustration and experimental objects may violate the grid once the underlying alignment is established.

> **Order first; deviation second.**

---

## 6. Spacing and density

Use two density modes rather than one universal spacing scale.

### Reading density

For Home, About, long text, major project narratives and music prose.
Generous vertical separation and comfortable line lengths.

### Record density

For Experience, schedules, metadata, logs, tools and structured technical information.
Tighter spacing, stronger alignment and smaller labels.

The two modes should share the same base spacing rhythm so they still feel related.

Suggested implementation base later: multiples of 4px with dominant steps around 8 / 12 / 16 / 24 / 32 / 48 / 72 / 96.

Do not freeze these numbers until Header + Hero prototypes are visually tested.

---

## 7. Shape language

### 7.1 Corners

Default surfaces should be closer to **square / lightly softened** than pillowy SaaS cards.

Large 20–32px radii should be rare.

Suggested future categories:

- 0–2px: records, technical frames, tables, diagrams
- 4–8px: ordinary interactive surfaces
- 10–14px: occasional softer media surfaces
- pill: status chips, compact controls and intentionally capsule-shaped data only

### 7.2 Borders

Lines carry information.

Use borders to:

- establish hierarchy,
- divide records,
- create measuring/indexing rhythm,
- connect labels to objects.

Avoid adding a border merely because “cards need borders.”

### 7.3 Shadows

Shadows should indicate physical elevation or temporary overlay state.
They are not a default card treatment.

No permanent floating-card soup.

---

## 8. Color

### 8.1 Base

Keep the existing warm-light / dark-neutral instinct unless prototypes prove otherwise.
The site benefits from feeling closer to paper, equipment and screen surfaces than pristine white SaaS UI.

### 8.2 Accent

One primary accent should dominate the core site.
The current warm red/orange family remains a valid candidate because it feels authored and works against both technical and editorial contexts.

### 8.3 Domain color

Sections may acquire secondary colors when they encode real meaning.

Good:

- status,
- category distinction,
- diagram layers,
- schedule types,
- release artwork-derived color.

Bad:

- “Music must be purple.”
- “Security must be green.”
- rainbow category branding for the sake of variety.

### 8.4 Gradients

Gradients are content-dependent, not a background default.
No ambient purple-blue startup fog.

---

## 9. Typography grammar

The existing font collection is a **specimen library**.
V5 does not assign one typeface to every content category in advance.

### 9.1 Roles

The final system should probably resolve to approximately four simultaneous roles:

1. **Text** — paragraphs, UI, navigation; Turkish-complete and highly readable.
2. **Display** — strong page/section identity.
3. **Data / technical** — dates, indices, metadata, measurements, labels.
4. **Anomaly** — rare expressive face for authored moments, covers, quotes or world-building.

A single family may serve more than one role.

### 9.2 Maximum visible diversity

A normal page should rarely show more than **three font voices at once**.
A fourth may appear only as a deliberate anomaly.

### 9.3 Typography should carry hierarchy

Before adding a box, background or icon, try solving hierarchy with:

- size,
- width,
- weight,
- case,
- tracking,
- line length,
- alignment.

### 9.4 Turkish requirement

Every production face must support:

`ÇĞİÖŞÜ çğıöşü`

No exception for primary readable text.

---

## 10. Labels, indices and authorship marks

The site may use compact identifiers as a recurring connective tissue.
They should feel like notes made by the author, not fictional military bureaucracy.

Examples of the *syntax*, not final copy:

- `S/`
- `EF / 2026`
- `PROJECT / 004`
- `RECORD / 2022–23`
- `AUDIO / RELEASE`
- `LOG / 2026.09.13`
- `KEMIRKENT / ARCHIVE`

Rules:

- short,
- useful,
- visually subordinate to real titles,
- consistent separators,
- never replace understandable navigation.

The exact namespace scheme should be defined after the content inventory is cleaned up.

---

## 11. Imagery

Different image types need different treatment.

### Photography

Allow full photographs to breathe.
Avoid trapping every image in rounded cards.
Crop with intent; do not use arbitrary template aspect ratios everywhere.

### Pixel art

Preserve crisp pixels.
No blur, smoothing or fake CRT filter by default.
Pixel art can interrupt otherwise clean layouts because the contrast is part of its value.

### Diagrams / technical images

Prefer labels, callouts, measurements and meaningful annotation over decorative mockup frames.

### Generated / experimental imagery

Clearly belongs to the creative/experimental context; do not let it masquerade as documentary evidence.

---

## 12. Çuvuk rule

Çuvuk is not the corporate mascot.

Use as:

- easter egg,
- 404 / empty-state personality,
- occasional marginal illustration,
- gateway into Kemirkent,
- small interruption in overly serious areas when appropriate.

Do not place Çuvuk beside every CTA, service or skill.
Scarcity protects the character.

---

## 13. Motion grammar

Animation expresses **state**, not “modernity.”

### 13.1 Allowed semantic families

#### Reveal
Information becomes available because the user reached or requested it.
Use sparingly; not every element needs a scroll reveal.

#### Index
An active item, section number, cursor or marker moves to reflect navigation/state.

#### Load / resolve
A project, record or media object assembles from a compact state into readable information.

#### Transition
Relationships between two states remain visually understandable while the layout changes.

#### Scene
Rare, authored moments for creative work where animation itself is part of the piece.

### 13.2 Avoid

- universal fade-up-on-scroll,
- perpetual floating,
- meaningless parallax,
- rotating/glowing ornaments with no information role,
- animation merely to prove GSAP exists.

### 13.3 Speed

Most UI motion should feel decisive rather than luxurious.
Long cinematic timing is reserved for actual scenes.

`prefers-reduced-motion` remains mandatory.

---

## 14. Interaction

### Hover

Hover should reveal consequence or additional information, not simply scale every card by 1.02.

Possible behaviors:

- index shifts,
- border changes state,
- supporting metadata appears,
- image crop changes subtly,
- directional marker moves.

### Click / navigation

Clickable objects must look clickable without relying on animation.

### Cursor

Do not replace the system cursor globally.
Custom cursor behavior is allowed only for a specific authored surface where it adds meaning.

---

## 15. Home composition hypothesis

This is a hypothesis to prototype, not a locked wireframe.

### Header

Keep the strongest parts of the existing V2/V4 structure:

- `S/` authorship mark,
- Ersen Filiz / Saygıyla Sunar identity,
- direct navigation,
- language and theme controls.

Make it tighter and typographically stronger before considering a structural redesign.

### Hero

Hero should contain approximately three layers:

1. **Identity** — Ersen Filiz / Saygıyla Sunar.
2. **Plain-language orientation** — what kind of work happens here.
3. **Live state** — a compact Current/Now surface.

The live state may expose things such as current build, current study/work thread, recent release or active experiment, but it must remain maintainable.

### After hero

Avoid “six services cards.”
Instead expose a few significant entry points with unequal visual weight.

A possible rhythm:

- major current/representative work,
- professional/operational record,
- experimental/creative interruption,
- selected archive,
- closing contact / identity.

---

## 16. Controlled anomaly budget

A useful V5 rule:

> **Every viewport earns at most one strong anomaly.**

An anomaly may be:

- an unusual typeface,
- pixel art,
- an oversized number,
- an off-grid object,
- an unexpected motion event,
- a strange caption,
- a dramatic color field.

Do not stack all of them together unless the page is explicitly an authored artwork/world.

This keeps eccentricity valuable.

---

## 17. Anti-pattern list

Reject by default:

- generic glassmorphism,
- ambient neon gradients,
- giant pill buttons everywhere,
- every object as a rounded card,
- Bento grids used only because they are fashionable,
- fake terminal text,
- Matrix rain,
- meaningless scanlines,
- cyberpunk decoration disconnected from content,
- “creative technologist” filler copy,
- skill-progress bars,
- logo clouds without a reason,
- infinite carousel for ordinary content,
- excessive badges,
- equal visual weight for unequal work,
- animated noise purely as atmosphere,
- one-off font gimmicks with no Turkish support.

---

## 18. Prototype gates

No global visual-system implementation should happen until these gates pass.

### Gate A — Header + Hero

Create three intentionally different directions using the **same content**.
Do not judge them by how many effects they contain.
Judge:

- authorship,
- hierarchy,
- recognizability,
- information density,
- comfort,
- whether the design feels borrowed.

### Gate B — One record surface

Prototype Experience or OGG to prove the grammar can handle dense information.

### Gate C — One creative surface

Prototype Music or a Çuvuk/Kemirkent fragment to prove the grammar can bend without breaking.

Only after all three gates work should typography, motion tokens and reusable components be declared “the V5 system.”

---

## 19. First three Hero directions to explore

These are research directions, not themes to implement globally.

### Direction A — Editorial Instrument

Large, severe typography; warm paper/screen base; precise indices; one technical status panel; strong whitespace.

Risk: can become fashion/editorial portfolio if the technical information is too decorative.

### Direction B — Working Console

Quieter headline; stronger live/current information; navigation and state markers behave like a real tool rather than a poster.

Risk: can become dashboard/SaaS if everything becomes modular cards.

### Direction C — Author + Artifact

Identity on one side, one changing representative artifact on the other: code, pixel art, diagram, music artwork or project fragment. The artifact changes the emotional tone without changing the shell.

Risk: can become a slideshow hero if the artifact is treated as marketing media.

The first prototype round should compare these three, not blend them prematurely.

---

## 20. Working sentence

When uncertain, return to this:

> **Saygıyla Sunar is a disciplined personal archive where serious systems work and strange authored work are allowed to coexist without impersonating each other.**

That sentence is more important than any individual font, animation library or component.
