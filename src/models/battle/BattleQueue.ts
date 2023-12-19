import BattleMonster from '@/controllers/objects/BattleMonster';
import BattleHero from './BattleHero';

class BattleQueue {
  private readonly ownHero: BattleHero;
  private readonly aiHero: BattleHero;

  private queue: Array<BattleMonster> = [];
  public activeUnit!: BattleMonster;

  constructor(ownHero: BattleHero, aiHero: BattleHero) {
    this.ownHero = ownHero;
    this.aiHero = aiHero;

    this.queue = this.createQueue();

    const nextUnit = this.peekNextUnit();
    this.startTurn(nextUnit);
  }

  private createQueue(): Array<BattleMonster> {
    const monsters = [...this.ownHero.army, ...this.aiHero.army];
    monsters.sort((a, b) => a.model.data.damage.speed - b.model.data.damage.speed);

    return monsters;
  }

  private peekNextUnit(): BattleMonster {
    const item = this.queue[this.queue.length - 1];
    this.queue.pop();

    return item;
  }

  public wait() {
    this.queue.unshift(this.activeUnit);
    this.endTurn();
  }

  public startTurn(nextUnit: BattleMonster) {
    this.activeUnit = nextUnit;

    if (!nextUnit.model.controllable) {
      // AI here
      this.endTurn();
    }
  }

  public endTurn() {
    if (this.queue.length === 0) {
      this.queue = this.createQueue();
    }

    const nextUnit = this.peekNextUnit();
    this.startTurn(nextUnit);
  }
}

export default BattleQueue;
