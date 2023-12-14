import SpriteRepository from '../sprites/SpriteRepository';
import Canvas, { CanvasOptions } from './Canvas';

import BattlePanel from '../ui/BattlePanel';
import BattleHeroInfo from '../battle/BattleHeroInfo';
import HeroSummary from '../ui/HeroSummary';
import Stroke from '../ui/Stroke';

import { SPRITE } from '../../constants/sprites';
import { battlePanelHeight, summaryWidth } from '../../constants/ui';

export interface UICanvasOptions extends CanvasOptions {
  heroes: Array<BattleHeroInfo>;

  backgroundSprite: string;
  battleWidth: number;
  battleHeight: number;
}

class UICanvas extends Canvas<UICanvasOptions> {
  private readonly battleCanvasOffset: { x: number; y: number };
  private readonly spriteRepository: SpriteRepository;

  constructor(spriteRepository: SpriteRepository, options: UICanvasOptions) {
    super(options);

    this.spriteRepository = spriteRepository;

    this.battleCanvasOffset = {
      x: (this.options.size.width - this.options.battleWidth) / 2,
      y: (this.options.size.height - this.options.battleHeight) / 2,
    };
  }

  public display() {
    const patternSprite = this.spriteRepository.get(SPRITE.edge_pattern);
    this.createCanvasPattern(patternSprite);

    this.drawBorders();
    this.drawCorners();
    this.drawHeroPortraits();

    this.drawBattleBackground();
    this.drawBattleControls();
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
    const { size, battleWidth, battleHeight, heroes } = this.options;

    const battleOffset = 5;

    const yourHero = new HeroSummary(this.spriteRepository, {
      hero: heroes[0],
      x: (size.width - battleWidth) / 2 - summaryWidth - battleOffset,
      y: (size.height - battleHeight) / 2,
    });
    yourHero.draw(this.ctx);

    const enemyHero = new HeroSummary(this.spriteRepository, {
      hero: heroes[1],
      x: (size.width + battleWidth) / 2 + battleOffset,
      y: (size.height - battleHeight) / 2,
    });
    enemyHero.draw(this.ctx);
  }

  private drawBattleBackground() {
    const { battleWidth, battleHeight } = this.options;
    const sprite = this.spriteRepository.get(this.options.backgroundSprite);

    sprite.drawFrame(
      this.ctx,
      0,
      0,
      this.battleCanvasOffset.x,
      this.battleCanvasOffset.y,
      battleWidth,
      battleHeight - battlePanelHeight
    );

    const stroke = new Stroke({
      x: this.battleCanvasOffset.x,
      y: this.battleCanvasOffset.y,
      width: battleWidth,
      height: battleHeight,
    });
    stroke.draw(this.ctx);
  }

  private drawBattleControls() {
    const { size, battleWidth, battleHeight } = this.options;

    const border = 2;
    const battlePanel = new BattlePanel(this.spriteRepository, {
      width: battleWidth - border,
      x: (size.width - battleWidth + border) / 2,
      y: (size.height + battleHeight) / 2 - battlePanelHeight,
    });

    battlePanel.draw(this.ctx, this.canvas);
  }
}

export default UICanvas;
