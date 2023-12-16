import SpriteRepository from '@/services/SpriteRepository';
import Stroke from '@/view/common/Stroke';

import { eventBus } from '@/controllers/EventBus';
import { mousePosition, isMouseInsideRect } from '@/utils/canvas';

import type { ControlButtonOptions } from '@/constants/ui';
import type { Renderable } from '@/types';

class ControlButton implements Renderable {
  private readonly spriteRepository: SpriteRepository;
  private options: ControlButtonOptions;

  constructor(spriteRepository: SpriteRepository, options: ControlButtonOptions) {
    this.spriteRepository = spriteRepository;
    this.options = options;
  }

  public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const { width, height, x, y } = this.options;

    const sprite = this.buttonSprite();
    sprite.drawFrame(ctx, 0, 0, x, y, width, height);

    this.strokeButton(ctx);
    this.attachButtonClickEvent(ctx, canvas);
  }

  private buttonSprite() {
    const { sprites, disabled } = this.options;
    const sprite = disabled ? sprites.disabled : sprites.idle;

    return this.spriteRepository.get(sprite);
  }

  private attachButtonClickEvent(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    canvas.addEventListener('click', (evt: MouseEvent) => {
      if (this.options.disabled) return;

      const position = mousePosition(canvas, evt);
      const isClicked = isMouseInsideRect(position, this.options);
      if (!isClicked) return;

      evt.stopImmediatePropagation();

      eventBus.emit(this.options.event);
      this.drawClickAnimation(ctx);
    });
  }

  private drawClickAnimation(ctx: CanvasRenderingContext2D) {
    const { x, y, width, height, sprites } = this.options;

    const sprite = this.spriteRepository.get(sprites.active);
    sprite.drawFrame(ctx, 0, 0, x, y, width, height);

    setTimeout(() => {
      const sprite = this.spriteRepository.get(sprites.idle);
      sprite.drawFrame(ctx, 0, 0, x, y, width, height);

      this.strokeButton(ctx);
    }, 200);
  }

  private strokeButton(ctx: CanvasRenderingContext2D) {
    const stroke = new Stroke(this.options);
    stroke.draw(ctx);
  }
}

export default ControlButton;
