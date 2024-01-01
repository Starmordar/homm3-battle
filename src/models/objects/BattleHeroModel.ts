import { heroesOptions } from '@/constants/hero';
import BattleMonster from '@/controllers/objects/BattleMonster';
import Subject from '@/services/Observer';

interface PrimarySkills {
  attack: number;
  defense: number;
  spellPower: number;
  knowledge: number;
}

export interface Details {
  name: string;
  class: 'deathknight' | 'necromancer';

  primarySkills: PrimarySkills;

  morale: number;
  luck: number;
}

class BattleHeroModel extends Subject {
  name: string;
  class: 'deathknight' | 'necromancer';
  morale: number;
  luck: number;

  manaLimit: number;
  mana: number;

  primarySkills: PrimarySkills;

  army: Array<BattleMonster>;

  constructor(details: Details, army: Array<BattleMonster>) {
    super();

    this.name = details.name;
    this.class = details.class;
    this.primarySkills = details.primarySkills;
    this.luck = details.luck;
    this.morale = details.morale;

    this.mana = details.primarySkills.knowledge * 10;
    this.manaLimit = details.primarySkills.knowledge * 10;

    this.army = army;
  }

  get options() {
    return heroesOptions[this.name];
  }
}

export default BattleHeroModel;
