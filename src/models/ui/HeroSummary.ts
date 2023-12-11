import InfoPanel from './InfoPanel';
import SpriteRepository from '../sprites/SpriteRepository';
import Stroke from './Stroke';

import { SummaryConfig, heroSummaryConfig } from '../../constants/ui';
import type { Renderable } from '../../types';
import { SPRITE } from '../../constants/sprites';

interface Settings {
  x: number;
  y: number;
}

class HeroSummary implements Renderable {
  private readonly spriteRepository: SpriteRepository;
  private readonly settings: Settings;

  constructor(spriteRepository: SpriteRepository, settings: Settings) {
    this.spriteRepository = spriteRepository;
    this.settings = settings;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.drawPortrait(ctx);
    this.drawInfoPanels(ctx);
  }

  private drawPortrait(ctx: CanvasRenderingContext2D) {
    const { avatar } = heroSummaryConfig;

    const portraitSprite = this.spriteRepository.get(SPRITE.hero_avatar_lg);
    portraitSprite.drawFrame(
      ctx,
      0,
      0,
      this.settings.x + avatar.x,
      this.settings.y + avatar.y,
      avatar.width,
      avatar.height
    );

    const stroke = new Stroke({
      x: this.settings.x + avatar.x,
      y: this.settings.y + avatar.y,
      width: avatar.width,
      height: avatar.height,
    });
    stroke.draw(ctx);
  }

  private setTextStyles(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'white';
    ctx.font = '12px sans-serif';
    ctx.textBaseline = 'bottom';
  }

  private drawInfoPanels(ctx: CanvasRenderingContext2D) {
    const { statistic, morale, mana } = heroSummaryConfig;

    this.drawInfoPanel(ctx, statistic);
    this.drawInfoPanel(ctx, morale);
    this.drawInfoPanel(ctx, mana);

    this.setTextStyles(ctx);
    this.drawStatisticPanelText(ctx);
    this.drawMoralePanelText(ctx);
    this.drawManaPanelText(ctx);
  }

  private drawInfoPanel(ctx: CanvasRenderingContext2D, config: SummaryConfig) {
    const infoPanel = new InfoPanel(this.spriteRepository, {
      ...config,
      x: config.x + this.settings.x,
      y: config.y + this.settings.y,
    });
    infoPanel.draw(ctx);
  }

  private textOffset(config: SummaryConfig) {
    const { text } = heroSummaryConfig;

    const offsetTop = this.settings.y + config.y + text.top;
    const offsetLeft = this.settings.x + text.left;
    const offsetRight = this.settings.x + text.right;
    const offsetMiddle = this.settings.x + config.width / 2;

    return { top: offsetTop, left: offsetLeft, right: offsetRight, middle: offsetMiddle };
  }

  private drawStatisticPanelText(ctx: CanvasRenderingContext2D) {
    const { text, statistic } = heroSummaryConfig;
    const { top, left, right } = this.textOffset(statistic);

    this.setTextStyles(ctx);

    ctx.textAlign = 'start';
    ctx.fillText('Att:', left, top + text.lineHeight);
    ctx.fillText('Def:', left, top + text.lineHeight * 2);
    ctx.fillText('Pwr:', left, top + text.lineHeight * 3);
    ctx.fillText('Know:', left, top + text.lineHeight * 4);

    ctx.textAlign = 'right';
    ctx.fillText('5', right, top + text.lineHeight);
    ctx.fillText('8', right, top + 2 * text.lineHeight);
    ctx.fillText('1', right, top + 3 * text.lineHeight);
    ctx.fillText('4', right, top + 4 * text.lineHeight);
  }

  private drawMoralePanelText(ctx: CanvasRenderingContext2D) {
    const { text, morale } = heroSummaryConfig;
    const { top, left, right } = this.textOffset(morale);

    ctx.textAlign = 'start';
    ctx.fillText('Morale:', left, top + text.lineHeight);
    ctx.fillText('Luck', left, top + text.lineHeight * 2);

    ctx.textAlign = 'right';
    ctx.fillText('1', right, top + text.lineHeight);
    ctx.fillText('3', right, top + text.lineHeight * 2);
  }

  private drawManaPanelText(ctx: CanvasRenderingContext2D) {
    const { text, mana } = heroSummaryConfig;
    const { top, middle } = this.textOffset(mana);

    ctx.textAlign = 'center';
    ctx.fillText('Spell Points', middle, top + text.lineHeight);
    ctx.fillText('24/40', middle, top + text.lineHeight * 2);
  }
}

export default HeroSummary;
