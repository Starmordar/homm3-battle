import { Renderable } from '../../types';

interface StrokeSettings {
  x: number;
  y: number;
  width: number;
  height: number;

  lineWidth?: number;
  strokeStyle?: string;
}

const defaultSettings = { lineWidth: 1, strokeStyle: '#e7ce8c' };

class Stroke implements Renderable {
  private readonly settings: Required<StrokeSettings>;

  constructor(settings: StrokeSettings) {
    this.settings = { ...defaultSettings, ...settings };
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const { x, y, width, height, lineWidth, strokeStyle } = this.settings;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.strokeRect(x, y, width, height);
  }
}

export default Stroke;
