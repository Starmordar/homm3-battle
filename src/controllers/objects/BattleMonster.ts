import { Hexagon } from '@/models/grid';
import BattleMonsterModel from '../../models/objects/BattleMonsterModel';

class BattleMonster {
  public readonly model: BattleMonsterModel;

  constructor(model: BattleMonsterModel) {
    this.model = model;
  }

  updatePosition(newPosition: Hexagon) {
    this.model.position = newPosition;
    this.model.notify();
  }

  getHit(hitBy: number) {
    this.model.quantity = this.model.quantity - hitBy;
    this.model.notify();
  }
}

export default BattleMonster;
