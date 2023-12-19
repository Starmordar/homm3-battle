import { Hexagon } from '@/models/grid';
import BattleMonsterModel from '../../models/objects/BattleMonsterModel';
import EventBus from '../EventBus';

enum Event {
  moveEnd = 'moveEnd',
}

class BattleMonster extends EventBus {
  public readonly model: BattleMonsterModel;

  constructor(model: BattleMonsterModel) {
    super();

    this.model = model;
  }

  public animateMove(path: Array<Hexagon>) {
    return new Promise((resolve) => {
      this.model.setAnimationBreakpoints(path);
      this.model.notify();

      this.on(Event.moveEnd, resolve);
    });
  }

  public endMoveAnimation() {
    const breakpoints = this.model.animationBreakpoints;
    if (breakpoints === null) return;

    this.model.position = breakpoints[breakpoints.length - 1];

    this.model.setAnimationBreakpoints(null);
    this.model.notify();

    this.emit(Event.moveEnd);
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
