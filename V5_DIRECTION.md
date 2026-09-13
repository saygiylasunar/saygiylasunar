# Portfolio V5 — Direction Before Decoration

V5 exists to restore the working method that made LoraVOW feel authored instead of assembled.

## Core rule

**Think first. Build second.**

A technology, library, font, animation or component is not a design decision by itself. Every addition must answer what it contributes to the identity of Saygıyla Sunar and why it belongs next to the surrounding choices.

## What V5 keeps

- The parts of V2/V4 Home and Header that already feel personal and usable.
- The broad technical foundation that is genuinely useful.
- Existing content and routes unless a redesign has a clear reason to change them.
- Small, reversible commits while the visual language is still being discovered.

## What V5 rejects

- Generic agency / SaaS / Dribbble portfolio aesthetics.
- Choosing tools before defining the motion or visual idea.
- Assigning a different font to every category just because the category exists.
- Adding cards, labels, buzzwords or sections to make the site look more complete.
- Treating speed of implementation as evidence of design quality.

## Visual research axis

References may include Evangelion, Fullmetal Alchemist: Brotherhood, Dave the Diver, Graveyard Keeper, old computer interfaces, technical/security documentation, pixel art and Saygıyla Sunar's own existing work.

The goal is not to imitate those properties. The goal is to identify recurring qualities that actually fit the site, such as:

- dense but controlled information,
- strong typographic hierarchy,
- technical discipline,
- imperfect / human details,
- unexpected warmth,
- eccentricity used with restraint.

## Typography

The existing font pool is a **research library**, not a finished type system. No font becomes the primary face merely because it is readable, futuristic or available as a variable font.

Turkish support remains mandatory:

`ÇĞİÖŞÜ çğıöşü`

## Motion

Motion starts from a scene or interaction requirement. The implementation library comes afterwards. Scroll effects, timelines and micro-interactions must support hierarchy and character rather than advertise the animation engine.

## Creative framework pocket

V5 intentionally keeps a broad **research palette** without installing every candidate into the production bundle.

The source of truth is `src/config/creativeStack.js`. It groups tools by the problem they solve so framework variety stays useful instead of becoming dependency collection for its own sake.

Current pocket includes:

- native View Transition API, Web Animations API and Web Audio API,
- GSAP, Motion for Vue, Anime.js and Theatre.js for different motion-authoring models,
- Pts.js, p5.js, Two.js, Paper.js and canvas-sketch for math/vector/generative work,
- PixiJS for GPU-assisted 2D/pixel scenes,
- ralph-gpu for small experimental WebGPU/WGSL work,
- Three.js/TSL, OGL and regl for increasingly explicit GPU/shader work,
- Hydra for music/live-visual experiments,
- Lenis only when scroll synchronization genuinely needs it,
- Rive for deliberately authored reusable vector/state-machine animation.

**Catalogued does not mean installed.** A candidate enters `package.json` only when a real V5 scene has selected it.

The Home prototype contains a deliberately small `LAB / GENERATIVE SYSTEMS` strip. Its first animation is native Canvas driven by a loop plus `sin`/`cos`; it proves the visual idea before a framework is chosen.

## Working sequence

1. Audit what already feels right in the current site.
2. Extract recurring visual principles from references and existing Saygıyla Sunar work.
3. Prototype a small surface first — preferably Header + Hero.
4. Compare distinct directions before committing to a system.
5. Only then propagate typography, motion and component rules to the rest of the site.

V5 should feel like **Ersen built a place on the internet**, not like Ersen completed a portfolio template.
