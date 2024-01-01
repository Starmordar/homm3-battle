import BattleMonster from '@/controllers/objects/BattleMonster';
import BattleHero from '@/controllers/objects/BattleHero';
import Queue from '@/services/Queue';
import { EventKey, globalEvents } from '@/services/EventBus';

class BattleQueue {
  private readonly leftHero: BattleHero;
  private readonly rightHero: BattleHero;
  private readonly queue: Queue<BattleMonster>;

  public activeMonster!: BattleMonster;

  constructor(leftHero: BattleHero, rightHero: BattleHero) {
    this.leftHero = leftHero;
    this.rightHero = rightHero;

    this.queue = new Queue();
    this.roundStartEnqueue();

    const nextMonster = this.deque();
    this.startTurn(nextMonster);
  }

  public startTurn(nextMonster: BattleMonster) {
    this.activeMonster = nextMonster;
    globalEvents.emit(EventKey.nextTurn);

    if (!nextMonster.model.controllable) {
      // AI here
      this.endTurn();
    }
  }

  public endTurn() {
    if (this.queue.length === 0) {
      this.roundStartEnqueue();
    }

    const nextMonster = this.deque();
    this.startTurn(nextMonster);
  }

  public waitTurn() {
    this.activeMonster.waitTurn();
    this.queue.enqueue(this.activeMonster);

    this.endTurn();
  }

  private roundStartEnqueue() {
    const monsters = [...this.leftHero.model.army, ...this.rightHero.model.army];
    monsters.sort((a, b) => a.model.data.damage.speed - b.model.data.damage.speed);

    monsters.forEach((monster) => {
      this.queue.enqueue(monster);
    });
  }

  private deque(): BattleMonster {
    const monster = this.queue.deque() as BattleMonster;
    return monster;
  }
}

export default BattleQueue;
