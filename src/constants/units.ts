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
    animation: { sprite: TEXTURES.CBKNIG, size: { width: 240, height: 200, offsetY: 55 } },
    quantity: 12,
  },
  {
    monsterId: 61,
    position: new Hexagon(-5, -4, 9),
    animation: { sprite: TEXTURES.CBKNIG, size: { width: 240, height: 200, offsetY: 55 } },
    quantity: 1,
  },
  {
    monsterId: 61,
    position: new Hexagon(-9, 4, 5),
    animation: { sprite: TEXTURES.CADEVL, size: { width: 240, height: 200, offsetY: 50 } },
    quantity: 4,
  },
];

export const rightHeroArmy: Array<Creature> = [
  {
    monsterId: 61,
    position: new Hexagon(-3, 0, 3),
    animation: { sprite: TEXTURES.CBKNIG, size: { width: 240, height: 200, offsetY: 50 } },
    quantity: 5,
  },
];
