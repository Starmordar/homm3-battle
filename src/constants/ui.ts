import { SPRITE } from './sprites';

const battleWidth = 950;

const defaultControlSettings = { width: 60, height: 47 };

export const battleButtons = [
  {
    ...defaultControlSettings,
    sprite: SPRITE.settings_btn,
    dx: 0,
    dy: 0,
  },
  {
    ...defaultControlSettings,
    sprite: SPRITE.surrender_btn,
    dx: defaultControlSettings.width,
    dy: 0,
  },
  {
    ...defaultControlSettings,
    sprite: SPRITE.flee_btn,
    dx: defaultControlSettings.width * 2,
    dy: 0,
  },
  {
    ...defaultControlSettings,
    sprite: SPRITE.magic_btn,
    dx: defaultControlSettings.width * 3,
    dy: 0,
  },

  {
    ...defaultControlSettings,
    sprite: SPRITE.pass_btn,
    dx: battleWidth - defaultControlSettings.width * 3,
    dy: 0,
  },
  {
    ...defaultControlSettings,
    sprite: SPRITE.shield_btn,
    dx: battleWidth - defaultControlSettings.width * 2,
    dy: 0,
  },
  {
    ...defaultControlSettings,
    sprite: SPRITE.auto_btn,
    dx: battleWidth - defaultControlSettings.width,
    dy: 0,
  },
];
