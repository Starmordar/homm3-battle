import { EventKey, globalEvents as globalEvents } from '@/services/EventBus';

import { BATTLE_SIDE } from '@/constants/common';
import BattleModel from '@/models/Battle';
import { Hexagon } from '@/models/grid';
import BattleMonster from './BattleMonster';
import { attackAnimationByAngle, attackedAnimation } from '@/utils/textures';

class Battle {
  public readonly model: BattleModel;

  constructor(model: BattleModel) {
    this.model = model;

    this.attachEvents();
  }

  private attachEvents() {
    globalEvents.on(EventKey.waitTurn, () => {
      this.model.queue.waitTurn();
    });
  }

  public async moveActiveUnit(path: Array<Hexagon>): Promise<void> {
    if (path.length > 1) await this.model.activeUnit.animateMove(path);
    this.model.queue.endTurn();
  }

  public async attackUnit(
    attackingHex: Hexagon,
    attackedHex: Hexagon,
    path: Array<Hexagon>,
    angle: number
  ) {
    // TODO: Fix
    if (path.length > 1) await this.model.activeUnit.animateMove(path);

    const monsters = this.model.heroes.flatMap((hero) => hero.model.aliveMonsters);
    const attacking = monsters.find(({ model }) => Hexagon.isEqual(model.position, attackingHex));
    const attacked = monsters.find(({ model }) => Hexagon.isEqual(model.position, attackedHex));
    if (!attacking || !attacked) return;

    await this.hitEnemyMonster(attacking, attacked, angle);
    this.model.queue.endTurn();
  }

  private async hitEnemyMonster(attacking: BattleMonster, attacked: BattleMonster, angle: number) {
    await attacking.animateStep(attackAnimationByAngle({ angle, response: false }));

    await attacked.animateStep(attackedAnimation(attacking, attacked));
    attacked.model.meleeHitFrom(attacking.model);

    if (!attacked.model.hasResponse) return;
    await attacked.animateStep(attackAnimationByAngle({ angle, response: true }));
    attacked.attackEnemy();

    await attacking.animateStep(attackedAnimation(attacked, attacking));
    attacking.model.meleeHitFrom(attacked.model);
  }

  public isEnemyByPosition(hex: Hexagon) {
    const [leftHero, rightHero] = this.model.heroes;
    const enemyHero = this.model.battleSide === BATTLE_SIDE.left ? rightHero : leftHero;

    return enemyHero.model.aliveMonsters.some((unit) => Hexagon.isEqual(unit.model.position, hex));
  }

  public monsterByPosition(hex: Hexagon): BattleMonster | undefined {
    const [leftHero, rightHero] = this.model.heroes;
    const monsters = [...leftHero.model.aliveMonsters, ...rightHero.model.aliveMonsters];

    return monsters.find((unit) => Hexagon.isEqual(unit.model.position, hex));
  }

  get monsters() {
    return this.model.heroes.flatMap((hero) => hero.model.army);
  }
}

export default Battle;
