import BattleMonster from '@/controllers/objects/BattleMonster';
import BattleHero from '@/controllers/objects/BattleHero';
import Queue from '@/services/Queue';

class BattleQueue {
  private readonly ownHero: BattleHero;
  private readonly aiHero: BattleHero;

  private queue: Queue<BattleMonster>;
  public activeMonster!: BattleMonster;

  constructor(ownHero: BattleHero, aiHero: BattleHero) {
    this.ownHero = ownHero;
    this.aiHero = aiHero;

    this.queue = new Queue();
    this.roundStartEnqueue();

    const nextMonster = this.deque();
    this.startTurn(nextMonster);
  }

  private roundStartEnqueue() {
    const monsters = [...this.ownHero.model.army, ...this.aiHero.model.army];
    monsters.sort((a, b) => a.model.data.damage.speed - b.model.data.damage.speed);

    monsters.forEach((monster) => {
      this.queue.enqueue(monster);
    });
  }

  private deque(): BattleMonster {
    const monster = this.queue.deque() as BattleMonster;
    return monster;
  }

  public wait() {
    this.queue.enqueue(this.activeMonster);
    this.endTurn();
  }

  public startTurn(nextMonster: BattleMonster) {
    this.activeMonster = nextMonster;

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
}

export default BattleQueue;
