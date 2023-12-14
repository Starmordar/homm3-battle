export interface SpriteOptions {
  url: string;
  width: number;
  height: number;

  animations?: SpriteAnimation;
}

export interface SpriteAnimation {
  idle: Array<number>;
  active?: Array<number>;
  attack?: Array<number>;
}

export interface AnimatedSpriteOptions extends SpriteOptions {
  animations: SpriteAnimation;
}

export enum SPRITE {
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

  heroes_animation = 'heroes_animation',
  heroes_animation_mirror = 'heroes_animation_mirror',

  heroes_undead = 'heroes_undead',
  heroes_undead_mirror = 'heroes_undead_mirror',

  wraith = 'wraith',
}

export const animatedSprites = {
  [SPRITE.wraith]: {
    url: '/src/assets/wraith/standing.png',
    width: 62,
    height: 106,
    animations: {
      idle: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 1, 1],
    },
  },

  [SPRITE.heroes_animation]: {
    url: '/src/assets/heroes/hero-sprites.png',
    width: 150,
    height: 175,
    animations: {
      idle: [0, 1, 2, 3, 2, 1],
      active: [0, 1, 2, 3, 8, 9, 10, 11, 11, 10, 9, 8],
    },
  },

  [SPRITE.heroes_animation_mirror]: {
    url: '/src/assets/heroes/hero-sprites-mirror.png',
    width: 150,
    height: 175,
    animations: {
      idle: [19, 18, 17, 16, 17, 18],
      active: [19, 18, 17, 16, 11, 10, 9, 8, 8, 9, 10, 11],
    },
  },
};

export const uiSprites = {
  [SPRITE.surrender_btn]: {
    url: '/src/assets/ui/cr-controls/surrender.png',
    width: 90,
    height: 72,
  },
  [SPRITE.surrender_btn_active]: {
    url: '/src/assets/ui/cr-controls/surrender-active.png',
    width: 90,
    height: 72,
  },
  [SPRITE.surrender_btn_disabled]: {
    url: '/src/assets/ui/cr-controls/surrender-disabled.png',
    width: 90,
    height: 72,
  },

  [SPRITE.auto_btn]: {
    url: '/src/assets/ui/controls/auto.png',
    width: 90,
    height: 72,
  },
  [SPRITE.auto_btn_active]: {
    url: '/src/assets/ui/controls/auto-active.png',
    width: 90,
    height: 72,
  },
  [SPRITE.auto_btn_disabled]: {
    url: '/src/assets/ui/controls/auto-disabled.png',
    width: 90,
    height: 72,
  },

  [SPRITE.flee_btn]: {
    url: '/src/assets/ui/controls/flee.png',
    width: 90,
    height: 72,
  },
  [SPRITE.flee_btn_active]: {
    url: '/src/assets/ui/controls/flee-active.png',
    width: 90,
    height: 72,
  },
  [SPRITE.flee_btn_disabled]: {
    url: '/src/assets/ui/controls/flee-disabled.png',
    width: 90,
    height: 72,
  },

  [SPRITE.magic_btn]: {
    url: '/src/assets/ui/controls/magic.png',
    width: 90,
    height: 72,
  },
  [SPRITE.magic_btn_active]: {
    url: '/src/assets/ui/controls/magic-active.png',
    width: 90,
    height: 72,
  },
  [SPRITE.magic_btn_disabled]: {
    url: '/src/assets/ui/controls/magic-disabled.png',
    width: 90,
    height: 72,
  },

  [SPRITE.pass_btn]: {
    url: '/src/assets/ui/controls/pass.png',
    width: 90,
    height: 72,
  },
  [SPRITE.pass_btn_active]: {
    url: '/src/assets/ui/controls/pass-active.png',
    width: 90,
    height: 72,
  },
  [SPRITE.pass_btn_disabled]: {
    url: '/src/assets/ui/controls/pass-disabled.png',
    width: 90,
    height: 72,
  },

  [SPRITE.settings_btn]: {
    url: '/src/assets/ui/controls/settings.png',
    width: 90,
    height: 72,
  },
  [SPRITE.settings_btn_active]: {
    url: '/src/assets/ui/controls/settings-active.png',
    width: 90,
    height: 72,
  },
  [SPRITE.settings_btn_disabled]: {
    url: '/src/assets/ui/controls/settings-disabled.png',
    width: 90,
    height: 72,
  },

  [SPRITE.shield_btn]: {
    url: '/src/assets/ui/controls/shield.png',
    width: 90,
    height: 72,
  },
  [SPRITE.shield_btn_active]: {
    url: '/src/assets/ui/controls/shield-active.png',
    width: 90,
    height: 72,
  },
  [SPRITE.shield_btn_disabled]: {
    url: '/src/assets/ui/controls/shield-disabled.png',
    width: 90,
    height: 72,
  },

  // Other UI Elements

  [SPRITE.battle_controls]: {
    url: '/src/assets/battle-controls.png',
    width: 1281,
    height: 645,
  },
  [SPRITE.hero_avatar_sm]: {
    url: '/src/assets/portraits/heroes/sm.png',
    width: 32,
    height: 32,
  },
  [SPRITE.hero_avatar_lg]: {
    url: '/src/assets/portraits/heroes/lg.png',
    width: 58,
    height: 64,
  },

  [SPRITE.corner_gems]: {
    url: '/src/assets/ui/cornergems.png',
    width: 46,
    height: 45,
  },
  [SPRITE.panel_bg]: {
    url: '/src/assets/ui/panelbg.jpg',
    width: 80,
    height: 200,
  },
  [SPRITE.edge_pattern]: {
    url: 'src/assets/edge_pattern.png',
    width: 128,
    height: 128,
  },
  [SPRITE.battle_bg_01]: {
    url: 'src/assets/battlefields/1_0.jpg',
    width: 800,
    height: 556,
  },
};
