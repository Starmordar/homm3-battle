import Sprite from '@/view/sprites/Sprite';
import type { StaticTexture } from '@/constants/textures/types';

class StaticSprite extends Sprite<StaticTexture> {
  constructor(options: StaticTexture) {
    super(options);
  }

  drawFrame(
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

export default StaticSprite;
