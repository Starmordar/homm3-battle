import BattleHero from './BattleHero';

import { randomValueOf } from '@/utils/common';
import { type HeroOptions, heroesOptions, heroesClasses } from '@/constants/hero';
import { Creature, enemyArmy, heroArmy } from '@/constants/units';
import { Hexagon } from '../grid';
import BattleQueue from './BattleQueue';
import BattleMonster from './BattleMonster';
import { EventKey, eventBus } from '@/controllers/EventBus';

type RandomHeroOptions = HeroOptions & { name: string };

class Battle {
  private readonly queue: BattleQueue;
  public heroes: Array<BattleHero> = [];

  constructor() {
    this.initializeHeroes();
    this.queue = new BattleQueue(this.heroes[0], this.heroes[1]);

    this.attachEvents();
  }

  private initializeHeroes() {
    const ownMonsters = this.createBattleMonsters(heroArmy, true);
    this.createRandomHero(ownMonsters);

    const aiMonsters = this.createBattleMonsters(enemyArmy, false);
    this.createRandomHero(aiMonsters);
  }

  private createBattleMonsters(army: Array<Creature>, controllable: boolean): Array<BattleMonster> {
    const monsters = army.map((unit) => {
      return new BattleMonster({ ...unit, controllable, quantity: 10 });
    });

    return monsters;
  }

  private createRandomHero(monsters: Array<BattleMonster>) {
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
      monsters
    );

    this.heroes.push(hero);
  }

  private attachEvents() {
    eventBus.on(EventKey.unitWait, () => {
      this.queue.wait();
      eventBus.emit(EventKey.refreshCanvas);
    });
  }

  public moveActiveUnit(newPosition: Hexagon) {
    this.activeUnit.position = newPosition;
    this.queue.endTurn();
  }

  get activeUnit() {
    return this.queue.activeUnit;
  }
}

export default Battle;
