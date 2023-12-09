import { SPRITE } from './sprites';

interface IControlBtnSprite {
  idle: string;
  active: string;
  disabled: string;
}

export interface IBattleControlBtn {
  width: number;
  height: number;
  x: number;
  y: number;

  disabled: boolean;
  sprite: IControlBtnSprite;
}

export interface IBattleControlGroup {
  width: number;
  height: number;
  x: number;
  y: number;
}

const defaultControlSettings = { width: 60, height: 47 };
export const battleControlBtns = (panelWidth: number): Array<IBattleControlBtn> => [
  {
    ...defaultControlSettings,
    x: 0,
    y: 0,

    sprite: {
      idle: SPRITE.settings_btn,
      active: SPRITE.settings_btn_active,
      disabled: SPRITE.settings_btn_disabled,
    },
    disabled: false,
  },
  {
    ...defaultControlSettings,
    x: defaultControlSettings.width,
    y: 0,

    sprite: {
      idle: SPRITE.surrender_btn,
      active: SPRITE.surrender_btn_active,
      disabled: SPRITE.surrender_btn_disabled,
    },
    disabled: false,
  },
  {
    ...defaultControlSettings,
    x: defaultControlSettings.width * 2,
    y: 0,

    sprite: {
      idle: SPRITE.flee_btn,
      active: SPRITE.flee_btn_active,
      disabled: SPRITE.flee_btn_disabled,
    },
    disabled: false,
  },
  {
    ...defaultControlSettings,
    x: defaultControlSettings.width * 3,
    y: 0,

    sprite: {
      idle: SPRITE.magic_btn,
      active: SPRITE.magic_btn_active,
      disabled: SPRITE.magic_btn_disabled,
    },
    disabled: false,
  },

  {
    ...defaultControlSettings,
    x: panelWidth - defaultControlSettings.width,
    y: 0,

    sprite: {
      idle: SPRITE.shield_btn,
      active: SPRITE.shield_btn_active,
      disabled: SPRITE.shield_btn_disabled,
    },
    disabled: false,
  },
  {
    ...defaultControlSettings,
    x: panelWidth - defaultControlSettings.width * 2,
    y: 0,

    sprite: {
      idle: SPRITE.pass_btn,
      active: SPRITE.pass_btn_active,
      disabled: SPRITE.pass_btn_disabled,
    },
    disabled: false,
  },
  {
    ...defaultControlSettings,
    x: panelWidth - defaultControlSettings.width * 3,
    y: 0,

    sprite: {
      idle: SPRITE.auto_btn,
      active: SPRITE.auto_btn_active,
      disabled: SPRITE.auto_btn_disabled,
    },
    disabled: true,
  },
];

export const infoPanel = (panelWidth: number): IBattleControlGroup => {
  return {
    x: defaultControlSettings.width * 4,
    y: 2,
    width: panelWidth - defaultControlSettings.width * 7,
    height: defaultControlSettings.height - 2,
  };
};

export const battleControlGroups = (panelWidth: number): Array<IBattleControlGroup> => [
  {
    x: 0,
    y: 0,
    width: defaultControlSettings.width * 4,
    height: defaultControlSettings.height,
  },
  {
    x: panelWidth - defaultControlSettings.width * 3,
    y: 0,
    width: defaultControlSettings.width * 3,
    height: defaultControlSettings.height,
  },
];
