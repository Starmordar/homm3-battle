import { mirrorFrames, slowFrames } from '@/utils/textures';
import type { TextureFrames, TextureMap } from '@/types';

export enum TEXTURES {
  wraith = 'wraith',
  wraith_mirror = 'wraith_mirror',
}

export enum MONSTER_SPRITES {
  idle = 'idle',
  attackStraight = 'attackStraight',
  getHit = 'getHit',
}

const frames: Partial<TextureFrames> = {
  [TEXTURES.wraith]: {
    [MONSTER_SPRITES.idle]: { y: 1, x: [0, 1, 2, 3, 4, 5, 6] },
    [MONSTER_SPRITES.attackStraight]: { y: 0, x: [0, 1, 2, 3, 4, 5, 6] },
    [MONSTER_SPRITES.getHit]: { y: 2, x: [0, 1, 2, 3, 4, 5] },
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
