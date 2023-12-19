import BattleMonster from '@/controllers/objects/BattleMonster';

import { Observer } from '@/services/Observer';
import AnimatedSprite from '../sprites/AnimatedSprite';
import { gridLayout } from '@/constants/hex';

class BattleMonsterView implements Observer {
  private readonly controller: BattleMonster;
  private readonly ctx: CanvasRenderingContext2D;
  public sprite: AnimatedSprite;

  constructor(controller: BattleMonster, ctx: CanvasRenderingContext2D, sprite: AnimatedSprite) {
    this.ctx = ctx;
    this.sprite = sprite;

    this.controller = controller;
    this.controller.model.addObserver(this);
  }

  public draw() {
    const { animation, position } = this.controller.model;
    const { width, height, offsetY } = animation.size;

    const pixel = gridLayout.hexToPixel(position);
    const x = pixel.x - width / 2;
    const y = pixel.y - height + offsetY;

    this.sprite.drawFrame(this.ctx, 0, x, y, width, height);
    this.sprite.currentFrame++;

    this.drawQuantityLegend();
  }

  private drawQuantityLegend() {
    const { animation, position, quantity } = this.controller.model;
    const { offsetY } = animation.size;

    const pixel = gridLayout.hexToPixel(position);
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

  update() {
    this.draw();
  }
}

export default BattleMonsterView;
