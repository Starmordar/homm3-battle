import { cornerGems } from '../../constants/sprites';
import UISprite from '../../models/sprites/UISprite';
import Canvas, { CanvasOptions } from './Canvas';

interface UICanvasOptions extends CanvasOptions {
  patternImage: string;
}

const border = 2;

class UICanvas extends Canvas<UICanvasOptions> {
  readonly options: UICanvasOptions;

  constructor(canvas: HTMLCanvasElement, options: UICanvasOptions) {
    super(canvas, options);

    this.options = options;
  }

  public async setup() {
    await this.createPattern(this.options.patternImage);
    this.drawBorders();
    this.drawCornerGems();
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

  private drawCornerGems() {
    const { width, height } = this.options.size;
    const cornerGemsSprite = new UISprite(this.ctx, cornerGems);

    const top = border;
    const bottom = height - cornerGems.height - border;
    const left = border;
    const right = width - cornerGems.width - border;

    cornerGemsSprite.drawFrame(0, 0, left, top);
    cornerGemsSprite.drawFrame(1, 0, right, top);
    cornerGemsSprite.drawFrame(2, 0, left, bottom);
    cornerGemsSprite.drawFrame(3, 0, right, bottom);
  }
}

export default UICanvas;
