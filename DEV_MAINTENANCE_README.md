# DEV MAINTENANCE — Portfolio V3

> Branch: **revamp/portfolio-v3**  
> Base: **main**  
> Status: **Local review / no production deployment**  
> Primary goal: Turn saygiylasunar.com from a compact portfolio into a distinctive, content-rich personal studio / engineering portfolio that foregrounds Ersen Filiz, his public work, process, writing, experiments and creative output.

---

## 0. Working Rule: Do Not Spend Netlify Deploy Capacity

This branch is intentionally isolated for local review.

- Do not run Netlify CLI deploy commands.
- Do not create production deploys for routine review.
- Do not depend on Netlify preview URLs during implementation.
- Validate with local Vite development and local production builds.
- GitHub branch commits are allowed.
- Do not merge to main until local visual/content review is approved.
- The current GitHub Actions workflow only targets refresh/portfolio-v2 pushes and pull requests into main; this branch should therefore remain outside the existing push build trigger unless the workflow is deliberately changed later.

Local workflow:

1. git fetch
2. git switch revamp/portfolio-v3
3. npm install
4. npm run dev
5. npm run build before milestone commits

---

# 1. Product Direction

The website should stop behaving like a short résumé with project placeholders.

It should become a **personal digital studio + engineering archive + creative portfolio**.

The visitor should understand, within seconds:

- Who Ersen Filiz is.
- What he builds.
- What he has already built.
- Which projects are active.
- What he thinks about engineering, AI, design and creative technology.
- Where his music and visual work live.
- How to contact or follow him.
- Why his work is different from a generic developer portfolio.

The site must express a single identity across several disciplines:

**Computer Engineering × AI × Product Development × UI/UX × Graphic Design × Creative Technology × Music × Experimental Tools**

The goal is not to make every discipline equally loud. The goal is to make the combination itself memorable.

---

# 2. Current Technical Snapshot

Current stack:

- Vue 3
- Vite
- Vue Router
- Vanilla CSS
- JSON-based content
- Static Netlify hosting
- Existing robots.txt
- Existing sitemap.xml
- Existing basic JSON-LD in index.html
- Existing TR / EN content structure

Current content architecture already gives us a useful base:

- src/content/projects.json
- src/content/services.json
- src/content/experience.json
- src/content/site.json
- src/content/ui.json
- src/content/ui-extras.json
- Vue views for projects, services, tools, music, experience, about and contact

This means Portfolio V3 should be an **evolution**, not a rewrite for the sake of a rewrite.

---

# 3. Main Problems To Solve

## 3.1 Content Debt

The site currently contains wording that signals “unfinished site” instead of “active studio”.

Examples of the pattern:

- “Detailed case studies are being prepared.”
- “This project record is currently being detailed.”
- “Records currently contain title, scope and status information.”
- Similar “will be published later / preparing / pilot” copy where a visitor expects actual content.

These strings are acceptable during development, but should not become the personality of the portfolio.

### Rule

A public page should do one of three things:

1. Show finished content.
2. Show a concise, intentional “work in progress” state with useful context.
3. Not exist in public navigation yet.

Never publish “I planned to write something here” copy.

### Content debt audit

Search all public copy for:

- hazırlanıyor
- detaylandırılıyor
- yakında
- şimdilik
- daha sonra
- yayımlanacaktır
- pilot
- placeholder
- TODO
- lorem
- under construction

Every occurrence must be classified as:

- Keep intentionally.
- Rewrite.
- Replace with real content.
- Hide route/card until ready.

---

# 4. Information Architecture V3

Proposed public structure:

- /
- /projects
- /projects/:slug
- /logbook
- /logbook/:slug
- /music
- /experience
- /about
- /contact
- /tools
- /tools/:slug
- /arsalar
- /ogg

Optional later:

- /design
- /visual-archive
- /uses
- /now
- /playground

## Navigation priority

Primary:

