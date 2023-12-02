export interface CanvasOptions {
  size: { height: number; width: number };
  backgroundColor: string;
}

class Canvas {
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;

  readonly options: CanvasOptions;

  constructor(canvas: HTMLCanvasElement, options: CanvasOptions) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;

    this.options = options;

    this.setCanvasSize();
    this.fillCanvas();
  }

  private setCanvasSize() {
    const { width, height } = this.options.size;

    // Set display size (css pixels)
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';

    // Set actual size in memory (scaled to account for extra pixel density)
    this.canvas.width = Math.floor(width * devicePixelRatio);
    this.canvas.height = Math.floor(height * devicePixelRatio);

    this.ctx.scale(devicePixelRatio, devicePixelRatio);
  }

  private fillCanvas() {
    this.ctx.fillStyle = this.options.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default Canvas;