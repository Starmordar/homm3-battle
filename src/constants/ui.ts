import { EventKey } from '@/controllers/EventBus';
import { SPRITE } from './sprites';
import { Rect } from '@/types';

interface BattleControlSprites {
  idle: string;
  active: string;
  disabled: string;
}

export interface ControlButtonOptions extends Rect {
  disabled: boolean;
  sprites: BattleControlSprites;
  event: string;
}

export interface ConsoleOptions extends Rect {
  sprite: string;
}

export const battlePanelHeight = 47;

const defaultControlSettings = { width: 60, height: battlePanelHeight };
export const battleControlsOptions = (panelWidth: number): Array<ControlButtonOptions> => [
  {
    ...defaultControlSettings,
    x: 0,
    y: 0,

    sprites: {
      idle: SPRITE.settings_btn,
      active: SPRITE.settings_btn_active,
      disabled: SPRITE.settings_btn_disabled,
    },
    disabled: true,
    event: EventKey.unitWait,
  },
  {
    ...defaultControlSettings,
    x: defaultControlSettings.width,
    y: 0,

    sprites: {
      idle: SPRITE.surrender_btn,
      active: SPRITE.surrender_btn_active,
      disabled: SPRITE.surrender_btn_disabled,
    },
    disabled: true,
    event: EventKey.unitWait,
  },
  {
    ...defaultControlSettings,
    x: defaultControlSettings.width * 2,
    y: 0,

    sprites: {
      idle: SPRITE.flee_btn,
      active: SPRITE.flee_btn_active,
      disabled: SPRITE.flee_btn_disabled,
    },
    disabled: true,
    event: EventKey.unitWait,
  },
  {
    ...defaultControlSettings,
    x: defaultControlSettings.width * 3,
    y: 0,

    sprites: {
      idle: SPRITE.magic_btn,
      active: SPRITE.magic_btn_active,
      disabled: SPRITE.magic_btn_disabled,
    },
    disabled: true,
    event: EventKey.unitWait,
  },

  {
    ...defaultControlSettings,
    x: panelWidth - defaultControlSettings.width,
    y: 0,

    sprites: {
      idle: SPRITE.shield_btn,
      active: SPRITE.shield_btn_active,
      disabled: SPRITE.shield_btn_disabled,
    },
    disabled: true,
    event: EventKey.unitWait,
  },
  {
    ...defaultControlSettings,
    x: panelWidth - defaultControlSettings.width * 2,
    y: 0,

    sprites: {
      idle: SPRITE.pass_btn,
      active: SPRITE.pass_btn_active,
      disabled: SPRITE.pass_btn_disabled,
    },
    disabled: false,
    event: EventKey.unitWait,
  },
  {
    ...defaultControlSettings,
    x: panelWidth - defaultControlSettings.width * 3,
    y: 0,

    sprites: {
      idle: SPRITE.auto_btn,
      active: SPRITE.auto_btn_active,
      disabled: SPRITE.auto_btn_disabled,
    },
    disabled: true,
    event: EventKey.unitWait,
  },
];

export const battleConsoleOptions = (panelWidth: number): ConsoleOptions => {
  return {
    x: defaultControlSettings.width * 4,
    y: 0,
    width: panelWidth - defaultControlSettings.width * 7,
    height: defaultControlSettings.height,
    sprite: SPRITE.panel_bg,
  };
};

// Hero Summary Section

export interface SummaryConfig {
  width: number;
  height: number;
  x: number;
  y: number;
}

export const summaryWidth = 90;

export const defaultSummaryOptions = {
  avatar: {
    x: 0,
    y: 0,
    width: summaryWidth,
    height: 100,
  },
  statistic: {
    x: 0,
    y: 100,
    width: summaryWidth,
    height: 75,
  },
  morale: {
    x: 0,
    y: 175,
    width: summaryWidth,
    height: 45,
  },
  mana: {
    x: 0,
    y: 220,
    width: summaryWidth,
    height: 45,
  },
  text: {
    lineHeight: 16,
    top: 5,
    left: 8,
    right: summaryWidth - 8,
  },
};

export const defaultTextOptions = {
  font: '12px sans-serif',
  fillStyle: 'white',
  baseline: 'bottom' as CanvasTextBaseline,
};

export const defaultStrokeOptions = {
  lineWidth: 1,
  strokeStyle: '#e7ce8c',
};

export const defaultPanelOptions = {
  borderSize: 4,
  lightShadowColor: 'rgba(255, 255, 255, 0.4)',
  darkShadowColor: 'rgba(0, 0, 0, 0.4)',
};
