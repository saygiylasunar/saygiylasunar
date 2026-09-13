# Portfolio V5 — Environment Physics

V5 environments are not theme skins. They are material conditions for the same Saygıyla Sunar interface.

The navigation shell stays comparatively stable. The Home surface below it may change atmosphere, palette, texture and signal behavior without pretending to be a different product.

Composition and environment remain independent axes:

- Composition: A / B / C hero directions.
- Environment: Paper / Night / Garden / Field.

Keeping them independent prevents us from mistaking a successful palette for a successful composition.

## Paper Signal

Warm editorial paper with orange, blue and acidic green accents.

Use when the interface should feel published, annotated and tactile rather than digital-first.

Material cues:
- print registration,
- fine ruled structure,
- slightly imperfect alignment,
- publication / author-sheet energy.

Motion physics:
- offset color passes,
- registration cross marks,
- occasional stepped misalignment rather than smooth floating.

Avoid fake paper textures, scrapbook decoration and retro-print cosplay.

## Night Transmission

Deep navy/black with cyan, magenta and lime signal colors.

Use for technical night-mode energy, audio/visual experiments and signal-like interaction.

Material cues:
- transmission channels,
- scan structure,
- controlled interference,
- low-light technical display.

Motion physics:
- carrier waves,
- interference frequencies,
- scanning line,
- tiny data/glitch fragments.

Avoid generic cyberpunk: no neon-everything, rain, fake terminals or hacker clichés.

## Garden Machine

Sage/cream with cobalt, coral and acid-yellow fields.

This is the current default research environment because it puts organic warmth next to technical structure without making either side decorative.

Material cues:
- engineered growth,
- organic geometry inside a technical system,
- living but restrained color,
- warm generative behavior.

Motion physics:
- branching stems,
- growth nodes,
- orbital secondary systems,
- slow breathing ambient fields.

Avoid botanical illustration as decoration. “Garden” describes procedural growth, rhythm and material warmth, not literal leaves.

## Field Manual

Khaki/cream with safety orange, cobalt and yellow.

Use when the site needs an operational, field-document or engineering-record character.

Material cues:
- coordinate sheets,
- measuring instruments,
- field/operations documentation,
- practical engineering markings.

Motion physics:
- bearing lines,
- range rings,
- coordinate grids,
- crosshair / measurement-lock behavior.

Avoid military cosplay. The useful reference is legibility, indexing, safety color and field documentation.

## Shared rules

- Environment color must support information hierarchy; it cannot replace it.
- One environment may use several colors, but only one color should behave as the primary signal at a time.
- Strong washes belong to large quiet surfaces, not every card.
- Texture should be procedural/geometric where possible rather than raster decoration.
- Existing artifacts may introduce their own colors, but the shell should not fight them.
- Header/navigation remains a stable anchor while experimental Home environments are evaluated.
- Respect `prefers-reduced-motion`; environment identity cannot depend on animation alone.
- Ambient hero motion stays behind content and must not compete with reading.
- New libraries are not required merely because an environment has motion; native Canvas/CSS proves the behavior first.
- Environment selection is a V5 research control and is persisted locally.

## Current implementation

The Home page inherits environment tokens through `src/styles/v5-environments.css`.

The V5 hero lab exposes both independent test axes:

1. composition: Editorial / Console / Artifact,
2. environment: Paper / Night / Garden / Field.

The small generative LAB now changes **algorithm**, not only color:

- Paper draws offset registration passes,
- Night draws signal carriers and interference,
- Garden grows branching structures,
- Field draws bearings, range rings and coordinate locks.

`src/styles/v5-environment-motion.css` adds a second, deliberately quiet ambient layer to the hero for each environment. The Canvas experiment and ambient layer remain native so the environment experiment adds no new runtime dependency.

The goal is not “four themes.” The goal is one authored site that can inhabit four believable visual conditions.
