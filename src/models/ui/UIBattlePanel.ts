import { SPRITE } from '../../constants/sprites';
import {
  IBattleControlBtn,
  battleControlBtns,
  battleControlGroups,
  infoPanel,
} from '../../constants/ui';
import SpriteRepository from '../sprites/SpriteRepository';
import UISpriteButton from './UIBattleBtn';
import UIBlock from './UIBlock';

interface IPanelSettings {
  width: number;

  x: number;
  y: number;
}

class UIBattlePanel {
  private readonly settings: IPanelSettings;
  private readonly spriteRepository: SpriteRepository;

  constructor(spriteRepository: SpriteRepository, settings: IPanelSettings) {
    this.spriteRepository = spriteRepository;

    this.settings = settings;
  }

  public draw(canvas: HTMLCanvasElement) {
    this.drawControlBtns(canvas);

    this.drawInfoPanel(canvas);
    this.drawControlGroups(canvas);
  }

  private drawControlBtns(canvas: HTMLCanvasElement) {
    const { width } = this.settings;
    battleControlBtns(width).forEach((btn) => this.drawButton(canvas, btn));
  }

  private drawButton(canvas: HTMLCanvasElement, btn: IBattleControlBtn) {
    const { x, y } = this.settings;

    const controlBtn = new UISpriteButton(this.spriteRepository, {
      ...btn,
      x: x + btn.x,
      y: y + btn.y,
    });

    controlBtn.draw(canvas);
  }

  private drawInfoPanel(canvas: HTMLCanvasElement) {
    const { x, y } = this.settings;

    const ctx = canvas.getContext('2d')!;
    const panel = infoPanel(this.settings.width);

    const background = this.spriteRepository.get(SPRITE.panel_bg)!;
    const moraleUI = new UIBlock(ctx, { ...panel, x: panel.x + x, y: panel.y + y });

    moraleUI.draw(background);

    console.log('@ Draw info panel here', canvas);
  }

  private drawControlGroups(canvas: HTMLCanvasElement) {
    const { x, y } = this.settings;

    const ctx = canvas.getContext('2d')!;
    const groups = battleControlGroups(this.settings.width);

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#e7ce8c';
    groups.forEach((group) => {
      ctx.strokeRect(x + group.x, y + group.y, group.width, group.height);
    });
  }
}

export default UIBattlePanel;
