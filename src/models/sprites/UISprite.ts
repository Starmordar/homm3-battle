import Sprite from '@/models/sprites/Sprite';
import type { SpriteOptions } from '@/constants/sprites';

class UISprite extends Sprite {
  constructor(options: SpriteOptions) {
    super(options);
  }

  public drawFrame(
    ctx: CanvasRenderingContext2D,
    frameX: number,
    frameY: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ) {
    const { width: sw, height: sh } = this.options;

    const sx = frameX * sw;
    const sy = frameY * sh;

    ctx.drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh);
  }
}

export default UISprite;
