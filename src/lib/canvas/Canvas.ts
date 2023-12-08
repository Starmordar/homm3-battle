import Sprite from '../../models/sprites/Sprite';

export interface CanvasOptions {
  classNames: Array<string>;
  size: { height: number; width: number };
}

class Canvas<Options extends CanvasOptions> {
  protected readonly options: Options;
  protected readonly canvas: HTMLCanvasElement;
  protected readonly ctx: CanvasRenderingContext2D;

  constructor(options: Options) {
    this.options = options;

    const canvas = this.createCanvas();

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;

    this.setCanvasSize();
  }

  private createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.classList.add(...this.options.classNames);

    const root = document.getElementById('root')!;
    root.appendChild(canvas);

    return canvas;
  }

  protected setCanvasSize() {
    const { width, height } = this.options.size;

    // Set display size (css pixels)
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';

    // Set actual size in memory (scaled to account for extra pixel density)
    this.canvas.width = Math.floor(width * devicePixelRatio);
    this.canvas.height = Math.floor(height * devicePixelRatio);

    this.ctx.scale(devicePixelRatio, devicePixelRatio);
  }

  protected createCanvasPattern(sprite: Sprite) {
    const { width, height } = this.options.size;
    const pattern = this.ctx.createPattern(sprite.image, 'repeat')!;

    this.ctx.fillStyle = pattern;
    this.ctx.fillRect(0, 0, width, height);
  }
}

export default Canvas;
