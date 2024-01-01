import BattleMonsterModel from '@/models/BattleMonsterModel';
import BattleMonster from '@/controllers/BattleMonster';

import BattleHeroModel from '@/models/BattleHeroModel';
import BattleHero from '@/controllers/BattleHero';
import BattleQueue from '@/controllers/BattleQueue';
import Subject from '@/services/Observer';

import { randomValueOf } from '@/utils/common';
import { Creature, rightHeroArmy, leftHeroArmy } from '@/constants/units';
import { type HeroOptions, heroesOptions, heroesClasses } from '@/constants/hero';
import { BATTLE_SIDE } from '@/constants/common';

type HeroGeneralDetails = HeroOptions & { name: string };

class BattleModel extends Subject {
  battleSide: BATTLE_SIDE;
  queue: BattleQueue;
  animationPending: boolean;
  heroes: Array<BattleHero> = [];

  constructor(battleSide: BATTLE_SIDE) {
    super();

    this.battleSide = battleSide;
    this.animationPending = false;

    this.initializeHeroes();

    const [leftHero, rightHero] = this.heroes;
    this.queue = new BattleQueue(leftHero, rightHero);
  }

  private initializeHeroes() {
    const leftMonsters = this.battleMonsters(leftHeroArmy, BATTLE_SIDE.left);
    this.createRandomHero(leftMonsters);

    const rightMonsters = this.battleMonsters(rightHeroArmy, BATTLE_SIDE.right);
    this.createRandomHero(rightMonsters);
  }

  private battleMonsters(army: Array<Creature>, side: BATTLE_SIDE): Array<BattleMonster> {
    const controllable = side === this.battleSide;

    const monsters = army.map((monster) => {
      const model = new BattleMonsterModel({ ...monster, controllable });
      return new BattleMonster(model);
    });

    return monsters;
  }

  private createRandomHero(monsters: Array<BattleMonster>) {
    const generalDetails = randomValueOf<HeroGeneralDetails>(heroesOptions);
    const classDetails = heroesClasses[generalDetails.class];

    const model = new BattleHeroModel(
      {
        name: generalDetails.name,
        class: generalDetails.class,

        primarySkills: classDetails.primarySkills,
        morale: classDetails.details.morale,
        luck: classDetails.details.luck,
      },
      monsters
    );

    const hero = new BattleHero(model);
    this.heroes.push(hero);
  }

  get activeUnit() {
    return this.queue.activeMonster;
  }

  get enemyUnitsPosition() {
    return this.heroes.flatMap((hero) => hero.model.army.map((unit) => unit.model.position));
  }
}

export default BattleModel;
