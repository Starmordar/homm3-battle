import { defaultTextOptions } from '@/constants/ui';
import type { Renderable } from '@/types';

export interface TextOptions {
  font?: string;
  fillStyle?: string;

  baseline?: CanvasTextBaseline;
  align: CanvasTextAlign;

  text: string;
  offsetX: number;
  offsetY: number;
}

export class Text implements Renderable {
  private readonly options: Required<TextOptions>;

  private lineHeight: number;
  private lines: Array<string>;

  constructor(options: TextOptions) {
    this.options = { ...defaultTextOptions, ...options };

    this.lineHeight = parseInt(this.options.font, 10) * 1.35;
    this.lines = this.splitText();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.applyStyle(ctx);

    this.drawText(ctx);
  }

  private applyStyle(ctx: CanvasRenderingContext2D) {
    ctx.font = this.options.font;
    ctx.fillStyle = this.options.fillStyle;

    ctx.textBaseline = this.options.baseline;
    ctx.textAlign = this.options.align;
  }

  private drawText(ctx: CanvasRenderingContext2D) {
    const { offsetX, offsetY } = this.options;

    this.lines.forEach((line, index) => {
      ctx.fillText(line, offsetX, offsetY + index * this.lineHeight);
    });
  }

  private splitText(): Array<string> {
    const { text } = this.options;
    const newLineRegex = new RegExp('\\r?\\n|\\r');

    return text.split(newLineRegex);
  }
}
