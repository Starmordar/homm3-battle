import { Hexagon } from '../models/grid';
import { TEXTURES } from './textures/types';

export interface Creature {
  monsterId: number;
  position: Hexagon;
  quantity: number;

  animation: {
    sprite: TEXTURES;
    size: { width: number; height: number; offsetY: number };
  };
}

export const leftHeroArmy: Array<Creature> = [
  {
    monsterId: 61,
    position: new Hexagon(-7, 0, 7),
    animation: { sprite: TEXTURES.wraith, size: { width: 130, height: 140, offsetY: 25 } },
    quantity: 12,
  },
  {
    monsterId: 61,
    position: new Hexagon(-5, -4, 9),
    animation: { sprite: TEXTURES.wraith, size: { width: 130, height: 140, offsetY: 25 } },
    quantity: 1,
  },
  {
    monsterId: 61,
    position: new Hexagon(-9, 4, 5),
    animation: { sprite: TEXTURES.wraith, size: { width: 130, height: 140, offsetY: 25 } },
    quantity: 4,
  },
];

export const rightHeroArmy: Array<Creature> = [
  {
    monsterId: 61,
    position: new Hexagon(-3, 0, 3),
    animation: { sprite: TEXTURES.wraith_mirror, size: { width: 130, height: 140, offsetY: 25 } },
    quantity: 5,
  },
];
