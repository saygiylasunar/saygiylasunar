export const TURKISH_FONT_TEST = 'Pijamalı hasta yağız şoföre çabucak güvendi. İĞÜŞÇÖ ığüşçö'

export const fontCatalog = [
  { id: 'oxanium', family: 'Oxanium', source: 'fontsource', package: '@fontsource/oxanium', role: ['ui', 'heading', 'technical'], turkish: true, redistributable: true },
  { id: 'jura', family: 'Jura', source: 'fontsource', package: '@fontsource/jura', role: ['ui', 'metadata', 'technical'], turkish: true, redistributable: true },
  { id: 'tektur', family: 'Tektur', source: 'fontsource', package: '@fontsource/tektur', role: ['heading', 'technical', 'security'], turkish: true, redistributable: true },
  { id: 'chakra-petch', family: 'Chakra Petch', source: 'fontsource', package: '@fontsource/chakra-petch', role: ['ui', 'heading', 'technical'], turkish: true, redistributable: true },
  { id: 'rajdhani', family: 'Rajdhani', source: 'fontsource', package: '@fontsource/rajdhani', role: ['ui', 'condensed', 'metadata'], turkish: true, redistributable: true },
  { id: 'michroma', family: 'Michroma', source: 'fontsource', package: '@fontsource/michroma', role: ['display', 'scifi'], turkish: true, redistributable: true },
  { id: 'bruno-ace', family: 'Bruno Ace', source: 'fontsource', package: '@fontsource/bruno-ace', role: ['display', 'scifi', 'cult'], turkish: true, redistributable: true },
  { id: 'audiowide', family: 'Audiowide', source: 'fontsource', package: '@fontsource/audiowide', role: ['display', 'music', 'retro-tech'], turkish: true, redistributable: true },
  { id: 'black-ops-one', family: 'Black Ops One', source: 'fontsource', package: '@fontsource/black-ops-one', role: ['display', 'security', 'industrial'], turkish: true, redistributable: true },
  { id: 'saira-stencil-one', family: 'Saira Stencil One', source: 'fontsource', package: '@fontsource/saira-stencil-one', role: ['display', 'security', 'industrial'], turkish: true, redistributable: true },
  { id: 'russo-one', family: 'Russo One', source: 'fontsource', package: '@fontsource/russo-one', role: ['display', 'game', 'retro-tech'], turkish: true, redistributable: true },
  { id: 'bungee-inline', family: 'Bungee Inline', source: 'fontsource', package: '@fontsource/bungee-inline', role: ['display', 'game', 'playful'], turkish: true, redistributable: true },
  { id: 'saira-condensed', family: 'Saira Condensed', source: 'fontsource', package: '@fontsource/saira-condensed', role: ['ui', 'condensed', 'metadata'], turkish: true, redistributable: true },
  { id: 'stint-ultra-expanded', family: 'Stint Ultra Expanded', source: 'fontsource', package: '@fontsource/stint-ultra-expanded', role: ['display', 'editorial', 'weird'], turkish: true, redistributable: true },
  {
    id: 'typo-angular-rounded-demo',
    family: 'Typo Angular Rounded Demo',
    source: 'external-reference',
    sourceUrl: 'https://www.cdnfonts.com/tr/typo-angular-rounded-demo.font',
    role: ['display', 'rounded-tech', 'cult'],
    turkish: true,
    redistributable: false,
    note: 'Demo license is personal-use only. Do not ship on the public portfolio until a suitable web/commercial license is obtained.',
  },
]

export const rejectedFontCandidates = [
  { family: 'Snowstorm', reason: 'Missing full Turkish set: Ğ/ğ, İ and Ş/ş.' },
  { family: 'Poultrygeist', reason: 'Basic Latin only; missing full Turkish set.' },
  { family: 'LTZapfino One', reason: 'Missing Ğ/ğ, İ and Ş/ş.' },
  { family: 'SF Electrotome', reason: 'Basic Latin-focused set; missing full Turkish set.' },
]
