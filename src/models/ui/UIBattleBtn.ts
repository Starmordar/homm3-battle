import UISprite from '../sprites/UISprite';
import { mousePosition, isMouseInsideRect } from '../../utils/canvas';
import type { IBattleControlBtn } from '../../constants/ui';
import SpriteRepository from '../sprites/SpriteRepository';

class UISpriteButton {
  private readonly spriteRepository: SpriteRepository;
  private readonly settings: IBattleControlBtn;

  constructor(spriteRepository: SpriteRepository, settings: IBattleControlBtn) {
    this.spriteRepository = spriteRepository;
    this.settings = settings;
  }

  public draw(canvas: HTMLCanvasElement) {
    const { x, y, width, height } = this.settings;
    const ctx = canvas.getContext('2d')!;

    this.listenOnClickEvent(canvas, ctx);

    const spriteBtn = this.spriteBtn();
    if (spriteBtn) spriteBtn.drawFrame(ctx, 0, 0, x, y, width, height);

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#e7ce8c';
    ctx.strokeRect(x, y, width, height);
  }

  private spriteBtn(): UISprite | undefined {
    const { disabled, sprite } = this.settings;
    const key = disabled ? sprite.disabled : sprite.idle;

    return this.spriteRepository.get(key);
  }

  private listenOnClickEvent(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    const { x, y, width, height, sprite, disabled } = this.settings;

    canvas.addEventListener('click', async (evt: MouseEvent) => {
      if (disabled) return;

      const position = mousePosition(canvas, evt);
      const isClicked = isMouseInsideRect(position, this.settings);
      if (!isClicked) return;

      evt.stopImmediatePropagation();

      const spriteBtn = this.spriteRepository.get(sprite.active)!;
      spriteBtn.drawFrame(ctx, 0, 0, x, y, width, height);

      setTimeout(() => {
        const spriteBtn = this.spriteRepository.get(sprite.idle)!;
        spriteBtn.drawFrame(ctx, 0, 0, x, y, width, height);
      }, 200);
    });
  }
}

export default UISpriteButton;