- Work
- Logbook
- About
- Music
- Contact

Secondary / utility:

- Tools
- Experience
- Lands
- OGG

“Services” can remain available, but the portfolio should foreground **proof of work** before sales language.

---

# 5. Homepage V3

The homepage must feel more like an authored digital object and less like a grid of service cards.

## 5.1 Hero

Hero should answer:

**Who is this? What does he make? Why should I keep scrolling?**

Suggested structure:

- Name / Saygıyla Sunar identity
- One strong sentence
- Rotating or animated discipline line
- Selected work preview
- Compact quick-access actions
- Subtle visual signature / generative or geometric motion

Avoid generic “I turn ideas into digital systems” as the only statement.

The hero should show personality, not only capability.

## 5.2 Selected Work

Prioritize strong, public, explainable work.

Initial priority candidates:

- LoraVow
- Beyaz Önlüklüler digital transformation
- Yavuz Özel Güvenlik work
- Saygıyla Sunar Font
- BellekPad
- EFSS PDE / pixel discipline tooling
- AI visual workflows
- ReversenUI
- EzgiWave
- selected game / visual experiments
- selected mini tools

Private projects should never leak through data files, hidden links, generated sitemap entries, metadata or source copy.

## 5.3 “What I’m Building” Strip

A compact living status area can show:

- current experiments
- latest logbook entry
- latest project update
- recent music
- current focus

This makes the site feel maintained without filling the homepage with blog cards.

---

# 6. Opening Modal / Fast Access Redesign

The current IntentModal already provides a useful entry point, but V3 should turn it into a compact **command center**.

Goal: reduce friction without sending the user away from the site too early.

Possible actions:

- Featured Projects
- AI Logbook
- Music
- Instagram
- GitHub
- LoraVow
- Beyaz Önlüklüler
- Yavuz Özel Güvenlik
- Tools
- Contact

## Behavior

- Keep session-based “seen” behavior.
- Do not block the site for too long.
- Provide an obvious close button.
- Keyboard navigation must remain correct.
- Mobile layout should be compact.
- Do not put ten equal-priority buttons on screen.
- Use 3–4 featured destinations + a smaller secondary row.

## Visual direction

The modal can feel like:

- command palette
- studio dashboard
- launcher
- visual index

It should not feel like a marketing pop-up.

---

# 7. Dev Logbook / Articles

This is a major V3 feature.

Working name:

**Logbook**

It should be broad enough to contain AI notes without locking the entire writing section to AI.

Possible categories:

- AI
- Engineering
- Frontend
- Product
- Design
- Typography
- Pixel Art
- ComfyUI
- Local AI
- Music
- Experiments
- Field Notes
- Project Updates

## 7.1 URL model

- /logbook
- /logbook/:slug

## 7.2 Content model

Long-form content should move away from giant JSON strings.

Recommended direction:

**Markdown + front matter**

Suggested fields:

- slug
- title
- description
- publishedAt
- updatedAt
- category
- tags
- cover
- ogImage
- language
- draft
- featured
- relatedProjects
- canonical
- readingTime

## 7.3 Entry types

A Logbook entry does not always need to be a polished essay.

Support several formats:

### Note
Short technical finding.

### Dev Log
What changed in a project and why.

### Deep Dive
Long-form technical article.

### Experiment
Hypothesis, setup, result, failure, next step.

### Postmortem
What went wrong, what changed.

### Reference
Reusable internal knowledge published publicly.

This lowers the cost of publishing and creates an authentic development history.

## 7.4 AI Logbook themes

Strong early article candidates from existing work:

- Building controllable ComfyUI workflows
- Character consistency experiments
- LoRA dataset preparation
- Local AI tooling and VRAM constraints
- Pixel-art downscaling as an inverse tiled-generation problem
- EFSS PDE design decisions
- Programmatic font geometry
- Prompt systems vs visual systems
- Local-first AI tool architecture
- ReversenUI engineering notes

