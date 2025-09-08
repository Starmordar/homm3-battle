import BattleMonsterModel from '@/models/BattleMonsterModel';
import BattleMonster from '@/controllers/BattleMonster';

import BattleHeroModel from '@/models/BattleHeroModel';
import BattleHero from '@/controllers/BattleHero';
import BattleQueue from '@/controllers/BattleQueue';
import Subject from '@/services/Observer';

import { randomValueOf } from '@/utils/common';
import { Creature, rightHeroArmy, leftHeroArmy } from '@/constants/units';
import { BATTLE_SIDE } from '@/constants/common';

import type { HeroSettings } from '@/types/heroes';
import type { DataSettings } from '@/types';

class BattleModel extends Subject {
  battleSide: BATTLE_SIDE;
  queue: BattleQueue;
  animationPending: boolean;
  heroes: Array<BattleHero> = [];

  constructor(battleSide: BATTLE_SIDE, settings: DataSettings) {
    super();

    this.battleSide = battleSide;
    this.animationPending = false;
    this.initializeHeroes(settings);

    const [leftHero, rightHero] = this.heroes;
    this.queue = new BattleQueue(leftHero, rightHero);
  }

  private initializeHeroes(settings: DataSettings) {
    const leftMonsters = this.battleMonsters(leftHeroArmy, BATTLE_SIDE.left);
    this.createRandomHero(leftMonsters, settings);

    const rightMonsters = this.battleMonsters(rightHeroArmy, BATTLE_SIDE.right);
    this.createRandomHero(rightMonsters, settings);
  }

  private battleMonsters(army: Array<Creature>, side: BATTLE_SIDE): Array<BattleMonster> {
    const controllable = side === this.battleSide;

    const monsters = army.map((monster) => {
      const model = new BattleMonsterModel({ ...monster, owner: null, controllable });
      return new BattleMonster(model);
    });

    return monsters;
  }

  private createRandomHero(monsters: Array<BattleMonster>, settings: DataSettings) {
    const heroSettings = randomValueOf<HeroSettings>(settings.heroes);
    const classSettings = settings.heroClasses.find((cl) => cl.name === heroSettings.class)!;

    const model = new BattleHeroModel({ ...heroSettings, classSettings }, monsters);

    const hero = new BattleHero(model);
    monsters.forEach((monster) => {
      monster.model.owner = hero;
    });

    this.heroes.push(hero);
  }

  get activeUnit() {
    return this.queue.activeMonster;
  }

  get enemyUnitsPosition() {
    return this.heroes.flatMap((hero) =>
      hero.model.aliveMonsters.map((unit) => unit.model.position),
    );
  }
}

export default BattleModel;
