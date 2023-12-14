import type { Creature } from '@/constants/units';

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

  manaLimit: number;
  mana: number;
}

class BattleHero {
  public readonly details: Details;
  public readonly army: Array<Creature>;

  constructor(details: Details, army: Array<Creature>) {
    this.details = details;
    this.army = army;
  }
}

export default BattleHero;
