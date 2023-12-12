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

  constructor(details: Details) {
    this.details = details;
  }
}

export default BattleHero;
