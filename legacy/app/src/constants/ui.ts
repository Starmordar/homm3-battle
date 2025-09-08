import { EventKey } from '@/services/EventBus';
import { Rect } from '@/types';
import { isWaitDisabled } from '@/utils/battle';
import Battle from '@/controllers/Battle';
import { TEXTURES } from './textures/types';

interface BattleControlSprites {
  idle: string;
  active: string;
  disabled: string;
}

export interface ControlButtonOptions extends Rect {
  disabled: (battle: Battle) => boolean;
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
      idle: TEXTURES.settings_btn,
      active: TEXTURES.settings_btn_active,
      disabled: TEXTURES.settings_btn_disabled,
    },
    disabled: () => true,
    event: EventKey.waitTurn,
  },
  {
    ...defaultControlSettings,
    x: defaultControlSettings.width,
    y: 0,

    sprites: {
      idle: TEXTURES.surrender_btn,
      active: TEXTURES.surrender_btn_active,
      disabled: TEXTURES.surrender_btn_disabled,
    },
    disabled: () => true,
    event: EventKey.waitTurn,
  },
  {
    ...defaultControlSettings,
    x: defaultControlSettings.width * 2,
    y: 0,

    sprites: {
      idle: TEXTURES.flee_btn,
      active: TEXTURES.flee_btn_active,
      disabled: TEXTURES.flee_btn_disabled,
    },
    disabled: () => true,
    event: EventKey.waitTurn,
  },
  {
    ...defaultControlSettings,
    x: defaultControlSettings.width * 3,
    y: 0,

    sprites: {
      idle: TEXTURES.magic_btn,
      active: TEXTURES.magic_btn_active,
      disabled: TEXTURES.magic_btn_disabled,
    },
    disabled: () => true,
    event: EventKey.waitTurn,
  },

  {
    ...defaultControlSettings,
    x: panelWidth - defaultControlSettings.width,
    y: 0,

    sprites: {
      idle: TEXTURES.shield_btn,
      active: TEXTURES.shield_btn_active,
      disabled: TEXTURES.shield_btn_disabled,
    },
    disabled: () => true,
    event: EventKey.waitTurn,
  },
  {
    ...defaultControlSettings,
    x: panelWidth - defaultControlSettings.width * 2,
    y: 0,

    sprites: {
      idle: TEXTURES.pass_btn,
      active: TEXTURES.pass_btn_active,
      disabled: TEXTURES.pass_btn_disabled,
    },
    disabled: isWaitDisabled,
    event: EventKey.waitTurn,
  },
  {
    ...defaultControlSettings,
    x: panelWidth - defaultControlSettings.width * 3,
    y: 0,

    sprites: {
      idle: TEXTURES.auto_btn,
      active: TEXTURES.auto_btn_active,
      disabled: TEXTURES.auto_btn_disabled,
    },
    disabled: () => true,
    event: EventKey.waitTurn,
  },
];

export const battleConsoleOptions = (panelWidth: number): ConsoleOptions => {
  return {
    x: defaultControlSettings.width * 4,
    y: 0,
    width: panelWidth - defaultControlSettings.width * 7,
    height: defaultControlSettings.height,
    sprite: TEXTURES.panel_bg,
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
