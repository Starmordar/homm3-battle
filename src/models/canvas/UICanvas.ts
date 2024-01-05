import { Textures } from '../../services/SpriteRepository';
import View, { ViewOptions } from './View';

import BattlePanel from '../../view/battle/BattlePanel';
import HeroSummary from '../../view/battle/HeroSummary';
import Stroke from '../../view/common/Stroke';

import { battlePanelHeight, summaryWidth } from '../../constants/ui';
import { EventKey, globalEvents } from '@/services/EventBus';
import Battle from '@/controllers/Battle';
import { TEXTURES } from '@/constants/textures/types';

export interface UICanvasOptions extends ViewOptions {
  backgroundSprite: string;
  battleWidth: number;
  battleHeight: number;
}

class UICanvas extends View<UICanvasOptions> {
  private readonly battleCanvasOffset: { x: number; y: number };
  private readonly battle: Battle;

  private battlePanel?: BattlePanel;

  constructor(battle: Battle, options: UICanvasOptions) {
    super(options);

    this.battle = battle;
    this.battleCanvasOffset = {
      x: (this.options.size.width - this.options.battleWidth) / 2,
      y: (this.options.size.height - this.options.battleHeight) / 2,
    };
  }

  public draw() {
    const patternSprite = Textures.get(TEXTURES.edge_pattern);
    this.createViewPattern(patternSprite);

    this.drawBorders();
    this.drawCorners();
    this.drawHeroPortraits();

    this.drawBattleBackground();
    this.drawBattleControls();

    globalEvents.on(EventKey.nextTurn, this.drawBattleControls.bind(this));
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

    const sprite = Textures.get(TEXTURES.corner_gems);

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
    const [leftHero, rightHero] = this.battle.model.heroes;

    const battleOffset = 5;

    const leftHeroSummary = new HeroSummary({
      hero: leftHero,
      x: (size.width - battleWidth) / 2 - summaryWidth - battleOffset,
      y: (size.height - battleHeight) / 2,
    });
    leftHeroSummary.draw(this.ctx);

    const rightHeroSummary = new HeroSummary({
      hero: rightHero,
      x: (size.width + battleWidth) / 2 + battleOffset,
      y: (size.height - battleHeight) / 2,
    });
    rightHeroSummary.draw(this.ctx);
  }

  private drawBattleBackground() {
    const { battleWidth, battleHeight } = this.options;
    const sprite = Textures.get(this.options.backgroundSprite);

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

    if (this.battlePanel) this.battlePanel.clear(this.canvas);

    const border = 2;
    this.battlePanel = new BattlePanel(this.battle, {
      width: battleWidth - border,
      x: (size.width - battleWidth + border) / 2,
      y: (size.height + battleHeight) / 2 - battlePanelHeight,
    });

    this.battlePanel.draw(this.ctx, this.canvas);
  }
}

export default UICanvas;
