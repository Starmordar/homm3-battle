import { StaticTextureMap, TEXTURES } from './types';

export const staticTextures: StaticTextureMap = {
  [TEXTURES.surrender_btn]: {
    url: '/src/assets/ui/cr-controls/surrender.png',
    width: 90,
    height: 72,
  },
  [TEXTURES.surrender_btn_active]: {
    url: '/src/assets/ui/cr-controls/surrender-active.png',
    width: 90,
    height: 72,
  },
  [TEXTURES.surrender_btn_disabled]: {
    url: '/src/assets/ui/cr-controls/surrender-disabled.png',
    width: 90,
    height: 72,
  },

  [TEXTURES.auto_btn]: {
    url: '/src/assets/ui/controls/auto.png',
    width: 90,
    height: 72,
  },
  [TEXTURES.auto_btn_active]: {
    url: '/src/assets/ui/controls/auto-active.png',
    width: 90,
    height: 72,
  },
  [TEXTURES.auto_btn_disabled]: {
    url: '/src/assets/ui/controls/auto-disabled.png',
    width: 90,
    height: 72,
  },

  [TEXTURES.flee_btn]: {
    url: '/src/assets/ui/controls/flee.png',
    width: 90,
    height: 72,
  },
  [TEXTURES.flee_btn_active]: {
    url: '/src/assets/ui/controls/flee-active.png',
    width: 90,
    height: 72,
  },
  [TEXTURES.flee_btn_disabled]: {
    url: '/src/assets/ui/controls/flee-disabled.png',
    width: 90,
    height: 72,
  },

  [TEXTURES.magic_btn]: {
    url: '/src/assets/ui/controls/magic.png',
    width: 90,
    height: 72,
  },
  [TEXTURES.magic_btn_active]: {
    url: '/src/assets/ui/controls/magic-active.png',
    width: 90,
    height: 72,
  },
  [TEXTURES.magic_btn_disabled]: {
    url: '/src/assets/ui/controls/magic-disabled.png',
    width: 90,
    height: 72,
  },

  [TEXTURES.pass_btn]: {
    url: '/src/assets/ui/controls/pass.png',
    width: 90,
    height: 72,
  },
  [TEXTURES.pass_btn_active]: {
    url: '/src/assets/ui/controls/pass-active.png',
    width: 90,
    height: 72,
  },
  [TEXTURES.pass_btn_disabled]: {
    url: '/src/assets/ui/controls/pass-disabled.png',
    width: 90,
    height: 72,
  },

  [TEXTURES.settings_btn]: {
    url: '/src/assets/ui/controls/settings.png',
    width: 90,
    height: 72,
  },
  [TEXTURES.settings_btn_active]: {
    url: '/src/assets/ui/controls/settings-active.png',
    width: 90,
    height: 72,
  },
  [TEXTURES.settings_btn_disabled]: {
    url: '/src/assets/ui/controls/settings-disabled.png',
    width: 90,
    height: 72,
  },

  [TEXTURES.shield_btn]: {
    url: '/src/assets/ui/controls/shield.png',
    width: 90,
    height: 72,
  },
  [TEXTURES.shield_btn_active]: {
    url: '/src/assets/ui/controls/shield-active.png',
    width: 90,
    height: 72,
  },
  [TEXTURES.shield_btn_disabled]: {
    url: '/src/assets/ui/controls/shield-disabled.png',
    width: 90,
    height: 72,
  },

  [TEXTURES.battle_controls]: {
    url: '/src/assets/battle-controls.png',
    width: 1281,
    height: 645,
  },
  [TEXTURES.hero_avatar_sm]: {
    url: '/src/assets/portraits/heroes/sm.png',
    width: 32,
    height: 32,
  },
  [TEXTURES.hero_avatar_lg]: {
    url: '/src/assets/portraits/heroes/lg.png',
    width: 58,
    height: 64,
  },

  [TEXTURES.corner_gems]: {
    url: '/src/assets/ui/cornergems.png',
    width: 46,
    height: 45,
  },
  [TEXTURES.panel_bg]: {
    url: '/src/assets/ui/panelbg.jpg',
    width: 80,
    height: 200,
  },
  [TEXTURES.edge_pattern]: {
    url: 'src/assets/edge_pattern.png',
    width: 128,
    height: 128,
  },
  // [TEXTURES.battlefield_bg]: {
  //   url: 'src/assets/battlefields/CMBKBOAT.png',
  //   width: 875,
  //   height: 630,
  // },

  [TEXTURES.wraith_static]: {
    url: '/src/assets/wraith/static.png',
    width: 110,
    height: 120,
  },

  [TEXTURES.necropolis_monster_bg]: {
    url: '/src/assets/necropolis.png',
    width: 250,
    height: 324,
  },

  // WINDOWS
  [TEXTURES.monster_window]: {
    url: '/src/assets/ui/popup.png',
    width: 298,
    height: 311,
  },
};

export const battleFieldSprite = {
  key: TEXTURES.battlefield_bg,
  url: (filename: string) => `/src/assets/battlefields/${filename}`,
  width: 875,
  height: 630,
};
