import { Textures } from '@/services/SpriteRepository';
import Stroke from '@/view/common/Stroke';
import Battle from '@/controllers/Battle';

import { globalEvents } from '@/services/EventBus';
import { mousePosition, isMouseInsideRect } from '@/utils/canvas';

import type { ControlButtonOptions } from '@/constants/ui';
import type { Renderable } from '@/types';

class ControlButton implements Renderable {
  private options: ControlButtonOptions;

  private clickEffect?: (evt: MouseEvent) => void;
  private disabled: boolean;

  constructor(battle: Battle, options: ControlButtonOptions) {
    this.options = options;

    this.disabled = this.options.disabled(battle);
  }

  public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const { width, height, x, y } = this.options;

    const sprite = this.buttonSprite();
    sprite.drawFrame(ctx, 0, 0, x, y, width, height);

    this.strokeButton(ctx);
    this.attachButtonClickEvent(ctx, canvas);
  }

  public clear(canvas: HTMLCanvasElement) {
    if (typeof this.clickEffect === 'function') {
      canvas.removeEventListener('click', this.clickEffect);
    }
  }

  private buttonSprite() {
    const { sprites } = this.options;
    const sprite = this.disabled ? sprites.disabled : sprites.idle;

    return Textures.get(sprite);
  }

  private attachButtonClickEvent(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.clickEffect = (evt: MouseEvent) => this.triggerControl(evt, ctx, canvas);

    canvas.addEventListener('click', this.clickEffect);
  }

  private triggerControl(
    evt: MouseEvent,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) {
    if (this.disabled) return;

    const position = mousePosition(canvas, evt);
    const isClicked = isMouseInsideRect(position, this.options);
    if (!isClicked) return;

    evt.stopImmediatePropagation();

    this.drawClickAnimation(ctx);
  }

  private drawClickAnimation(ctx: CanvasRenderingContext2D) {
    const { x, y, width, height, sprites } = this.options;

    const sprite = Textures.get(sprites.active);
    sprite.drawFrame(ctx, 0, 0, x, y, width, height);

    setTimeout(() => {
      const sprite = this.buttonSprite();
      sprite.drawFrame(ctx, 0, 0, x, y, width, height);

      this.strokeButton(ctx);
      globalEvents.emit(this.options.event);
    }, 200);
  }

  private strokeButton(ctx: CanvasRenderingContext2D) {
    const stroke = new Stroke(this.options);
    stroke.draw(ctx);
  }
}

export default ControlButton;
