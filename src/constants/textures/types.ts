export enum TEXTURE_TYPE {
  static = 'static',
  monster = 'monster',
  hero = 'hero',
}

export interface StaticTexture {
  url: string;
  width: number;
  height: number;
}
export type StaticTextureMap = Partial<Record<TEXTURES, StaticTexture>>;

export interface Frame {
  y: number;
  x: Array<number> | null;
}

export interface Texture<T extends string> extends StaticTexture {
  textures: Record<T, Frame>;
}

export type TextureMap<T extends string> = Partial<Record<TEXTURES, Texture<T>>>;
export type TextureFrames<T extends string> = Record<TEXTURES, Texture<T>['textures']>;

export interface TextureOverrides {
  width: number;
  height: number;

  top: number;
  left: number;
  right: (width: number) => number;
}

export enum TEXTURES {
  // STATIC TEXTURES
  surrender_btn = 'surrender_btn',
  surrender_btn_active = 'surrender_btn_active',
  surrender_btn_disabled = 'surrender_btn_disabled',

  auto_btn = 'auto_btn',
  auto_btn_active = 'auto_btn_active',
  auto_btn_disabled = 'auto_btn_disabled',

  flee_btn = 'flee_btn',
  flee_btn_active = 'flee_btn_active',
  flee_btn_disabled = 'flee_btn_disabled',

  pass_btn = 'pass_btn',
  pass_btn_active = 'pass_btn_active',
  pass_btn_disabled = 'pass_btn_disabled',

  settings_btn = 'settings_btn',
  settings_btn_active = 'settings_btn_active',
  settings_btn_disabled = 'settings_btn_disabled',

  shield_btn = 'shield_btn',
  shield_btn_active = 'shield_btn_active',
  shield_btn_disabled = 'shield_btn_disabled',

  magic_btn = 'magic_btn',
  magic_btn_active = 'magic_btn_active',
  magic_btn_disabled = 'magic_btn_disabled',

  hero_avatar_sm = 'hero_avatar_sm',
  hero_avatar_lg = 'hero_avatar_lg',

  battle_controls = 'battle_controls',
  corner_gems = 'corner_gems',
  edge_pattern = 'edge_pattern',
  panel_bg = 'panel_bg',

  battlefield_bg = 'battlefield_bg',
  monster_window = 'monster_window',

  necropolis_monster_bg = 'necropolis_monster_bg',
  wraith_static = 'wraith_static',

  // ANIMATED TEXTURES
  hero = 'hero',
  hero_mirror = 'hero_mirror',

  wraith = 'wraith',
  wraith_mirror = 'wraith_mirror',

  // Castle
  'CPKMAN' = 'CPKMAN',
  'CHALBD' = 'CHALBD',
  'CLCBOW' = 'CLCBOW',
  'CHCBOW' = 'CHCBOW',
  'CGRIFF' = 'CGRIFF',
  'CRGRIF' = 'CRGRIF',
  'CSWORD' = 'CSWORD',
  'CCRUSD' = 'CCRUSD',
  'CMONKK' = 'CMONKK',
  'CZEALT' = 'CZEALT',
  'CCAVLR' = 'CCAVLR',
  'CCHAMP' = 'CCHAMP',
  'CANGEL' = 'CANGEL',
  'CRANGL' = 'CRANGL',

  // Dungeon
  'CTROGL' = 'CTROGL',
  'CITROG' = 'CITROG',
  'CHARPY' = 'CHARPY',
  'CHARPH' = 'CHARPH',
  'CBEHOL' = 'CBEHOL',
  'CEVEYE' = 'CEVEYE',
  'CMEDUS' = 'CMEDUS',
  'CMEDUQ' = 'CMEDUQ',
  'CMINOT' = 'CMINOT',
  'CMINOK' = 'CMINOK',
  'CMCORE' = 'CMCORE',
  'CCMCOR' = 'CCMCOR',
  'CRDRGN' = 'CRDRGN',
  'CBDRGN' = 'CBDRGN',

  // Fortress
  'CGNOLL' = 'CGNOLL',
  'CGNOLM' = 'CGNOLM',
  'CPLIZA' = 'CPLIZA',
  'CALIZA' = 'CALIZA',
  'CCGORG' = 'CCGORG',
  'CBGOG' = 'CBGOG',
  'CDRFLY' = 'CDRFLY',
  'CDRFIR' = 'CDRFIR',
  'CBASIL' = 'CBASIL',
  'CGBASI' = 'CGBASI',
  'CWYVER' = 'CWYVER',
  'CWYVMN' = 'CWYVMN',
  'CHYDRA' = 'CHYDRA',
  'CCHYDR' = 'CCHYDR',

