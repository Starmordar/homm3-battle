import { StaticTextureMap, TEXTURES } from './types';
import config from '@/config';

export const staticTextures: StaticTextureMap = {
  [TEXTURES.surrender_btn]: {
    url: `${config.assetsPath}/ui/cr-controls/surrender.png`,
    width: 90,
    height: 72,
  },
  [TEXTURES.surrender_btn_active]: {
    url: `${config.assetsPath}/ui/cr-controls/surrender-active.png`,
    width: 90,
    height: 72,
  },
  [TEXTURES.surrender_btn_disabled]: {
    url: `${config.assetsPath}/ui/cr-controls/surrender-disabled.png`,
    width: 90,
    height: 72,
  },

  [TEXTURES.auto_btn]: {
    url: `${config.assetsPath}/ui/controls/auto.png`,
    width: 90,
    height: 72,
  },
  [TEXTURES.auto_btn_active]: {
    url: `${config.assetsPath}/ui/controls/auto-active.png`,
    width: 90,
    height: 72,
  },
  [TEXTURES.auto_btn_disabled]: {
    url: `${config.assetsPath}/ui/controls/auto-disabled.png`,
    width: 90,
    height: 72,
  },

  [TEXTURES.flee_btn]: {
    url: `${config.assetsPath}/ui/controls/flee.png`,
    width: 90,
    height: 72,
  },
  [TEXTURES.flee_btn_active]: {
    url: `${config.assetsPath}/ui/controls/flee-active.png`,
    width: 90,
    height: 72,
  },
  [TEXTURES.flee_btn_disabled]: {
    url: `${config.assetsPath}/ui/controls/flee-disabled.png`,
    width: 90,
    height: 72,
  },

  [TEXTURES.magic_btn]: {
    url: `${config.assetsPath}/ui/controls/magic.png`,
    width: 90,
    height: 72,
  },
  [TEXTURES.magic_btn_active]: {
    url: `${config.assetsPath}/ui/controls/magic-active.png`,
    width: 90,
    height: 72,
  },
  [TEXTURES.magic_btn_disabled]: {
    url: `${config.assetsPath}/ui/controls/magic-disabled.png`,
    width: 90,
    height: 72,
  },

  [TEXTURES.pass_btn]: {
    url: `${config.assetsPath}/ui/controls/pass.png`,
    width: 90,
    height: 72,
  },
  [TEXTURES.pass_btn_active]: {
    url: `${config.assetsPath}/ui/controls/pass-active.png`,
    width: 90,
    height: 72,
  },
  [TEXTURES.pass_btn_disabled]: {
    url: `${config.assetsPath}/ui/controls/pass-disabled.png`,
    width: 90,
    height: 72,
  },

  [TEXTURES.settings_btn]: {
    url: `${config.assetsPath}/ui/controls/settings.png`,
    width: 90,
    height: 72,
  },
  [TEXTURES.settings_btn_active]: {
    url: `${config.assetsPath}/ui/controls/settings-active.png`,
    width: 90,
    height: 72,
  },
  [TEXTURES.settings_btn_disabled]: {
    url: `${config.assetsPath}/ui/controls/settings-disabled.png`,
    width: 90,
    height: 72,
  },

  [TEXTURES.shield_btn]: {
    url: `${config.assetsPath}/ui/controls/shield.png`,
    width: 90,
    height: 72,
  },
  [TEXTURES.shield_btn_active]: {
    url: `${config.assetsPath}/ui/controls/shield-active.png`,
    width: 90,
    height: 72,
  },
  [TEXTURES.shield_btn_disabled]: {
    url: `${config.assetsPath}/ui/controls/shield-disabled.png`,
    width: 90,
    height: 72,
  },

  [TEXTURES.battle_controls]: {
    url: `${config.assetsPath}/battle-controls.png`,
    width: 1281,
    height: 645,
  },
  [TEXTURES.hero_avatar_sm]: {
    url: `${config.assetsPath}/portraits/heroes/sm.png`,
    width: 32,
    height: 32,
  },
  [TEXTURES.hero_avatar_lg]: {
    url: `${config.assetsPath}/portraits/heroes/lg.png`,
    width: 58,
    height: 64,
  },

  [TEXTURES.corner_gems]: {
    url: `${config.assetsPath}/ui/cornergems.png`,
    width: 46,
    height: 45,
  },
  [TEXTURES.panel_bg]: {
    url: `${config.assetsPath}/ui/panelbg.jpg`,
    width: 80,
    height: 200,
  },
  [TEXTURES.edge_pattern]: {
    url: `${config.assetsPath}/edge_pattern.png`,
    width: 128,
    height: 128,
  },
  // [TEXTURES.battlefield_bg]: {
  //   url: `${config.assetsPath}/battlefields/CMBKBOAT.png`,
  //   width: 875,
  //   height: 630,
  // },

  [TEXTURES.wraith_static]: {
    url: `${config.assetsPath}/wraith/static.png`,
    width: 110,
    height: 120,
  },

  [TEXTURES.necropolis_monster_bg]: {
    url: `${config.assetsPath}/necropolis.png`,
    width: 250,
    height: 324,
  },

  // WINDOWS
  [TEXTURES.monster_window]: {
    url: `${config.assetsPath}/ui/popup.png`,
    width: 298,
    height: 311,
  },
};

export const battleFieldSprite = {
  key: TEXTURES.battlefield_bg,
  url: (filename: string) => `${config.assetsPath}/battlefields/${filename}`,
  width: 875,
  height: 630,
};
