import { EventKey, globalEvents as globalEvents } from '@/services/EventBus';

import { BATTLE_SIDE } from '@/constants/common';
import BattleModel from '@/models/Battle';
import { Hexagon } from '@/models/grid';

class Battle {
  public readonly model: BattleModel;

  constructor(model: BattleModel) {
    this.model = model;

    this.attachEvents();
  }

  private attachEvents() {
    globalEvents.on(EventKey.waitTurn, () => {
      this.model.queue.waitTurn();
      //  TODO: Replace with "next turn" event
      globalEvents.emit(EventKey.refreshCanvas);
    });
  }

  public async moveActiveUnit(path: Array<Hexagon>): Promise<void> {
    await this.model.activeUnit.animateMove(path);
    this.model.queue.endTurn();
  }

  public async attackUnit(attackingHex: Hexagon, attackedHex: Hexagon, path: Array<Hexagon>) {
    await this.model.activeUnit.animateMove(path);

    const monsters = this.model.heroes.flatMap((hero) => hero.model.army);

    const attackingUnit = monsters.find(({ model }) =>
      Hexagon.isEqual(model.position, attackingHex)
    );

    const attackedUnit = monsters.find(({ model }) => Hexagon.isEqual(model.position, attackedHex));

    attackedUnit?.getHit(2);
    attackingUnit?.getHit(2);

    this.model.queue.endTurn();
  }

  public isEnemyByPosition(hex: Hexagon) {
    const [leftHero, rightHero] = this.model.heroes;
    const enemyHero = this.model.battleSide === BATTLE_SIDE.left ? rightHero : leftHero;

    return enemyHero.model.army.some((unit) => Hexagon.isEqual(unit.model.position, hex));
  }
}

export default Battle;
