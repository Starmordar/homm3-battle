import type { IAnimatedSpriteOptions } from '../models/sprites/AnimatedSprite';

export const hero1SpriteOptions: IAnimatedSpriteOptions = {
  url: '/src/assets/heroes/undead.png',
  width: 150,
  height: 175,
  canvasWidth: 175,
  canvasHeight: 200,
  animations: {
    idle: [0, 1, 2, 3, 2, 1],
    active: [0, 1, 2, 3, 8, 9, 10, 11, 11, 10, 9, 8],
  },
};

export const hero2SpriteOptions: IAnimatedSpriteOptions = {
  url: '/src/assets/heroes/undead-mirror.png',
  width: 150,
  height: 175,
  canvasWidth: 175,
  canvasHeight: 200,
  animations: {
    idle: [19, 18, 17, 16, 17, 18],
    active: [19, 18, 17, 16, 11, 10, 9, 8, 8, 9, 10, 11],
  },
};

export interface ISprite {
  url: string;
  width: number;
  height: number;
}

const sprites = {
  // Heroes
  hero_avatar_sm: {
    url: '/src/assets/portraits/heroes/sm.png',
    width: 32,
    height: 32,
  },
  hero_avatar_lg: {
    url: '/src/assets/portraits/heroes/lg.png',
    width: 58,
    height: 64,
  },

  // UI
  corner_gems: {
    url: '/src/assets/ui/cornergems.png',
    width: 46,
    height: 45,
  },
  panelBg: {
    url: '/src/assets/ui/panelbg.jpg',
    width: 80,
    height: 200,
  },
};

export default sprites;
