import type { SpriteOptions } from '@/constants/sprites';

abstract class Sprite<T extends SpriteOptions = SpriteOptions> {
  public readonly options: T;

  public image: HTMLImageElement = new Image();
  public load: Promise<this>;

  constructor(options: T) {
    this.options = options;
    this.load = this.loadImage(options.url);
  }

  private loadImage(url: string): Promise<this> {
    return new Promise((resolve, reject) => {
      this.image = new Image();

      this.image.onload = () => {
        resolve(this);
      };

      this.image.onerror = reject;
      this.image.src = url;
    });
  }

  abstract drawFrame(
    ctx: CanvasRenderingContext2D,
    fx: number,
    fy: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ): void;
}

export default Sprite;
