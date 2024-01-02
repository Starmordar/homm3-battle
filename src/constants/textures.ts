import { slowAnimationFrames } from '@/utils/textures';
import type { MonsterTexturesMap } from '@/types';

export enum TEXTURES {
  wraith = 'wraith',
  wraith_mirror = 'wraith_mirror',
}

export enum MONSTER_SPRITES {
  idle = 'idle',
  attackStraight = 'attackStraight',
  getHit = 'getHit',
}

export const monsterTextures: MonsterTexturesMap = slowAnimationFrames(
  {
    [TEXTURES.wraith]: {
      url: '/src/assets/wraith.png',
      width: 110,
      height: 120,
      sprites: {
        [MONSTER_SPRITES.idle]: { y: 1, x: [0, 1, 2, 3, 4, 5, 6] },
        [MONSTER_SPRITES.attackStraight]: { y: 0, x: [0, 1, 2, 3, 4, 5, 6] },
        [MONSTER_SPRITES.getHit]: { y: 2, x: [0, 1, 2, 3, 4, 5] },
      },
    },

    [TEXTURES.wraith_mirror]: {
      url: '/src/assets/wraith-mirror.png',
      width: 110,
      height: 120,
      sprites: {
        [MONSTER_SPRITES.idle]: { y: 1, x: [6, 5, 4, 3, 2, 1, 0] },
        [MONSTER_SPRITES.attackStraight]: { y: 0, x: [6, 5, 4, 3, 2, 1, 0] },
        [MONSTER_SPRITES.getHit]: { y: 2, x: [6, 5, 4, 3, 2, 1] },
      },
    },
  },
  6
);
