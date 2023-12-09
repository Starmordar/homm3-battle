import { SPRITE } from '../../constants/sprites';
import { battleButtons } from '../../constants/ui';
import { getMousePosition, isMouseInsideRect } from '../../utils/canvas';
import Sprite from '../sprites/Sprite';
import SpriteRepository from '../sprites/SpriteRepository';
import UIHeroAvatar from '../ui/UIHeroAvatar';
import UISpriteButton from '../ui/UISpriteButton';
import Canvas, { CanvasOptions } from './Canvas';

export interface UICanvasOptions extends CanvasOptions {
  battleWidth: number;
  battleHeight: number;
}

class UICanvas extends Canvas<UICanvasOptions> {
  private battleCanvasOffset: { x: number; y: number };
  private readonly spriteRepository: SpriteRepository;

  constructor(spriteRepository: SpriteRepository, options: UICanvasOptions) {
    super(options);

    this.spriteRepository = spriteRepository;

    this.battleCanvasOffset = {
      x: (this.options.size.width - this.options.battleWidth) / 2,
      y: (this.options.size.height - this.options.battleHeight) / 2,
    };
  }

  public setup(patternKey: string, backgroundKey: string) {
    const patternSprite = this.spriteRepository.get(patternKey);
    if (patternSprite) this.createCanvasPattern(patternSprite);

    this.drawBorders();
    this.drawCorners();
    this.drawHeroPortraits();

    const bgSprite = this.spriteRepository.get(backgroundKey);
    if (bgSprite) this.drawBattleBackground(bgSprite);

    this.drawBattleControls();
    this.setHoverEvents();
    this.setClickEvent();
  }

  private setHoverEvents() {
    const { size, battleWidth, battleHeight } = this.options;

    this.canvas.addEventListener('mousemove', async (evt: MouseEvent) => {
      const mousePosition = getMousePosition(this.canvas, evt);

      const dx = (size.width - battleWidth) / 2;
      const dy = battleHeight - 16;
      const isInside = isMouseInsideRect(mousePosition, {
        width: battleWidth,
        height: 47,
        x: dx,
        y: dy,
      });

      const newCursor = isInside ? 'cursor-move' : 'cursor-default';
      const oldCursor = isInside ? 'cursor-default' : 'cursor-move';

      this.canvas.classList.add(newCursor);
      this.canvas.classList.remove(oldCursor);

      // TODO: Set cursor id isInside true
      console.log('isInside :>> ', isInside);
    });
  }

  private setClickEvent() {
    const { size, battleWidth, battleHeight } = this.options;

    this.canvas.addEventListener('click', async (evt: MouseEvent) => {
      const mousePosition = getMousePosition(this.canvas, evt);

      const border = 1;
      const dx = (size.width - battleWidth) / 2 + border;
      const dy = battleHeight - 16 - border;
      const isInside = isMouseInsideRect(mousePosition, { width: 60, height: 47, x: dx, y: dy });

      this.ctx.clearRect(dx, dy, 60, 47);

      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(dx, dy, 60, 47);
      const sprite = this.spriteRepository.get(SPRITE.settings_btn_active)!;
      const controlBtn = new UISpriteButton({ width: 60, height: 47, dx: dx - 1, dy: dy - 1 });
      controlBtn.draw(this.ctx, sprite);

      // TODO: Set cursor id isInside true
      console.log('click inside button :>> ', isInside);
    });
  }

  private drawBorders() {
    const { width, height } = this.options.size;

    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#392715';
    this.ctx.strokeRect(0, 0, width, height);

    this.ctx.strokeStyle = '#b59442';
    this.ctx.strokeRect(1, 1, width - 2, height - 2);

    this.ctx.strokeStyle = '#e7ce8c';
    this.ctx.strokeRect(2, 2, width - 4, height - 4);
  }

  private drawCorners() {
    const { width, height } = this.options.size;

    const sprite = this.spriteRepository.get(SPRITE.corner_gems);
    if (!sprite) return;

    const dw = sprite.options.width;
    const dh = sprite.options.height;

    const margin = 2;

    const top = margin;
    const bottom = height - sprite.options.height - margin;
    const left = margin;
    const right = width - sprite.options.width - margin;

    sprite.drawFrame(this.ctx, 0, 0, left, top, dw, dh);
    sprite.drawFrame(this.ctx, 1, 0, right, top, dw, dh);
    sprite.drawFrame(this.ctx, 2, 0, left, bottom, dw, dh);
    sprite.drawFrame(this.ctx, 3, 0, right, bottom, dw, dh);
  }

  private drawHeroPortraits() {
    const { size, battleWidth, battleHeight } = this.options;

    const heroPortraits = this.spriteRepository.get(SPRITE.hero_avatar_lg);
    const background = this.spriteRepository.get(SPRITE.panel_bg);

    const blockWidth = 90;
    const border = 5;

    const yourHero = new UIHeroAvatar(this.ctx, {
      sx: (size.width - battleWidth) / 2 - blockWidth - border,
      sy: (size.height - battleHeight) / 2,
    });
    yourHero.draw(heroPortraits, background);

    const enemyHero = new UIHeroAvatar(this.ctx, {
      sx: (size.width + battleWidth) / 2 + border,
      sy: (size.height - battleHeight) / 2,
    });
    enemyHero.draw(heroPortraits, background);
  }

  private drawBattleControls() {
    const { size, battleWidth, battleHeight } = this.options;

    const border = 1;
    const dx = (size.width - battleWidth) / 2 + border;
    const dy = battleHeight - 16 - border;

    battleButtons.forEach((btn) => {
      const sprite = this.spriteRepository.get(btn.sprite)!;

      const controlBtn = new UISpriteButton({ ...btn, dx: dx + btn.dx, dy: dy + btn.dy });
      controlBtn.draw(this.ctx, sprite);
    });
  }

  private drawBattleBackground(background: Sprite) {
    const { battleWidth, battleHeight } = this.options;

    background.drawFrame(
      this.ctx,
      0,
      0,
      this.battleCanvasOffset.x,
      this.battleCanvasOffset.y,
      battleWidth,
      battleHeight
    );

    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#e7ce8c';

    this.ctx.strokeRect(
      this.battleCanvasOffset.x,
      this.battleCanvasOffset.y,
      battleWidth,
      battleHeight
    );
  }
}

export default UICanvas;
