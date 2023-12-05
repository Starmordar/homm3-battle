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