Articles should demonstrate actual thinking and process, not generic “What is AI?” content.

---

# 8. Project Pages Must Become Case Studies

A project page should answer:

- What is it?
- Why does it exist?
- What problem does it solve?
- What was my role?
- What did I build?
- What technologies were used?
- What decisions mattered?
- What is public?
- What is the current status?
- What did I learn?
- Where can the visitor see more?

## Proposed project schema

Each public project should gradually support:

- title
- slug
- one-line positioning
- summary
- year / date range
- status
- category
- roles
- technologies
- cover image
- gallery
- external links
- GitHub link when public
- problem
- context
- constraints
- process
- architecture
- design decisions
- result
- lessons
- related logbook entries
- related services
- SEO description
- OG image

Not every project needs every field.

The renderer should gracefully hide missing sections instead of printing placeholder text.

---

# 9. Editorial Style / Capitalization

The site currently mixes several casing styles.

V3 must define a deliberate casing system.

## Turkish

Use **Title Case** selectively for:

- navigation items
- card titles
- compact labels where visually appropriate
- major marketing headings when the design calls for it

Use **sentence case** for:

- paragraphs
- descriptions
- long UI explanations
- article titles when editorial tone is stronger

Preserve:

- AI
- UI/UX
- DNS
- API
- GitHub
- JavaScript
- Vue
- ComfyUI
- LoRA
- SDXL
- product names

Do not mechanically uppercase the first letter of every word in every sentence.

Create a content review pass specifically for:

- Turkish capitalization
- English capitalization
- punctuation
- en dash / em dash consistency
- slash usage
- product spelling
- acronym consistency

---

# 10. Visual System: Less Boxy, More Authored

The current site should become softer and more dynamic without turning into a generic glassmorphism template.

## 10.1 Shape language

Reduce the “everything is a rectangle” effect.

Use a small shape vocabulary:

- medium radii
- occasional large pill
- asymmetrical media crops
- soft masks
- layered surfaces
- floating metadata
- editorial dividers
- subtle curves
- occasional geometric signature shapes

Cards do not all need full borders.

Use spacing, background tone and typography as separators before reaching for another rectangle.

## 10.2 Depth

Introduce controlled depth through:

- subtle shadows
- blurred background accents
- layered panels
- gradient light
- masked images
- hover elevation
- restrained parallax

Avoid:

- heavy neon
- excessive glass blur
- constant glowing borders
- animation on every object

---

# 11. Motion System

Motion should communicate hierarchy and responsiveness.

Possible technologies to evaluate:

- native CSS transitions / keyframes
- Web Animations API
- Motion for lightweight component motion
- Vue-focused motion utilities if they reduce custom code

Do not add a library until the exact need is defined.

## Motion categories

### Entrance
Small stagger on hero and content groups.

### Hover
Cards, project media, quick links.

### Route
Very light route transition.

### Scroll
Reveal only where meaningful.

### Ambient
One or two slow visual signatures, not dozens.

## Accessibility

Respect prefers-reduced-motion.

Every animation must have a non-animated equivalent.

---

# 12. Typography

Typography should carry more of the art direction.

Potential sources:

- Google Fonts
- Fontsource packages
- self-hosted open-source fonts where license permits
- Saygıyla Sunar Font when mature enough for controlled display usage

Rules:

- no random font accumulation
- maximum 2 primary families in the normal UI
- monospace used as an accent, not everywhere
- font loading must not create layout instability
- verify Turkish glyph coverage
- use variable fonts where useful

Possible role split:

- editorial/display face
- highly readable UI/body face
- optional mono accent for technical metadata

---

# 13. Icons

Adopt one consistent icon family for the interface.

Candidate sets:

- Material Symbols
- Lucide
- Iconify as an abstraction layer only if multiple sets are genuinely needed

Rules:

- prefer SVG
- consistent stroke / fill language
- avoid emoji as functional UI icons
- brand icons can use official brand assets where appropriate
- icons must support text, not replace necessary labels

