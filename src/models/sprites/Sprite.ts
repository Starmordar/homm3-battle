export interface ISpriteOptions {
  url: string;
  width: number;
  height: number;

  canvasWidth: number;
  canvasHeight: number;
}

abstract class Sprite<Options extends ISpriteOptions> {
  readonly ctx: CanvasRenderingContext2D;
  readonly options: Options;

  public image: HTMLImageElement = new Image();
  public loadPromise: Promise<this>;

  constructor(ctx: CanvasRenderingContext2D, options: Options) {
    this.ctx = ctx;
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
}

export default Sprite;