  // Inferno
  'CIMP' = 'CIMP',
  'CFAMIL' = 'CFAMIL',
  'CGOG' = 'CGOG',
  'CMAGOG' = 'CMAGOG',
  'CHHOUN' = 'CHHOUN',
  'CCERBU' = 'CCERBU',
  'COHDEM' = 'COHDEM',
  'CTHDEM' = 'CTHDEM',
  'CPFIEN' = 'CPFIEN',
  'CPFOE' = 'CPFOE',
  'CEFREE' = 'CEFREE',
  'CEFRES' = 'CEFRES',
  'CDEVIL' = 'CDEVIL',
  'CADEVL' = 'CADEVL',

  // Necropolis
  'CSKELE' = 'CSKELE',
  'CWSKEL' = 'CWSKEL',
  'CZOMBI' = 'CZOMBI',
  'CZOMLO' = 'CZOMLO',
  'CWIGHT' = 'CWIGHT',
  'CWRAIT' = 'CWRAIT',
  'CVAMP' = 'CVAMP',
  'CNOSFE' = 'CNOSFE',
  'CLICH' = 'CLICH',
  'CPLICH' = 'CPLICH',
  'CBKNIG' = 'CBKNIG',
  'CBLORD' = 'CBLORD',
  'CNDRGN' = 'CNDRGN',
  'CHDRGN' = 'CHDRGN',

  // Rampart
  'CCENTR' = 'CCENTR',
  'CECENT' = 'CECENT',
  'CDWARF' = 'CDWARF',
  'CBDWAR' = 'CBDWAR',
  'CELF' = 'CELF',
  'CGRELF' = 'CGRELF',
  'CPEGAS' = 'CPEGAS',
  'CAPEGS' = 'CAPEGS',
  'CTREE' = 'CTREE',
  'CBTREE' = 'CBTREE',
  'CUNICO' = 'CUNICO',
  'CWUNIC' = 'CWUNIC',
  'CGDRAG' = 'CGDRAG',
  'CDDRAG' = 'CDDRAG',

  // Stronghold
  'CGOBLI' = 'CGOBLI',
  'CHGOBL' = 'CHGOBL',
  'CBWLFR' = 'CBWLFR',
  'CUWLFR' = 'CUWLFR',
  'CORC' = 'CORC',
  'CORCCH' = 'CORCCH',
  'COGRE' = 'COGRE',
  'COGMAG' = 'COGMAG',
  'CROC' = 'CROC',
  'CTBIRD' = 'CTBIRD',
  'CCYCLR' = 'CCYCLR',
  'CCYCLLOR' = 'CCYCLLOR',
  'CYBEHE' = 'CYBEHE',
  'CABEHE' = 'CABEHE',

  // Tower
  'CGREMA' = 'CGREMA',
  'CGREMM' = 'CGREMM',
  'CGARGO' = 'CGARGO',
  'COGARG' = 'COGARG',
  'CSGOLE' = 'CSGOLE',
  'CIGOLE' = 'CIGOLE',
  'CMAGE' = 'CMAGE',
  'CAMAGE' = 'CAMAGE',
  'CGENIE' = 'CGENIE',
  'CSULTA' = 'CSULTA',
  'CNAGA' = 'CNAGA',
  'CNAGAG' = 'CNAGAG',
  'CLTITA' = 'CLTITA',
  'CGTITA' = 'CGTITA',

  // Conflux
  'CAELEM' = 'CAELEM',
  'CEELEM' = 'CEELEM',
  'CFELEM' = 'CFELEM',
  'CWELEM' = 'CWELEM',
  'CPIXIE' = 'CPIXIE',
  'CSPRITE' = 'CSPRITE',
  'CPSYEL' = 'CPSYEL',
  'CMAGEL' = 'CMAGEL',
  'CICEE' = 'CICEE',
  'CSTONE' = 'CSTONE',
  'CSTORM' = 'CSTORM',
  'CNRG' = 'CNRG',
  'CFBIRD' = 'CFBIRD',
  'CPHX' = 'CPHX',

  // Neutral
  'CGGOLE' = 'CGGOLE',
  'CDGOLE' = 'CDGOLE',
  'CADRGN' = 'CADRGN',
  'CCDRGN' = 'CCDRGN',
  'CFDRGN' = 'CFDRGN',
  'CRSDGN' = 'CRSDGN',
  'Cench' = 'Cench',
  'CSHARP' = 'CSHARP',
  'CHALF' = 'CHALF',
  'CPEAS' = 'CPEAS',
  'CBOAR' = 'CBOAR',
  'CMUMMY' = 'CMUMMY',
  'CNOMAD' = 'CNOMAD',
  'CROGUE' = 'CROGUE',
  'CTROLL' = 'CTROLL',
}
