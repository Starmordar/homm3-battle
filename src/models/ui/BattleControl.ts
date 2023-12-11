import SpriteRepository from '@/models/sprites/SpriteRepository';
import UISprite from '@/models/sprites/UISprite';
import Stroke from '@/models/ui/Stroke';
import { mousePosition, isMouseInsideRect } from '@/utils/canvas';

import type { BattleControlConfig } from '@/constants/ui';
import type { Renderable } from '@/types';

class BattleControl implements Renderable {
  private readonly spriteRepository: SpriteRepository;
  private readonly settings: BattleControlConfig;

  constructor(spriteRepository: SpriteRepository, settings: BattleControlConfig) {
    this.spriteRepository = spriteRepository;
    this.settings = settings;
  }

  public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const { x, y, width, height } = this.settings;

    const buttonSprite = this.buttonSprite();
    buttonSprite?.drawFrame(ctx, 0, 0, x, y, width, height);

    this.strokeButton(ctx);
    this.attachClickEvent(ctx, canvas);
  }

  private buttonSprite(): UISprite {
    const { sprite, disabled } = this.settings;
    const spriteKey = disabled ? sprite.disabled : sprite.idle;

    return this.spriteRepository.get(spriteKey);
  }

  private attachClickEvent(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    canvas.addEventListener('click', (evt: MouseEvent) => {
      if (this.settings.disabled) return;

      const position = mousePosition(canvas, evt);
      const isClicked = isMouseInsideRect(position, this.settings);
      if (!isClicked) return;

      evt.stopImmediatePropagation();
      this.handleClickEvent(ctx);
    });
  }

  private handleClickEvent(ctx: CanvasRenderingContext2D) {
    const { x, y, width, height, sprite } = this.settings;

    const activeSprite = this.spriteRepository.get(sprite.active);
    activeSprite.drawFrame(ctx, 0, 0, x, y, width, height);

    setTimeout(() => {
      const idleSprite = this.spriteRepository.get(sprite.idle);
      idleSprite.drawFrame(ctx, 0, 0, x, y, width, height);
      this.strokeButton(ctx);
    }, 200);
  }

  private strokeButton(ctx: CanvasRenderingContext2D) {
    const stroke = new Stroke(this.settings);
    stroke.draw(ctx);
  }
}

export default BattleControl;
