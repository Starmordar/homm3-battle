import BattleHero from './BattleHero';

import { randomValueOf } from '@/utils/common';
import { type HeroOptions, heroesOptions, heroesClasses } from '@/constants/hero';
import { Creature, enemyArmy, heroArmy } from '@/constants/units';
import { Hexagon } from '../grid';
import BattleQueue from './BattleQueue';
import { EventKey, eventBus } from '@/controllers/EventBus';

import BattleMonsterModel from '@/models/objects/BattleMonsterModel';
import BattleMonster from '@/controllers/objects/BattleMonster';

type RandomHeroOptions = HeroOptions & { name: string };

class Battle {
  private readonly queue: BattleQueue;

  public pending: boolean;
  public heroes: Array<BattleHero> = [];

  constructor() {
    this.initializeHeroes();
    this.queue = new BattleQueue(this.heroes[0], this.heroes[1]);
    this.pending = false;

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
      const model = new BattleMonsterModel({ ...unit, controllable, quantity: 10 });
      return new BattleMonster(model);
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

  public async moveActiveUnit(path: Array<Hexagon>): Promise<void> {
    await this.activeUnit.animateMove(path);
    this.queue.endTurn();
  }

  public async attackUnit(attackingHex: Hexagon, attackedHex: Hexagon, path: Array<Hexagon>) {
    await this.activeUnit.animateMove(path);

    const monsters = this.heroes.flatMap((hero) => hero.army);

    const attackingUnit = monsters.find(({ model }) =>
      Hexagon.isEqual(model.position, attackingHex)
    );

    const attackedUnit = monsters.find(({ model }) => Hexagon.isEqual(model.position, attackedHex));

    attackedUnit?.getHit(2);
    attackingUnit?.getHit(2);

    this.queue.endTurn();
  }

  public isEnemyByPosition(hex: Hexagon) {
    return this.heroes[1].army.some((unit) => Hexagon.isEqual(unit.model.position, hex));
  }

  get activeUnit() {
    return this.queue.activeUnit;
  }

  get enemyUnitsPosition() {
    return this.heroes.flatMap((hero) => hero.army.map((unit) => unit.model.position));
  }
}

export default Battle;