---

# 14. SEO V3

SEO work must become route-aware.

The current index.html has a solid base, but one global head cannot adequately represent every public route.

## 14.1 Per-page metadata

Every indexable page should define:

- title
- meta description
- canonical URL
- Open Graph title
- Open Graph description
- Open Graph image
- Open Graph URL
- Open Graph type
- Twitter card
- Twitter title
- Twitter description
- Twitter image

For articles additionally:

- published time
- modified time
- author
- article section
- article tags where useful

## 14.2 Head management

Evaluate a proper Vue head-management layer.

Preferred direction:

- route/content-driven metadata
- one reusable SEO composable/component
- metadata sourced from project/article content
- fallbacks defined centrally

Do not duplicate head mutation logic across views.

## 14.3 SPA rendering problem

Social crawlers and some indexing systems may not execute client-side Vue the same way as a browser.

Therefore V3 SEO should evaluate:

1. Route-aware head management.
2. Static prerendering / SSG for public content routes.
3. Only then consider a larger architecture migration if needed.

A full framework rewrite is not the first move.

## 14.4 Sitemap

sitemap.xml should eventually be generated from public routes and public content.

Include:

- static pages
- public project detail pages
- logbook articles
- public tools if useful

Exclude:

- drafts
- private projects
- temporary routes
- hidden internal experiments

## 14.5 Structured data

Expand JSON-LD intentionally.

Candidates:

- Person
- WebSite
- ProfilePage
- CreativeWork / SoftwareApplication for suitable projects
- Article / BlogPosting for Logbook
- BreadcrumbList
- MusicGroup / MusicRecording only where accurate and useful

Do not add schema purely to chase scores.

---

# 15. OG / Social Image System

Every important page should have a deliberate social preview image.

Minimum templates:

- Homepage
- Project
- Logbook article
- Music
- About

Target:

- 1200 × 630 default OG canvas
- safe text area
- strong title
- Saygıyla Sunar visual signature
- optional project/article category
- no tiny unreadable paragraphs

Later, generate OG assets from project/article data if automation is worth the complexity.

Until then, curated static OG images are acceptable.

---

# 16. Image / Media Rules

Projects need visual evidence.

Preferred media:

- actual UI screenshots
- diagrams
- selected development captures
- brand work
- before/after
- generated visual experiments where relevant
- short muted loop only when it explains interaction

Rules:

- WebP / AVIF where supported and practical
- explicit width and height
- responsive sizes
- lazy loading below the fold
- descriptive alt text
- avoid multi-megabyte decorative assets
- do not expose private project screenshots

---

# 17. Public / Private Project Boundary

Create an explicit visibility field in content.

Suggested states:

- public
- unlisted
- private
- draft

Behavior:

### public
Rendered, linked and indexed.

### unlisted
Accessible by route if deliberately needed, but not shown in navigation or sitemap.

### draft
Local development only.

### private
Never bundled into public site content.

Important: “private” content should not merely be hidden with CSS or filtered at runtime after bundling.

Private project details belong outside public source content.

---

# 18. Content Taxonomy

A project may have several dimensions.

Do not force one “category” string to do all work.

Suggested dimensions:

- discipline
- project type
- role
- technology
- year
- status
- organization
- visibility

Example:

LoraVow

- Discipline: Engineering, Product, UI/UX
- Type: Web Product
- Role: Architecture, Frontend, Product Design
- Technology: Vue/React prototype, Google Drive, Netlify, JavaScript
- Status: Development
- Visibility: Public

This enables better filters and related-content logic later.

---

# 19. Internal Linking

SEO and discoverability improve when the site behaves like a knowledge graph.

Examples:

Project → related Logbook entries  
Logbook → related projects  
Service → proof-of-work projects  
About → selected projects  
Music → production Logbook notes  
Tool → technical Logbook article

Avoid dead-end pages.

