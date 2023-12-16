import SpriteRepository from '@/models/sprites/SpriteRepository';
import Panel from '@/view/common/Panel';

import { ConsoleOptions } from '@/constants/ui';
import type { Renderable } from '@/types';

class ConsolePanel implements Renderable {
  private readonly options: ConsoleOptions;
  private readonly spriteRepository: SpriteRepository;

  constructor(spriteRepository: SpriteRepository, options: ConsoleOptions) {
    this.spriteRepository = spriteRepository;

    this.options = options;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.drawConsolePanel(ctx);

    // TODO: Draw log component
  }

  private drawConsolePanel(ctx: CanvasRenderingContext2D) {
    const consolePanel = new Panel(this.spriteRepository, this.options);
    consolePanel.draw(ctx);
  }
}

export default ConsolePanel;
