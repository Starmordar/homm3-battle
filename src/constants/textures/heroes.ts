import { mirrorFrames, slowFrames } from '@/utils/textures';
import { TEXTURES, TextureFrames, TextureMap } from './types';

export enum HERO_SPRITES {
  idle = 'idle',
  active = 'active',
}

const frames: Partial<TextureFrames<HERO_SPRITES>> = {
  [TEXTURES.hero]: {
    [HERO_SPRITES.idle]: { y: 0, x: [0, 1, 2, 3, 2, 1] },
    [HERO_SPRITES.active]: { y: 0, x: [0, 1, 2, 3, 8, 9, 10, 11, 11, 10, 9, 8] },
  },
};

export const heroTextures: TextureMap<HERO_SPRITES> = slowFrames<HERO_SPRITES>(
  {
    [TEXTURES.hero]: {
      url: '/src/assets/heroes/hero-sprites.png',
      width: 150,
      height: 175,
      textures: frames[TEXTURES.hero]!,
    },

    [TEXTURES.hero_mirror]: {
      url: '/src/assets/heroes/hero-sprites-mirror.png',
      width: 150,
      height: 175,
      textures: mirrorFrames(frames[TEXTURES.hero]!, 19),
    },
  },
  6
);
