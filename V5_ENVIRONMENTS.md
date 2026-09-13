# Portfolio V5 — Environment Physics

V5 environments are not theme skins. They are material conditions for the same Saygıyla Sunar interface.

The navigation shell stays comparatively stable. The Home surface below it may change atmosphere, palette, texture and signal behavior without pretending to be a different product.

## Current environments

### Paper Signal

Warm editorial paper with orange, blue and acidic green accents.

Use when the interface should feel published, annotated and tactile rather than digital-first.

Avoid fake paper textures, scrapbook decoration and retro-print cosplay.

### Night Transmission

Deep navy/black with cyan, magenta and lime signal colors.

Use for technical night-mode energy, audio/visual experiments and signal-like interaction.

Avoid generic cyberpunk: no neon-everything, rain, fake terminals or hacker clichés.

### Garden Machine

Sage/cream with cobalt, coral and acid-yellow fields.

This is the current default research environment because it puts organic warmth next to technical structure without making either side decorative.

Use for generative/math surfaces, authored experiments and the main V5 exploration.

Avoid botanical illustration as decoration. “Garden” describes procedural growth, rhythm and material warmth, not literal leaves.

### Field Manual

Khaki/cream with safety orange, cobalt and yellow.

Use when the site needs an operational, field-document or engineering-record character.

Avoid military cosplay. The useful reference is legibility, indexing, safety color and field documentation.

## Shared rules

- Environment color must support information hierarchy; it cannot replace it.
- One environment may use several colors, but only one color should behave as the primary signal at a time.
- Strong washes belong to large quiet surfaces, not every card.
- Texture should be procedural/geometric where possible rather than raster decoration.
- Existing artifacts may introduce their own colors, but the shell should not fight them.
- Header/navigation remains a stable anchor while experimental Home environments are evaluated.
- Respect `prefers-reduced-motion`; environment identity cannot depend on animation alone.
- Environment selection is a V5 research control and is persisted locally.

## Current implementation

The Home page inherits environment tokens through `src/styles/v5-environments.css`.

The V5 hero lab exposes both independent test axes:

1. composition: Editorial / Console / Artifact,
2. environment: Paper / Night / Garden / Field.

Keeping these axes independent prevents us from mistaking a good color palette for a good composition.

The small generative LAB reads the same inherited color tokens. Its Canvas experiment remains native (`for`, `sin`, `cos`) so the environment experiment does not add another runtime dependency.
