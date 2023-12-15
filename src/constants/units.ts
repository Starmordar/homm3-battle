import { Hexagon } from '../models/grid';
import { SPRITE } from './sprites';

export interface Creature {
  index: number;
  hex: Hexagon;
  sprite: string;
  size: { width: number; height: number; offsetY: number };
}

export const heroArmy: Array<Creature> = [
  {
    index: 61,
    hex: new Hexagon(-7, 0, 7),
    sprite: SPRITE.wraith,
    size: { width: 70, height: 110, offsetY: 20 },
  },
  {
    index: 61,
    hex: new Hexagon(-5, -4, 9),
    sprite: SPRITE.wraith,
    size: { width: 70, height: 110, offsetY: 20 },
  },
  {
    index: 61,
    hex: new Hexagon(-9, 4, 5),
    sprite: SPRITE.wraith,
    size: { width: 70, height: 110, offsetY: 20 },
  },
];

export const enemyArmy: Array<Creature> = [
  {
    index: 61,
    hex: new Hexagon(-3, 0, 3),
    sprite: SPRITE.wraith_mirror,
    size: { width: 70, height: 110, offsetY: 20 },
  },
];

// export const units = [
//   new Hexagon(-7, 0, 7),
//   new Hexagon(-5, -4, 9),
//   new Hexagon(-6, -2, 8),
//   new Hexagon(-8, 2, 6),
//   new Hexagon(-9, 4, 5),
// ];
