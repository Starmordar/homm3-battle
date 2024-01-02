import BattleMonster from '@/controllers/BattleMonster';
import BattleHero from '@/controllers/BattleHero';

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

    const nextMonster = this.nextAlive();
    this.startTurn(nextMonster);
  }

  public startTurn(nextMonster: BattleMonster) {
    this.activeMonster = nextMonster;
    globalEvents.emit(EventKey.nextTurn);

    if (!nextMonster.model.controllable) {
      // TODO: AI here
      this.endTurn();
    }
  }

  public endTurn() {
    if (this.queue.length === 0) {
      this.roundStartEnqueue();
    }

    const nextMonster = this.nextAlive();
    this.startTurn(nextMonster);
  }

  public waitTurn() {
    this.activeMonster.waitTurn();
    this.queue.enqueue(this.activeMonster);

    this.endTurn();
  }

  private roundStartEnqueue() {
    const monsters = [...this.leftHero.model.aliveMonsters, ...this.rightHero.model.aliveMonsters];
    monsters.sort((a, b) => a.model.data.damage.speed - b.model.data.damage.speed);

    monsters.forEach((monster) => {
      this.queue.enqueue(monster);
    });
  }

  private deque(): BattleMonster {
    const monster = this.queue.deque() as BattleMonster;
    return monster;
  }

  private nextAlive(): BattleMonster {
    let monster = this.deque() as BattleMonster;
    while (this.queue.length > 0) {
      if (monster.model.isDead) monster = this.deque() as BattleMonster;
      else return monster;
    }

    if (!monster) throw Error('All monsters are dead');
    return monster;
  }
}

export default BattleQueue;