Every content detail page should offer a relevant next step.

---

# 20. Performance Budget

Art direction must not destroy performance.

Initial targets:

- no large animation framework without justification
- lazy-load non-critical media
- route-level code splitting remains
- avoid loading all project gallery media on homepage
- avoid huge third-party icon/font bundles
- compress large existing assets
- monitor Core Web Vitals
- preserve usable experience on mid-range Android devices

Any new decorative feature must justify its network and main-thread cost.

---

# 21. Accessibility Baseline

Must preserve or improve:

- keyboard navigation
- visible focus states
- semantic headings
- modal focus trapping
- Escape behavior
- meaningful link labels
- alt text
- reduced motion
- contrast
- touch target size
- language attribute
- accessible icon labels

The current IntentModal already contains useful accessibility work; preserve that quality during redesign.

---

# 22. Content Source Refactor

Short structured content can stay in JSON.

Long-form content should not.

Recommended separation:

### JSON
- navigation
- short UI copy
- project metadata
- service metadata
- site profiles
- tools index

### Markdown
- Logbook
- long case studies
- essays
- detailed project notes

### Vue
- presentation
- behavior
- reusable content rendering

Do not put long editorial copy directly into components unless it is truly component-specific.

---

# 23. Proposed New Content Files

Possible direction:

src/content/
- site.json
- projects.json
- services.json
- experience.json
- logbook/
  - YYYY-MM-DD-slug.md
- project-cases/
  - loravow.md
  - beyaz-onlukluler.md
  - yavuz-ozel-guvenlik.md

Later we may merge project metadata and project body loading behind one content API.

---

# 24. Component Opportunities

Likely reusable V3 components:

- SeoHead
- HeroSignature
- QuickAccessLauncher
- FeaturedProject
- ProjectGallery
- ProjectMeta
- LogbookCard
- LogbookIndex
- ArticleMeta
- TagList
- RelatedContent
- MediaFigure
- CodeBlock
- Callout
- Breadcrumbs
- SharePreview
- StatusBadge

Do not create components simply to create components. Extract only repeated or semantically meaningful UI.

---

# 25. Design Tokens

Before large CSS edits, formalize tokens.

At minimum:

- colors
- surface colors
- text hierarchy
- spacing scale
- radius scale
- shadow scale
- typography sizes
- content widths
- animation duration
- easing curves
- z-index layers

This will help remove the accumulated “phase/additions/final/kiss” CSS layering problem over time.

---

# 26. CSS Maintenance Debt

Current styles are split across several additive and phase-specific files.

Examples include:

- additions.css
- compact-scale.css
- phase2.css
- multiple lands-specific override files
- palette-purple.css
- webp-bulk.css

This is understandable during rapid iteration, but V3 should gradually converge toward clearer ownership.

Goal:

- base tokens
- global primitives
- components
- page-specific styles
- utilities only when justified

Do not perform a giant CSS rewrite in one commit.

Refactor as each section is redesigned.

---

# 27. Implementation Phases

## Phase 0 — Safety / Branch Isolation

- [x] Create revamp/portfolio-v3 from main
- [x] Confirm local-review workflow
- [x] Avoid Netlify deployment commands
- [ ] Create baseline screenshots locally
- [ ] Record existing Lighthouse / Core Web Vitals baseline locally where practical

## Phase 1 — Content Audit

- [x] Inventory every public route
- [x] Find placeholder / temporary copy
- [x] Remove low-value under-construction language
- [x] Mark public vs draft vs private projects
- [x] Add missing public projects
- [ ] Normalize project naming
- [ ] Normalize TR / EN casing and punctuation

## Phase 2 — Content Architecture

- [x] Define V3 project schema
- [x] Define Logbook schema
- [x] Add Markdown content pipeline
- [x] Add related-project / related-article relations
- [x] Add visibility rules

## Phase 3 — SEO Foundation

