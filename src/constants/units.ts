import { Hexagon } from '../models/grid';
import { SPRITE } from './sprites';

export interface Creature {
  monsterId: number;
  position: Hexagon;

  animation: {
    sprite: string;
    size: { width: number; height: number; offsetY: number };
  };
}

export const heroArmy: Array<Creature> = [
  {
    monsterId: 61,
    position: new Hexagon(-7, 0, 7),
    animation: { sprite: SPRITE.wraith, size: { width: 70, height: 110, offsetY: 20 } },
  },
  {
    monsterId: 61,
    position: new Hexagon(-5, -4, 9),
    animation: { sprite: SPRITE.wraith, size: { width: 70, height: 110, offsetY: 20 } },
  },
  {
    monsterId: 61,
    position: new Hexagon(-9, 4, 5),
    animation: { sprite: SPRITE.wraith, size: { width: 70, height: 110, offsetY: 20 } },
  },
];

export const enemyArmy: Array<Creature> = [
  {
    monsterId: 61,
    position: new Hexagon(-3, 0, 3),
    animation: { sprite: SPRITE.wraith_mirror, size: { width: 70, height: 110, offsetY: 20 } },
  },
];

// export const units = [
//   new Hexagon(-7, 0, 7),
//   new Hexagon(-5, -4, 9),
//   new Hexagon(-6, -2, 8),
//   new Hexagon(-8, 2, 6),
//   new Hexagon(-9, 4, 5),
// ];
