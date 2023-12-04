import type { IAnimatedSpriteOptions } from '../models/sprites/AnimatedSprite';

export const hero1SpriteOptions: IAnimatedSpriteOptions = {
  url: '/src/assets/heroes/undead.png',
  width: 150,
  height: 175,
  canvasWidth: 150,
  canvasHeight: 175,
  animations: [0, 1, 2, 3, 2, 1],
  animationSpeed: 10,
};

export const hero2SpriteOptions: IAnimatedSpriteOptions = {
  url: '/src/assets/heroes/undead-mirror.png',
  width: 150,
  height: 175,
  canvasWidth: 150,
  canvasHeight: 175,
  animations: [19, 18, 17, 16, 17, 18],
  animationSpeed: 10,
};
