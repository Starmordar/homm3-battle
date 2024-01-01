import { randomValueOf } from '@/utils/common';
import { type HeroOptions, heroesOptions, heroesClasses } from '@/constants/hero';
import { Creature, rightHeroArmy, leftHeroArmy } from '@/constants/units';
import { Hexagon } from '../grid';
import BattleQueue from './BattleQueue';
import { EventKey, eventBus } from '@/services/EventBus';

import BattleMonsterModel from '@/models/objects/BattleMonsterModel';
import BattleMonster from '@/controllers/objects/BattleMonster';

import BattleHero from '@/controllers/objects/BattleHero';
import BattleHeroModel from '@/models/objects/BattleHeroModel';
import { BATTLE_SIDE } from '@/constants/common';

type HeroGeneralDetails = HeroOptions & { name: string };

class Battle {
  private readonly queue: BattleQueue;
  private readonly battleSide: BATTLE_SIDE;

  public animationPending: boolean;
  public heroes: Array<BattleHero> = [];

  constructor(battleSide: BATTLE_SIDE) {
    this.battleSide = battleSide;
    this.animationPending = false;

    this.initializeHeroes();
    const [leftHero, rightHero] = this.heroes;
    this.queue = new BattleQueue(leftHero, rightHero);

    this.attachEvents();
  }

  private initializeHeroes() {
    const leftMonsters = this.createBattleMonsters(leftHeroArmy, BATTLE_SIDE.left);
    this.createRandomHero(leftMonsters);

    const rightMonsters = this.createBattleMonsters(rightHeroArmy, BATTLE_SIDE.right);
    this.createRandomHero(rightMonsters);
  }

  private createBattleMonsters(army: Array<Creature>, side: BATTLE_SIDE): Array<BattleMonster> {
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

  private attachEvents() {
    eventBus.on(EventKey.unitWait, () => {
      this.queue.waitTurn();
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
    const [leftHero, rightHero] = this.heroes;
    const enemyHero = this.battleSide === BATTLE_SIDE.left ? rightHero : leftHero;

    return enemyHero.model.army.some((unit) => Hexagon.isEqual(unit.model.position, hex));
  }

  get activeUnit() {
    return this.queue.activeMonster;
  }

  get enemyUnitsPosition() {
    return this.heroes.flatMap((hero) => hero.model.army.map((unit) => unit.model.position));
  }
}

export default Battle;
