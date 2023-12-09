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
  }

  private setHoverEvents() {
    this.canvas.addEventListener('mousemove', async (evt: MouseEvent) => {
      // const mousePosition = getMousePosition(this.canvas, evt);
      // const isInside = isMouseInsideRect(mousePosition);
      // const rect = (evt.target as HTMLElement).getBoundingClientRect();
      // const x = evt.clientX - rect.left;
      // const y = evt.clientY - rect.top;
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // this.drawHexagonalGrid();
      // this.drawReachableHexes();
      // this.highlightHoveredHex(new Point(x, y));
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

    const dx = (size.width - battleWidth) / 2;
    const dy = battleHeight - 16;

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
