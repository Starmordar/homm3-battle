import BattleHero from './BattleHero';

import { randomValueOf } from '@/utils/common';
import { type HeroOptions, heroesOptions, heroesClasses } from '@/constants/hero';
import { Creature, enemyArmy, heroArmy } from '@/constants/units';

type RandomHeroOptions = HeroOptions & { name: string };

class Battle {
  public heroes: Array<BattleHero> = [];

  constructor() {
    this.initializeHeroes();
  }

  private initializeHeroes() {
    this.createRandomHero(heroArmy);
    this.createRandomHero(enemyArmy);
  }

  private createRandomHero(army: Array<Creature>) {
    const heroOptions = randomValueOf<RandomHeroOptions>(heroesOptions);
    const classOptions = heroesClasses[heroOptions.class];
    const primarySkills = classOptions.primarySkills;

    const hero = new BattleHero(
      {
        name: heroOptions.name,
        class: heroOptions.class,

        primarySkills,
        morale: classOptions.details.morale,
        luck: classOptions.details.luck,

        mana: primarySkills.knowledge * 10,
        manaLimit: primarySkills.knowledge * 10,
      },
      army
    );

    this.heroes.push(hero);
  }
}

export default Battle;
