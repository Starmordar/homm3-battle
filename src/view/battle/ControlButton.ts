import SpriteRepository from '@/services/SpriteRepository';
import Stroke from '@/view/common/Stroke';

import { globalEvents } from '@/services/EventBus';
import { mousePosition, isMouseInsideRect } from '@/utils/canvas';

import type { ControlButtonOptions } from '@/constants/ui';
import type { Renderable } from '@/types';
import Battle from '@/models/battle/Battle';

class ControlButton implements Renderable {
  private readonly spriteRepository: SpriteRepository;
  private options: ControlButtonOptions;

  private disabled: boolean;

  constructor(spriteRepository: SpriteRepository, battle: Battle, options: ControlButtonOptions) {
    this.spriteRepository = spriteRepository;
    this.options = options;

    this.disabled = this.options.disabled(battle);
    console.log('this.disabled :>> ', this.disabled);
  }

  public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const { width, height, x, y } = this.options;

    const sprite = this.buttonSprite();
    sprite.drawFrame(ctx, 0, 0, x, y, width, height);

    this.strokeButton(ctx);
    this.attachButtonClickEvent(ctx, canvas);
  }

  private buttonSprite() {
    console.log('buttonSprite,this.disabled :>> ', this.disabled);
    const { sprites } = this.options;
    const sprite = this.disabled ? sprites.disabled : sprites.idle;

    return this.spriteRepository.get(sprite);
  }

  private attachButtonClickEvent(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const handler = (evt: MouseEvent) => this.triggerControl(evt, ctx, canvas);

    canvas.removeEventListener('click', handler);
    canvas.addEventListener('click', handler);
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

    console.log('click event, this.disabled :>> ', this.disabled);
    globalEvents.emit(this.options.event);
    this.drawClickAnimation(ctx);
  }

  private drawClickAnimation(ctx: CanvasRenderingContext2D) {
    const { x, y, width, height, sprites } = this.options;

    const sprite = this.spriteRepository.get(sprites.active);
    sprite.drawFrame(ctx, 0, 0, x, y, width, height);

    setTimeout(() => {
      console.log('setTimeout, this.disabled :>> ', this.disabled);
      const sprite = this.buttonSprite();
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
