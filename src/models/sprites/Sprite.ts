import type { ISpriteOptions } from '@/constants/sprites';

abstract class Sprite<Options extends ISpriteOptions = ISpriteOptions> {
  public readonly options: Options;

  public image: HTMLImageElement = new Image();
  public loadPromise: Promise<this>;

  constructor(options: Options) {
    this.options = options;

    this.loadPromise = this.loadImage(options.url);
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
