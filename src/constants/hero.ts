import { SPRITE } from './sprites';

export interface HeroOptions {
  sprite: [number, number];
  male: boolean;
  class: 'deathknight' | 'necromancer';
}

export const heroesOptions: Record<string, HeroOptions> = {
  straker: {
    sprite: [0, 8],
    male: true,
    class: 'deathknight',
  },
  vokial: {
    sprite: [1, 8],
    male: true,
    class: 'deathknight',
  },
  moandor: {
    sprite: [2, 8],
    male: true,
    class: 'deathknight',
  },
  charna: {
    sprite: [3, 8],
    male: false,
    class: 'deathknight',
  },
  tamika: {
    sprite: [4, 8],
    male: false,
    class: 'deathknight',
  },
  isra: {
    sprite: [5, 8],
    male: false,
    class: 'deathknight',
  },
  clavius: {
    sprite: [6, 8],
    male: true,
    class: 'deathknight',
  },
  galthran: {
    sprite: [7, 8],
    male: true,
    class: 'deathknight',
  },
  septienna: {
    sprite: [0, 9],
    male: false,
    class: 'necromancer',
  },
  aislinn: {
    sprite: [1, 9],
    male: false,
    class: 'necromancer',
  },
  sandro: {
    sprite: [2, 9],
    male: true,
    class: 'necromancer',
  },
  nimbus: {
    sprite: [3, 9],
    male: true,
    class: 'necromancer',
  },
  thant: {
    sprite: [4, 9],
    male: true,
    class: 'necromancer',
  },
  xsi: {
    sprite: [5, 9],
    male: true,
    class: 'necromancer',
  },
  vidomina: {
    sprite: [6, 9],
    male: false,
    class: 'necromancer',
  },
  nagash: {
    sprite: [7, 9],
    male: true,
    class: 'necromancer',
  },
};

export const heroesClasses = {
  deathknight: {
    commander: 'powerLich',
    animation: {
      sprites: { normal: SPRITE.heroes_animation, mirror: SPRITE.heroes_animation_mirror },
      frame: { x: 0, y: 8 },
    },
    primarySkills: { attack: 1, defense: 3, spellPower: 1, knowledge: 1 },
    details: { morale: 1, luck: 1 },
  },
  necromancer: {
    commander: 'powerLich',
    animation: {
      sprites: { normal: SPRITE.heroes_animation, mirror: SPRITE.heroes_animation_mirror },
      frame: { x: 0, y: 9 },
    },
    primarySkills: { attack: 1, defense: 1, spellPower: 2, knowledge: 2 },
    details: { morale: 1, luck: 0 },
  },
};

export const heroAnimationSize = {
  width: 150,
  height: 180,
};
