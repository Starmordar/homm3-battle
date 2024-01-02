import { Hexagon } from '@/models/grid';
import BattleMonsterModel from '../models/BattleMonsterModel';
import EventBus from '../services/EventBus';
import { MONSTER_SPRITES } from '@/constants/textures';

enum Event {
  endMoveAnimation = 'endMoveAnimation',
  endHitAnimation = 'endHitAnimation',
}

class BattleMonster {
  private readonly events: EventBus;
  public readonly model: BattleMonsterModel;

  constructor(model: BattleMonsterModel) {
    this.model = model;
    this.events = new EventBus();
  }

  public animateMove(path: Array<Hexagon>) {
    return new Promise((resolve) => {
      this.model.setAnimationBreakpoints(path);
      this.model.notify();

      this.events.on(Event.endMoveAnimation, resolve);
    });
  }

  public endMoveAnimation() {
    const breakpoints = this.model.animationBreakpoints;
    if (breakpoints === null) return;

    this.model.position = breakpoints[breakpoints.length - 1];

    this.model.setAnimationBreakpoints(null);
    this.model.notify();

    this.events.emit(Event.endMoveAnimation);
  }

  public animateStep(sprite: MONSTER_SPRITES) {
    return new Promise((resolve) => {
      this.model.setActiveAnimation(sprite);
      this.model.notify();

      this.events.on(Event.endHitAnimation, resolve);
    });
  }

  public endStepAnimation() {
    this.model.setActiveAnimation(null);
    this.model.notify();

    this.events.emit(Event.endHitAnimation);
  }

  waitTurn() {
    this.model.hadTurn = true;
  }

  updatePosition(newPosition: Hexagon) {
    this.model.position = newPosition;
    this.model.notify();
  }

  getHit(hitBy: number) {
    this.model.quantity = this.model.quantity - hitBy;
    this.model.notify();
  }

  attackEnemy() {
    this.model.hasResponse = false;
    this.model.notify();
  }
}

export default BattleMonster;
