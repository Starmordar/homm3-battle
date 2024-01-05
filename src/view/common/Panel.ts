import { Textures } from '@/services/SpriteRepository';
import Stroke from '@/view/common/Stroke';

import { defaultPanelOptions } from '@/constants/ui';
import type { Rect, Renderable } from '@/types';
import { TEXTURES } from '@/constants/textures/types';

interface PanelOptions extends Rect {
  borderSize?: number;

  lightShadowColor?: string;
  darkShadowColor?: string;
}

class Panel implements Renderable {
  private readonly options: Required<PanelOptions>;

  private lightShadow: Path2D = new Path2D();
  private darkShadow: Path2D = new Path2D();

  constructor(options: PanelOptions) {
    this.options = { ...defaultPanelOptions, ...options };
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.drawBackgroundImage(ctx);

    this.drawShadows(ctx);
    this.drawStroke(ctx);
  }

  private drawShadows(ctx: CanvasRenderingContext2D) {
    this.generateShadow();

    ctx.fillStyle = this.options.lightShadowColor;
    ctx.fill(this.lightShadow);

    ctx.fillStyle = this.options.darkShadowColor;
    ctx.fill(this.darkShadow);
  }

  private drawStroke(ctx: CanvasRenderingContext2D) {
    const stroke = new Stroke(this.options);
    stroke.draw(ctx);
  }

  private drawBackgroundImage(ctx: CanvasRenderingContext2D) {
    const { width, height, x, y } = this.options;

    const sprite = Textures.get(TEXTURES.panel_bg);
    const pattern = ctx.createPattern(sprite.image, 'repeat')!;

    ctx.fillStyle = pattern;
    ctx.fillRect(x, y, width, height);
  }

  private generateShadow() {
    const { width, height, x, y, borderSize } = this.options;

    this.lightShadow = new Path2D(`\
        M ${x} ${y + height}
        v -${height} 
        h ${width} 
        l -${borderSize} ${borderSize} 
        h -${width - borderSize * 2} 
        v ${height - borderSize * 2} 
        Z\
    `);

    this.darkShadow = new Path2D(`\
        M ${x + width} ${y}
        v ${height} 
        h -${width} 
        l ${borderSize} -${borderSize} 
        h ${width - borderSize * 2} 
        v -${height - borderSize * 2} 
        Z\
    `);
  }
}

export type { PanelOptions };
export default Panel;
