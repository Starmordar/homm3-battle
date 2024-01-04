import Panel from '@/view/common/Panel';

import { ConsoleOptions } from '@/constants/ui';
import type { Renderable } from '@/types';

class ConsolePanel implements Renderable {
  private readonly options: ConsoleOptions;

  constructor(options: ConsoleOptions) {
    this.options = options;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.drawConsolePanel(ctx);

    // TODO: Draw log component
  }

  private drawConsolePanel(ctx: CanvasRenderingContext2D) {
    const consolePanel = new Panel(this.options);
    consolePanel.draw(ctx);
  }
}

export default ConsolePanel;