- [x] Add route-aware SEO model
- [x] Add unique title + description per route
- [x] Add canonical per route
- [x] Add OG image per important route
- [x] Add Twitter image metadata
- [x] Add Article metadata
- [x] Expand structured data
- [x] Generate sitemap from content
- [ ] Evaluate prerender / SSG

## Phase 4 — Homepage Art Direction

- [x] Redesign hero
- [x] Add stronger visual signature
- [x] Replace service-heavy first impression with work-first hierarchy
- [x] Add selected project storytelling
- [x] Add current-building strip
- [x] Refine CTA hierarchy

## Phase 5 — Quick Access Launcher

- [x] Redesign IntentModal
- [x] Add featured quick links
- [x] Add Music
- [ ] Add Instagram
- [x] Add AI Logbook
- [x] Add LoraVow
- [x] Add Beyaz Önlüklüler
- [x] Add Yavuz Özel Güvenlik
- [x] Keep internal navigation dominant
- [x] Preserve accessibility

## Phase 6 — Project Case Studies

- [x] LoraVow
- [x] Beyaz Önlüklüler
- [x] Yavuz Özel Güvenlik
- [ ] Saygıyla Sunar Font
- [ ] BellekPad
- [x] EFSS PDE
- [ ] AI visual workflows
- [x] ReversenUI / EzgiWave where relevant

## Phase 7 — Logbook

- [x] /logbook index
- [x] category / tag filtering
- [x] article renderer
- [x] article SEO
- [x] related content
- [x] first 3–5 real entries

## Phase 8 — Visual Softening

- [x] reduce border-heavy cards
- [x] introduce radius system
- [x] add editorial spacing
- [ ] refine type scale
- [ ] improve project media layout
- [x] add controlled depth
- [x] add restrained gradients / light accents

## Phase 9 — Motion

- [ ] define motion tokens
- [x] hero entrance
- [x] hover micro-interactions
- [x] route transition
- [x] selected scroll reveals
- [x] reduced-motion behavior
- [ ] performance check

## Phase 10 — Quality Pass

- [ ] keyboard audit
- [ ] mobile audit
- [ ] 320–430 px width audit
- [ ] tablet audit
- [ ] desktop wide-screen audit
- [ ] Turkish content review
- [ ] English content review
- [ ] broken links
- [ ] image alt text
- [ ] metadata inspection
- [ ] sitemap inspection
- [x] local production build

---

# 28. Definition of Done for a Public Page

A page is not “done” because it renders.

It is ready when:

- Content is intentional.
- No placeholder language remains.
- Title is correct.
- Description is unique.
- Canonical is correct.
- OG image exists or has an intentional fallback.
- Mobile layout works.
- Keyboard navigation works.
- Images are optimized.
- Internal links exist.
- No private content leaks.
- Turkish and English copy are reviewed where both are supported.
- Page does not look like a generic template.

---

# 29. Non-Goals

Do not:

- migrate frameworks just because a new framework is fashionable
- add a CMS before content volume justifies it
- add animation libraries without a concrete use case
- add multiple icon packs casually
- add multiple font families casually
- turn the homepage into a dashboard of every side project
- publish private work accidentally
- create empty project detail pages
- rely on Netlify preview builds for every iteration
- optimize SEO by stuffing keywords
- let SEO copy erase personality

---

# 30. Immediate Next Work

The next implementation batch should be small and reviewable.

Recommended first batch:

1. Create V3 SEO/content schema proposal.
2. Audit and remove obvious temporary copy.
3. Add missing public projects to the project inventory.
4. Define Logbook content model.
5. Prototype the new homepage hero + quick-access launcher.
6. Review locally before touching the rest of the site.

This order gives us visible improvement early while also fixing the architecture that will support future content.

---

# 31. Working Principle

**The site should feel like Ersen built it, not like Ersen filled in a portfolio template.**

Engineering quality is part of the visual identity.

Visual identity is part of the engineering story.

Content is not filler between components; content is the product.
