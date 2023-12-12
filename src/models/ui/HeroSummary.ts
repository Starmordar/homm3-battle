import SpriteRepository from '@/models/sprites/SpriteRepository';
import InfoPanel from '@/models/ui/InfoPanel';
import Stroke from '@/models/ui/Stroke';

import { SPRITE } from '@/constants/sprites';
import { SummaryConfig, heroSummaryConfig } from '@/constants/ui';
import type { Renderable } from '@/types';
import BattleHeroInfo from '../battle/BattleHeroInfo';

interface Settings {
  hero: BattleHeroInfo;
  x: number;
  y: number;
}

class HeroSummary implements Renderable {
  private readonly heroInfo: BattleHeroInfo;
  private readonly spriteRepository: SpriteRepository;
  private readonly settings: Settings;

  constructor(spriteRepository: SpriteRepository, settings: Settings) {
    this.spriteRepository = spriteRepository;
    this.settings = settings;

    this.heroInfo = this.settings.hero;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.drawPortrait(ctx);
    this.drawInfoPanels(ctx);
  }

  private drawPortrait(ctx: CanvasRenderingContext2D) {
    const { avatar } = heroSummaryConfig;
    const [frameX, frameY] = this.heroInfo.options.sprite;

    const portraitSprite = this.spriteRepository.get(SPRITE.hero_avatar_lg);
    portraitSprite.drawFrame(
      ctx,
      frameX,
      frameY,
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
    const { attack, defense, spellPower, knowledge } = this.heroInfo.primarySkills;

    this.setTextStyles(ctx);

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
    const { text, morale: moraleConfig } = heroSummaryConfig;
    const { top, left, right } = this.textOffset(moraleConfig);
    const { morale, luck } = this.heroInfo;

    ctx.textAlign = 'start';
    ctx.fillText('Morale:', left, top + text.lineHeight);
    ctx.fillText('Luck', left, top + text.lineHeight * 2);

    ctx.textAlign = 'right';
    ctx.fillText(`${morale}`, right, top + text.lineHeight);
    ctx.fillText(`${luck}`, right, top + text.lineHeight * 2);
  }

  private drawManaPanelText(ctx: CanvasRenderingContext2D) {
    const { text, mana: manaConfig } = heroSummaryConfig;
    const { top, middle } = this.textOffset(manaConfig);
    const { mana } = this.heroInfo;

    ctx.textAlign = 'center';
    ctx.fillText('Spell Points', middle, top + text.lineHeight);
    ctx.fillText(`${mana.mana}/${mana.manaLimit}`, middle, top + text.lineHeight * 2);
  }
}

export default HeroSummary;
