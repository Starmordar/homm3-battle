import Sprite, { ISpriteOptions } from './Sprite';

class UISprite extends Sprite<ISpriteOptions> {
  constructor(ctx: CanvasRenderingContext2D, options: ISpriteOptions) {
    super(ctx, options);
  }

  public drawFrame(frameX: number, frameY: number, dx: number, dy: number, dw: number, dh: number) {
    this.ctx.drawImage(
      this.image,
      frameX * this.options.width,
      frameY * this.options.height,
      this.options.width,
      this.options.height,
      dx,
      dy,
      dw,
      dh
    );
  }
}

export default UISprite;
