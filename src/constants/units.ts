import { Hexagon } from '../models/grid';
import { SPRITE } from './sprites';

export interface Creature {
  monsterId: number;
  position: Hexagon;
  quantity: number;

  animation: {
    sprite: string;
    size: { width: number; height: number; offsetY: number };
  };
}

export const leftHeroArmy: Array<Creature> = [
  {
    monsterId: 61,
    position: new Hexagon(-7, 0, 7),
    animation: { sprite: SPRITE.wraith, size: { width: 70, height: 110, offsetY: 20 } },
    quantity: 12,
  },
  {
    monsterId: 61,
    position: new Hexagon(-5, -4, 9),
    animation: { sprite: SPRITE.wraith, size: { width: 70, height: 110, offsetY: 20 } },
    quantity: 1,
  },
  {
    monsterId: 61,
    position: new Hexagon(-9, 4, 5),
    animation: { sprite: SPRITE.wraith, size: { width: 70, height: 110, offsetY: 20 } },
    quantity: 4,
  },
];

export const rightHeroArmy: Array<Creature> = [
  {
    monsterId: 61,
    position: new Hexagon(-3, 0, 3),
    animation: { sprite: SPRITE.wraith_mirror, size: { width: 70, height: 110, offsetY: 20 } },
    quantity: 5,
  },
];
