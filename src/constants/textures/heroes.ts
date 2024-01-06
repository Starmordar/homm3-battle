import { mirrorFrames, slowFrames } from '@/utils/textures';
import { TEXTURES, TextureFrames, TextureMap } from './types';
import { HERO_CLASS } from '@/types/heroes';

export enum HERO_SPRITES {
  idle = 'idle',
  active = 'active',
}

const frames: Partial<TextureFrames<HERO_SPRITES>> = {
  [TEXTURES.hero]: {
    [HERO_SPRITES.idle]: { y: 0, x: [0, 1, 2, 3, 2, 1] },
    [HERO_SPRITES.active]: { y: 0, x: [0, 1, 2, 3, 8, 9, 10, 11, 11, 11, 10, 9, 8] },
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
  8
);

export const heroClassFrameMap = {
  [HERO_CLASS.Knight]: { male: 0, female: 1 },
  [HERO_CLASS.Cleric]: { male: 0, female: 1 },
  [HERO_CLASS.Ranger]: { male: 2, female: 3 },
  [HERO_CLASS.Druid]: { male: 2, female: 3 },
  [HERO_CLASS.Alchemist]: { male: 4, female: 5 },
  [HERO_CLASS.Wizard]: { male: 4, female: 5 },
  [HERO_CLASS.Demoniac]: { male: 6, female: 7 },
  [HERO_CLASS.Heretic]: { male: 6, female: 7 },
  [HERO_CLASS['Death Knight']]: { male: 8, female: 9 },
  [HERO_CLASS.Necromancer]: { male: 8, female: 9 },
  [HERO_CLASS.Overlord]: { male: 10, female: 11 },
  [HERO_CLASS.Warlock]: { male: 10, female: 11 },
  [HERO_CLASS.Barbarian]: { male: 12, female: 13 },
  [HERO_CLASS['Battle Mage']]: { male: 12, female: 13 },
  [HERO_CLASS.Beastmaster]: { male: 14, female: 15 },
  [HERO_CLASS.Witch]: { male: 14, female: 15 },
  [HERO_CLASS.Planeswalker]: { male: 16, female: 17 },
  [HERO_CLASS.Elementalist]: { male: 16, female: 17 },
};
