import { defaultStrokeOptions } from '@/constants/ui';
import type { Rect, Renderable } from '@/types';

interface StrokeOptions extends Rect {
  lineWidth?: number;
  strokeStyle?: string;
}

class Stroke implements Renderable {
  private readonly options: Required<StrokeOptions>;

  constructor(options: StrokeOptions) {
    this.options = { ...defaultStrokeOptions, ...options };
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const { width, height, x, y, lineWidth, strokeStyle } = this.options;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.strokeRect(x, y, width, height);
  }
}

export type { StrokeOptions };
export default Stroke;
