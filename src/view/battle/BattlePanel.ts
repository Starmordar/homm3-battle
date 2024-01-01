import SpriteRepository from '@/services/SpriteRepository';
import ControlButton from '@/view/battle/ControlButton';
import ConsolePanel from '@/view/battle/ConsolePanel';
import Battle from '@/controllers/Battle';

import { ControlButtonOptions, battleControlsOptions, battleConsoleOptions } from '@/constants/ui';
import type { Rect, Renderable } from '@/types';

interface BattlePanelOptions extends Omit<Rect, 'height'> {}

class BattlePanel implements Renderable {
  private readonly options: BattlePanelOptions;
  private readonly spriteRepository: SpriteRepository;
  private readonly battle: Battle;

  private battleControls: Array<ControlButton> = [];

  constructor(spriteRepository: SpriteRepository, battle: Battle, options: BattlePanelOptions) {
    this.spriteRepository = spriteRepository;

    this.battle = battle;
    this.options = options;
  }

  public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.drawControls(ctx, canvas);
    this.drawConsolePanel(ctx);
  }

  public clear(canvas: HTMLCanvasElement) {
    this.battleControls.forEach((control) => control.clear(canvas));
  }

  private drawControls(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const controlsOptions = battleControlsOptions(this.options.width);
    this.battleControls = controlsOptions.map((options) => this.drawControl(ctx, canvas, options));
  }

  private drawControl(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    controlOptions: ControlButtonOptions
  ) {
    const battleControl = new ControlButton(this.spriteRepository, this.battle, {
      ...controlOptions,
      x: this.options.x + controlOptions.x,
      y: this.options.y + controlOptions.y,
    });

    battleControl.draw(ctx, canvas);
    return battleControl;
  }

  private drawConsolePanel(ctx: CanvasRenderingContext2D) {
    const consoleOptions = battleConsoleOptions(this.options.width);

    const consolePanel = new ConsolePanel(this.spriteRepository, {
      ...consoleOptions,
      x: this.options.x + consoleOptions.x,
      y: this.options.y + consoleOptions.y,
    });

    consolePanel.draw(ctx);
  }
}

export type { BattlePanelOptions };
export default BattlePanel;
