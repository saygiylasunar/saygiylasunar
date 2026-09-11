# V4 Typography System

The portfolio uses a role-based font palette rather than one generic product-design typeface.

## Primary roles

| Surface | Typeface | Intent |
| --- | --- | --- |
| Main UI / body | Exo 2 Variable | Technical and futuristic without sacrificing long-form readability |
| Global headings | Oxanium Variable | Strong Saygıyla Sunar display identity |
| Blog / editorial | Jura Variable | Technical-editorial voice for future blog/feed surfaces |
| Quotes / pull quotes | Text Me One | Human, unusual contrast against the interface |
| ÖGG | Tektur Variable | Operational / security-system character |
| Experience / CV | Saira Condensed | Dense, scannable career information |
| Music | Audiowide | Record / retro-tech display identity |
| Tools index | Chakra Petch | Utility / console-like technical surface |

## Loaded display palette

Black Ops One, Saira Stencil One, Russo One, Bungee Inline, Michroma, Bruno Ace, Rajdhani and Stint Ultra Expanded are loaded as opt-in display faces. Use the `.font-*` utilities from `src/styles/typography.css`; do not turn them into body fonts casually.

## Turkish requirement

All shipped typefaces must support the complete Turkish set used by this project:

`ÇĞİÖŞÜ çğıöşü`

Test sentence:

`Pijamalı hasta yağız şoföre çabucak güvendi. İĞÜŞÇÖ ığüşçö`

## External candidates

`Typo Angular Rounded Demo` remains catalog-only. The referenced demo license is not suitable for shipping on a public portfolio. Add the file only after obtaining an appropriate web/commercial license.

Snowstorm, Poultrygeist, LTZapfino One and SF Electrotome are intentionally rejected because their available character sets do not provide complete Turkish coverage.
