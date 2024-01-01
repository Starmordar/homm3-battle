import { randomValueOf } from '@/utils/common';
import { type HeroOptions, heroesOptions, heroesClasses } from '@/constants/hero';
import { Creature, enemyArmy, heroArmy } from '@/constants/units';
import { Hexagon } from '../grid';
import BattleQueue from './BattleQueue';
import { EventKey, eventBus } from '@/services/EventBus';

import BattleMonsterModel from '@/models/objects/BattleMonsterModel';
import BattleMonster from '@/controllers/objects/BattleMonster';

import BattleHero from '@/controllers/objects/BattleHero';
import BattleHeroModel from '@/models/objects/BattleHeroModel';

type HeroGeneralDetails = HeroOptions & { name: string };

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

    const monsters = this.heroes.flatMap((hero) => hero.model.army);

    const attackingUnit = monsters.find(({ model }) =>
      Hexagon.isEqual(model.position, attackingHex)
    );

    const attackedUnit = monsters.find(({ model }) => Hexagon.isEqual(model.position, attackedHex));

    attackedUnit?.getHit(2);
    attackingUnit?.getHit(2);

    this.queue.endTurn();
  }

  public isEnemyByPosition(hex: Hexagon) {
    return this.heroes[1].model.army.some((unit) => Hexagon.isEqual(unit.model.position, hex));
  }

  get activeUnit() {
    return this.queue.activeMonster;
  }

  get enemyUnitsPosition() {
    return this.heroes.flatMap((hero) => hero.model.army.map((unit) => unit.model.position));
  }
}

export default Battle;
