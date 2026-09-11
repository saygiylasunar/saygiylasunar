export const TURKISH_FONT_TEST = 'Pijamalı hasta yağız şoföre çabucak güvendi. İĞÜŞÇÖ ığüşçö'

export const typographyRoles = Object.freeze({
  ui: 'Exo 2 Variable',
  display: 'Oxanium Variable',
  editorial: 'Jura Variable',
  quote: 'Text Me One',
  security: 'Tektur Variable',
  experience: 'Saira Condensed',
  music: 'Audiowide',
  tools: 'Chakra Petch',
})

export const fontCatalog = [
  { id: 'exo-2', family: 'Exo 2', source: 'fontsource', package: '@fontsource-variable/exo-2', role: ['ui', 'body', 'primary'], turkish: true, redistributable: true, loaded: true },
  { id: 'oxanium', family: 'Oxanium', source: 'fontsource', package: '@fontsource-variable/oxanium', role: ['display', 'heading', 'technical'], turkish: true, redistributable: true, loaded: true },
  { id: 'jura', family: 'Jura', source: 'fontsource', package: '@fontsource-variable/jura', role: ['editorial', 'blog', 'metadata'], turkish: true, redistributable: true, loaded: true },
  { id: 'text-me-one', family: 'Text Me One', source: 'fontsource', package: '@fontsource/text-me-one', role: ['quote', 'editorial-accent'], turkish: true, redistributable: true, loaded: true },
  { id: 'tektur', family: 'Tektur', source: 'fontsource', package: '@fontsource-variable/tektur', role: ['security', 'ogg', 'technical'], turkish: true, redistributable: true, loaded: true },
  { id: 'chakra-petch', family: 'Chakra Petch', source: 'fontsource', package: '@fontsource/chakra-petch', role: ['tools', 'ui-alt', 'technical'], turkish: true, redistributable: true, loaded: true },
  { id: 'saira-condensed', family: 'Saira Condensed', source: 'fontsource', package: '@fontsource/saira-condensed', role: ['experience', 'resume', 'condensed'], turkish: true, redistributable: true, loaded: true },
  { id: 'audiowide', family: 'Audiowide', source: 'fontsource', package: '@fontsource/audiowide', role: ['music', 'display', 'retro-tech'], turkish: true, redistributable: true, loaded: true },
  { id: 'black-ops-one', family: 'Black Ops One', source: 'fontsource', package: '@fontsource/black-ops-one', role: ['display', 'security', 'industrial'], turkish: true, redistributable: true, loaded: true },
  { id: 'saira-stencil-one', family: 'Saira Stencil One', source: 'fontsource', package: '@fontsource/saira-stencil-one', role: ['display', 'security', 'industrial'], turkish: true, redistributable: true, loaded: true },
  { id: 'russo-one', family: 'Russo One', source: 'fontsource', package: '@fontsource/russo-one', role: ['display', 'game', 'retro-tech'], turkish: true, redistributable: true, loaded: true },
  { id: 'bungee-inline', family: 'Bungee Inline', source: 'fontsource', package: '@fontsource/bungee-inline', role: ['display', 'game', 'playful'], turkish: true, redistributable: true, loaded: true },
  { id: 'michroma', family: 'Michroma', source: 'fontsource', package: '@fontsource/michroma', role: ['display', 'scifi'], turkish: true, redistributable: true, loaded: true },
  { id: 'bruno-ace', family: 'Bruno Ace', source: 'fontsource', package: '@fontsource/bruno-ace', role: ['display', 'scifi', 'cult'], turkish: true, redistributable: true, loaded: true },
  { id: 'rajdhani', family: 'Rajdhani', source: 'fontsource', package: '@fontsource/rajdhani', role: ['display', 'condensed', 'metadata'], turkish: true, redistributable: true, loaded: true },
  { id: 'stint-ultra-expanded', family: 'Stint Ultra Expanded', source: 'fontsource', package: '@fontsource/stint-ultra-expanded', role: ['display', 'editorial', 'weird'], turkish: true, redistributable: true, loaded: true },
  {
    id: 'typo-angular-rounded-demo',
    family: 'Typo Angular Rounded Demo',
    source: 'external-reference',
    sourceUrl: 'https://www.cdnfonts.com/tr/typo-angular-rounded-demo.font',
    role: ['display', 'rounded-tech', 'cult'],
    turkish: true,
    redistributable: false,
    loaded: false,
    note: 'Demo license is personal-use only. Do not ship on the public portfolio until a suitable web/commercial license is obtained.',
  },
]

export const rejectedFontCandidates = [
  { family: 'Snowstorm', reason: 'Missing full Turkish set: Ğ/ğ, İ and Ş/ş.' },
  { family: 'Poultrygeist', reason: 'Basic Latin only; missing full Turkish set.' },
  { family: 'LTZapfino One', reason: 'Missing Ğ/ğ, İ and Ş/ş.' },
  { family: 'SF Electrotome', reason: 'Basic Latin-focused set; missing full Turkish set.' },
]
