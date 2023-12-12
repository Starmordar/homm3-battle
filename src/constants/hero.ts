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
    animation: { battle: { male: 'CH08.DEF', female: 'CH09.DEF' } },
    primarySkills: { attack: 1, defense: 3, spellPower: 1, knowledge: 1 },
    details: { morale: 1, luck: 1 },
  },
  necromancer: {
    commander: 'powerLich',
    animation: { battle: { male: 'CH08.DEF', female: 'CH09.DEF' } },
    primarySkills: { attack: 1, defense: 1, spellPower: 2, knowledge: 2 },
    details: { morale: 1, luck: 0 },
  },
};
