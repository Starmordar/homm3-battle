import SpriteRepository from '@/models/sprites/SpriteRepository';
import BattleControl from '@/models/ui/BattleControl';
import InfoPanel from '@/models/ui/InfoPanel';

import { type BattleControlConfig, battleControlsConfig, battlePanelConfig } from '@/constants/ui';
import type { Renderable } from '@/types';

interface Settings {
  width: number;
  x: number;
  y: number;
}

class BattlePanel implements Renderable {
  private readonly settings: Settings;
  private readonly spriteRepository: SpriteRepository;

  constructor(spriteRepository: SpriteRepository, settings: Settings) {
    this.spriteRepository = spriteRepository;
    this.settings = settings;
  }

  public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.drawControls(ctx, canvas);
    this.drawInfoPanel(ctx);
  }

  private drawControls(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const controlsConfig = battleControlsConfig(this.settings.width);
    controlsConfig.forEach((config) => this.drawControl(ctx, canvas, config));
  }

  private drawControl(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    config: BattleControlConfig
  ) {
    const battleControl = new BattleControl(this.spriteRepository, {
      ...config,
      x: this.settings.x + config.x,
      y: this.settings.y + config.y,
    });

    battleControl.draw(ctx, canvas);
  }

  private drawInfoPanel(ctx: CanvasRenderingContext2D) {
    const config = battlePanelConfig(this.settings.width);
    const infoPanel = new InfoPanel(this.spriteRepository, {
      ...config,
      x: this.settings.x + config.x,
      y: this.settings.y + config.y,
    });

    infoPanel.draw(ctx);
  }
}

export default BattlePanel;
