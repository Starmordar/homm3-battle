export enum HERO_CLASS {
  Knight = 'Knight',
  Cleric = 'Cleric',
  Ranger = 'Ranger',
  Druid = 'Druid',
  Alchemist = 'Alchemist',
  Wizard = 'Wizard',
  Demoniac = 'Demoniac',
  Heretic = 'Heretic',
  'Death Knight' = 'Death Knight',
  Necromancer = 'Necromancer',
  Overlord = 'Overlord',
  Warlock = 'Warlock',
  Barbarian = 'Barbarian',
  'Battle Mage' = 'Battle Mage',
  Beastmaster = 'Beastmaster',
  Witch = 'Witch',
  Planeswalker = 'Planeswalker',
  Elementalist = 'Elementalist',
}

export interface HeroStacks {
  low: string;
  high: string;
  type: string;
}

export interface HeroSkill {
  level: number;
  name: string;
}

export interface HeroSettings {
  id: number;
  name: string;
  race: number;
  female: boolean;

  stacks: Array<HeroStacks>;
  class: HERO_CLASS;
  spec: string;

  skill1: HeroSkill;
  skill2: HeroSkill;
}

export type HeroesResponse = Record<string, HeroSettings>;

export interface ClassSkill {
  start: number;
  chance: number;
  chance_10: number;
}

export interface HeroClassSettings {
  name: HERO_CLASS;

  attack: ClassSkill;
  defence: ClassSkill;
  power: ClassSkill;
  knowledge: ClassSkill;
}

export type HeroClassesResponse = Array<HeroClassSettings>;
