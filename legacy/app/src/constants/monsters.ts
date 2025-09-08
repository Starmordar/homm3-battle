interface MonsterDamage {
  hitPoints: number;

  speed: number;
  attack: number;
  defense: number;

  melee: [number, number];
  shots: number;
  spellPower: number;
  magic: [number, number];
}

export interface Monster {
  id: number;

  type: string;
  damage: MonsterDamage;

  abilityText: string;
  race: number;
}

export const monsters: Array<Monster> = [
  {
    id: 61,
    type: 'Wraith',
    // fightCost: 252,
    // aICost: 315,
    // growth: 7,
    // hordeGrowth: 0,
    damage: {
      hitPoints: 18,
      speed: 7,
      attack: 7,
      defense: 7,
      melee: [3, 5],
      shots: 0,
      spellPower: 0,
      magic: [12, 20],
    },
    abilityText: 'Undead.  Regenerating. Drains enemy mana.',
    race: 4,
    // attributes: 'FLYING_ARMY | IS_UNDEAD',
    // level: 3,
    // spriteId: 61,
    // upgraded: true,
    // upgradeId: -1,
    // dwelling: -1,
  },
];
