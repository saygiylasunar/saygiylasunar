# Saygıyla Sunar — V4 Font Pool

This file tracks typefaces considered for the V4 visual language. The rule is simple: a font must contain the complete Turkish set `ÇĞİÖŞÜ / çğıöşü` before it can enter the usable pool.

Test string:

> Pijamalı hasta yağız şoföre çabucak güvendi. İĞÜŞÇÖ ığüşçö

## Self-hostable pool

These families are added as Fontsource dependencies but are **not imported globally yet**. Keeping a package installed does not make the browser download the font; a later typography pass will choose which families and weights are actually imported.

| Family | Intended character | Status |
| --- | --- | --- |
| Oxanium | primary UI / technical / headings | TR verified |
| Jura | metadata / thin technical UI | TR verified |
| Tektur | engineering / cyber / security | TR verified |
| Chakra Petch | interface / technical cards | TR verified |
| Rajdhani | condensed panels / metadata | TR verified |
| Michroma | sci-fi display | TR verified |
| Bruno Ace | cult sci-fi display | TR verified |
| Audiowide | music / retro-tech | TR verified |
| Black Ops One | security / industrial accent | TR verified |
| Saira Stencil One | industrial / security accent | TR verified |
| Russo One | game / retro-tech display | TR verified |
| Bungee Inline | playful/game display | TR verified |
| Saira Condensed | compact UI / metadata | TR verified |
| Stint Ultra Expanded | strange editorial display | TR verified |

All of the Fontsource entries above are intended to use their upstream open-font licensing. Exact imports and weights will be selected later so V4 does not load a font zoo on every route.

## Manual-license candidate

### Typo Angular Rounded Demo

- Turkish glyph set: complete.
- Source reference: https://www.cdnfonts.com/tr/typo-angular-rounded-demo.font
- Good fit: rounded technical/display, slightly cult/Y2K.
- Current demo license is listed as **free for personal use**. The font file is therefore **not committed or shipped** with the public portfolio. Obtain a suitable web/commercial license before use.

## Rejected: incomplete Turkish support

These are intentionally excluded from the usable pool so they are not accidentally reintroduced later:

- Snowstorm — missing `Ğ/ğ`, `İ`, `Ş/ş`.
- Poultrygeist — Basic Latin only; incomplete Turkish.
- LTZapfino One — missing `Ğ/ğ`, `İ`, `Ş/ş`.
- SF Electrotome — incomplete Turkish set.

## Integration rule

1. Keep the pool broad in development.
2. Import only the selected families/weights on production routes.
3. Display/accent fonts do not become body fonts merely because they look interesting.
4. Turkish glyph verification is mandatory before a new font enters the pool.
5. Third-party/demo fonts require redistribution/web-use license verification before their binary is committed.
