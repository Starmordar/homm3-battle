import { Hexagon } from '@/models/grid';
import BattleMonsterModel from '../../models/objects/BattleMonsterModel';
import EventBus from '../../services/EventBus';

enum Event {
  moveEnd = 'moveEnd',
}

class BattleMonster {
  public readonly model: BattleMonsterModel;
  private readonly events: EventBus;

  constructor(model: BattleMonsterModel) {
    this.model = model;
    this.events = new EventBus();
  }

  public animateMove(path: Array<Hexagon>) {
    return new Promise((resolve) => {
      this.model.setAnimationBreakpoints(path);
      this.model.notify();

      this.events.on(Event.moveEnd, resolve);
    });
  }

  public endMoveAnimation() {
    const breakpoints = this.model.animationBreakpoints;
    if (breakpoints === null) return;

    this.model.position = breakpoints[breakpoints.length - 1];

    this.model.setAnimationBreakpoints(null);
    this.model.notify();

    this.events.emit(Event.moveEnd);
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
