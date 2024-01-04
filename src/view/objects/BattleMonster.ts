import BattleMonster from '@/controllers/BattleMonster';
import MonsterSprite from '../sprites/MonsterSprite';

import { Observer } from '@/services/Observer';
import { battleLayout } from '@/constants/hex';
import { Hexagon, Point } from '@/models/grid';
import { MONSTER_SPRITES } from '@/constants/textures';

class BattleMonsterView implements Observer {
  private readonly controller: BattleMonster;
  private readonly ctx: CanvasRenderingContext2D;
  public sprite: MonsterSprite;

  private animationIndex: number = 0;

  constructor(controller: BattleMonster, ctx: CanvasRenderingContext2D, sprite: MonsterSprite) {
    this.ctx = ctx;
    this.sprite = sprite;

    this.controller = controller;
    this.controller.model.addObserver(this);
  }

  public draw() {
    const { animationPath, activeAnimation, isDead } = this.controller.model;

    if (isDead) return this.drawDeadSprite();
    if (activeAnimation) return this.drawActiveAnimation();

    if (animationPath === null) this.drawStandingSprite();
    else this.drawMovableSprite(animationPath);
  }

  private drawMovableSprite(animationPath: Array<Point>) {
    const { animation } = this.controller.model;
    const { width, height, offsetY } = animation.size;

    const pixel = animationPath[this.animationIndex];
    if (!pixel) return this.endAnimation();

    const x = pixel.x - width / 2;
    const y = pixel.y - height + offsetY;

    this.sprite.drawFrame(this.ctx, x, y, width, height);
    this.sprite.setNextFrame();

    this.animationIndex++;
  }

  private drawStandingSprite() {
    const { animation, position } = this.controller.model;
    const { width, height, offsetY } = animation.size;

    const pixel = battleLayout.hexToPixel(position);
    const x = pixel.x - width / 2;
    const y = pixel.y - height + offsetY;

    this.sprite.drawFrame(this.ctx, x, y, width, height);
    this.sprite.setNextFrame();

    this.drawQuantityLegend();
  }

  private drawQuantityLegend() {
    const { animation, position, quantity } = this.controller.model;
    const { offsetY } = animation.size;

    const pixel = battleLayout.hexToPixel(position);
    const x = pixel.x;
    const y = pixel.y + offsetY;

    this.ctx.strokeStyle = '#998c38';
    this.ctx.fillStyle = '#4F2982';

    this.ctx.fillRect(x - 15, y - 10, 30, 13);
    this.ctx.strokeRect(x - 14.5, y - 9.5, 29, 12);

    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'white';
    this.ctx.font = '12px sans-serif';
    this.ctx.textBaseline = 'bottom';

    this.ctx.fillText(quantity.toString(), x, y + 4);
  }

  private endAnimation() {
    this.controller.endMoveAnimation();
    this.animationIndex = 0;
  }

  private drawActiveAnimation() {
    const { animation, activeAnimation, position } = this.controller.model;
    const { width, height, offsetY } = animation.size;

    if (this.sprite.currentAnimation !== activeAnimation) {
      this.sprite.setAnimation(activeAnimation as MONSTER_SPRITES);
    }
    if (this.sprite.isLastFrame) return this.endActiveAnimation();

    const pixel = battleLayout.hexToPixel(position);
    const x = pixel.x - width / 2;
    const y = pixel.y - height + offsetY;

    this.sprite.drawFrame(this.ctx, x, y, width, height);
    this.sprite.setNextFrame();
  }

  private endActiveAnimation() {
    this.controller.endStepAnimation();
  }

  private drawDeadSprite() {
    const { animation, position } = this.controller.model;
    const { width, height, offsetY } = animation.size;

    const pixel = battleLayout.hexToPixel(position);
    const x = pixel.x - width / 2;
    const y = pixel.y - height + offsetY;

    this.sprite.setAnimation(MONSTER_SPRITES.dead);
    this.sprite.drawFrame(this.ctx, x, y, width, height);
  }

  get position(): Hexagon {
    return this.controller.model.position;
  }

  update() {
    this.draw();
  }
}

export default BattleMonsterView;
