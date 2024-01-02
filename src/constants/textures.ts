import { mirrorFrames, slowFrames } from '@/utils/textures';
import type { TextureFrames, TextureMap } from '@/types';

export enum TEXTURES {
  wraith = 'wraith',
  wraith_mirror = 'wraith_mirror',
}

export enum MONSTER_SPRITES {
  idle = 'idle',
  move = 'move',

  attackStraight = 'attackStraight',
  attackUp = 'attackUp',
  attackDown = 'attackDown',

  getHit = 'getHit',
  defend = 'defend',
  death = 'death',
}

const frames: Partial<TextureFrames> = {
  [TEXTURES.wraith]: {
    [MONSTER_SPRITES.idle]: { y: 6, x: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6] },
    [MONSTER_SPRITES.move]: { y: 6, x: [0, 1, 2, 3, 4, 5, 6] },

    [MONSTER_SPRITES.attackStraight]: { y: 1, x: [0, 1, 2, 3, 4, 5, 6] },
    [MONSTER_SPRITES.attackUp]: { y: 2, x: [0, 1, 2, 3, 4, 5, 6] },
    [MONSTER_SPRITES.attackDown]: { y: 0, x: [0, 1, 2, 3, 4, 5, 6, 7] },

    [MONSTER_SPRITES.getHit]: { y: 4, x: [0, 1, 2, 3, 4, 5] },
    [MONSTER_SPRITES.defend]: { y: 5, x: [0, 1, 2, 3] },
    [MONSTER_SPRITES.death]: { y: 3, x: [0, 1, 2, 3, 4, 5, 6, 7] },
  },
};

export const monsterTextures: TextureMap = slowFrames(
  {
    [TEXTURES.wraith]: {
      url: '/src/assets/wraith.png',
      width: 110,
      height: 120,
      textures: frames[TEXTURES.wraith]!,
    },

    [TEXTURES.wraith_mirror]: {
      url: '/src/assets/wraith-mirror.png',
      width: 110,
      height: 120,
      textures: mirrorFrames(frames[TEXTURES.wraith]!),
    },
  },
  4
);
