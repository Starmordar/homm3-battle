import SpriteRepository from '@/services/SpriteRepository';
import Panel from '@/view/common/Panel';
import Stroke from '@/view/common/Stroke';
import BattleHeroInfo from '../../models/battle/BattleHeroInfo';

import { SPRITE } from '@/constants/sprites';
import { SummaryConfig, defaultSummaryOptions } from '@/constants/ui';
import type { Rect, Renderable } from '@/types';

interface HeroSummaryOptions extends Omit<Rect, 'width' | 'height'> {
  hero: BattleHeroInfo;
}

class HeroSummary implements Renderable {
  private readonly spriteRepository: SpriteRepository;
  private readonly options: HeroSummaryOptions;
  private readonly heroInfo: BattleHeroInfo;

  constructor(spriteRepository: SpriteRepository, options: HeroSummaryOptions) {
    this.spriteRepository = spriteRepository;
    this.options = options;

    this.heroInfo = this.options.hero;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.drawAvatar(ctx);
    this.drawInfoPanels(ctx);
  }

  private drawAvatar(ctx: CanvasRenderingContext2D) {
    const { avatar } = defaultSummaryOptions;
    const [frameX, frameY] = this.heroInfo.options.sprite;

    const portraitSprite = this.spriteRepository.get(SPRITE.hero_avatar_lg);
    portraitSprite.drawFrame(
      ctx,
      frameX,
      frameY,
      this.options.x + avatar.x,
      this.options.y + avatar.y,
      avatar.width,
      avatar.height
    );

    const stroke = new Stroke({
      x: this.options.x + avatar.x,
      y: this.options.y + avatar.y,
      width: avatar.width,
      height: avatar.height,
    });
    stroke.draw(ctx);
  }

  private setTextStyles(ctx: CanvasRenderingContext2D) {
    ctx.font = '12px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'bottom';
  }

  private drawInfoPanels(ctx: CanvasRenderingContext2D) {
    const { statistic, morale, mana } = defaultSummaryOptions;

    this.drawInfoPanel(ctx, statistic);
    this.drawInfoPanel(ctx, morale);
    this.drawInfoPanel(ctx, mana);

    this.setTextStyles(ctx);
    this.drawStatisticPanelText(ctx);
    this.drawMoralePanelText(ctx);
    this.drawManaPanelText(ctx);
  }

  private drawInfoPanel(ctx: CanvasRenderingContext2D, config: SummaryConfig) {
    const infoPanel = new Panel(this.spriteRepository, {
      ...config,
      x: config.x + this.options.x,
      y: config.y + this.options.y,
    });
    infoPanel.draw(ctx);
  }

  private textOffset(config: SummaryConfig) {
    const { text } = defaultSummaryOptions;

    const offsetTop = this.options.y + config.y + text.top;
    const offsetLeft = this.options.x + text.left;
    const offsetRight = this.options.x + text.right;
    const offsetMiddle = this.options.x + config.width / 2;

    return { top: offsetTop, left: offsetLeft, right: offsetRight, middle: offsetMiddle };
  }

  private drawStatisticPanelText(ctx: CanvasRenderingContext2D) {
    const { text, statistic } = defaultSummaryOptions;
    const { top, left, right } = this.textOffset(statistic);
    const { attack, defense, spellPower, knowledge } = this.heroInfo.primarySkills;

    ctx.textAlign = 'start';
    ctx.fillText('Att:', left, top + text.lineHeight);
    ctx.fillText('Def:', left, top + text.lineHeight * 2);
    ctx.fillText('Pwr:', left, top + text.lineHeight * 3);
    ctx.fillText('Know:', left, top + text.lineHeight * 4);

    ctx.textAlign = 'right';
    ctx.fillText(`${attack}`, right, top + text.lineHeight);
    ctx.fillText(`${defense}`, right, top + 2 * text.lineHeight);
    ctx.fillText(`${spellPower}`, right, top + 3 * text.lineHeight);
    ctx.fillText(`${knowledge}`, right, top + 4 * text.lineHeight);
  }

  private drawMoralePanelText(ctx: CanvasRenderingContext2D) {
    const { text, morale: moraleConfig } = defaultSummaryOptions;
    const { top, left, right } = this.textOffset(moraleConfig);
    const { morale, luck } = this.heroInfo;

    ctx.textAlign = 'start';
    ctx.fillText('Morale:', left, top + text.lineHeight);
    ctx.fillText('Luck:', left, top + text.lineHeight * 2);

    ctx.textAlign = 'right';
    ctx.fillText(`${morale}`, right, top + text.lineHeight);
    ctx.fillText(`${luck}`, right, top + text.lineHeight * 2);
  }

  private drawManaPanelText(ctx: CanvasRenderingContext2D) {
    const { text, mana: manaConfig } = defaultSummaryOptions;
    const { top, middle } = this.textOffset(manaConfig);
    const { mana } = this.heroInfo;

    ctx.textAlign = 'center';
    ctx.fillText('Spell Points', middle, top + text.lineHeight);
    ctx.fillText(`${mana.mana}/${mana.manaLimit}`, middle, top + text.lineHeight * 2);
  }
}

export type { HeroSummaryOptions };
export default HeroSummary;
