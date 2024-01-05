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
  x: Array<number>;
}

export interface Texture<T extends string> extends StaticTexture {
  textures: Record<T, Frame>;
}

export type TextureMap<T extends string> = Partial<Record<TEXTURES, Texture<T>>>;
export type TextureFrames<T extends string> = Record<TEXTURES, Texture<T>['textures']>;

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
  battle_bg_01 = 'battle_bg_01',

  battlefield_bg = 'battlefield_bg',
  monster_window = 'monster_window',

  necropolis_monster_bg = 'necropolis_monster_bg',
  wraith_static = 'wraith_static',

  // ANIMATED TEXTURES
  hero = 'hero',
  hero_mirror = 'hero_mirror',

  wraith = 'wraith',
  wraith_mirror = 'wraith_mirror',
}
