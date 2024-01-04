import {
  Markup,
  MarkupType,
  MarkupChild,
  TextMarkup,
  SpriteMarkup,
} from '@/constants/markup/types';
import { Point } from '@/models/grid';
import { Textures } from '@/services/SpriteRepository';
import type { Bounds, Rect } from '@/types';

class MarkupPanel<Data> {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly markup: Markup<Data>;
  private readonly bounds: Bounds;
  private readonly anchor: Point;
  private readonly data: Data;

  private x: number = 0;
  private y: number = 0;

  constructor(
    ctx: CanvasRenderingContext2D,
    markup: Markup<Data>,
    bounds: Bounds,
    anchor: Point,
    data: Data
  ) {
    this.ctx = ctx;
    this.data = data;

    this.markup = markup;
    this.bounds = bounds;
    this.anchor = anchor;
  }

  draw() {
    if (this.markup.background) this.drawBackground();
    if (this.markup.textOptions) this.setTextStyle();

    this.drawMarkup();
  }

  private drawBackground() {
    const { x, y, width, height } = this.windowRect();

    const sprite = Textures.get(this.markup.background.sprite);
    sprite.drawFrame(this.ctx, 0, 0, x, y, width, height);
  }

  private windowRect(): Rect {
    const { background } = this.markup;

    this.x = this.xOffset(this.anchor.x - background.width / 2);
    this.y = this.yOffset(this.anchor.y - background.height / 2);

    return { x: this.x, y: this.y, width: background.width, height: background.height };
  }

  private xOffset(x: number): number {
    const { width } = this.markup.background;
    const [min, max] = this.bounds.x;

    if (x < min) return min;
    if (x + width > max) return max - width;
    return x;
  }

  private yOffset(y: number): number {
    const { height } = this.markup.background;
    const [min, max] = this.bounds.y;

    if (y < min) return min;
    if (y + height > max) return max - height;
    return y;
  }

  private setTextStyle() {
    const { textOptions } = this.markup;

    this.ctx.font = textOptions.font;
    this.ctx.fillStyle = textOptions.fillStyle;
    this.ctx.textBaseline = textOptions.textBaseline;
  }

  private drawMarkup() {
    this.parse(this.markup.children);
  }

  private parse(children: Array<MarkupChild<Data>>, parent?: MarkupChild<Data>) {
    children.forEach((child) => {
      const markup = { ...child, options: this.populateOptions(child, parent) };

      if (markup.type === MarkupType.text) this.drawText(markup);
      else if (markup.type === MarkupType.sprite) this.drawSprite(markup);
      else if (markup.type === MarkupType.group) this.parse(markup.children, markup);
    });
  }

  private populateOptions(child: MarkupChild<Data>, parent?: MarkupChild<Data>): any {
    if (!parent) return child.options;
    return { ...parent.options, ...child.options };
  }

  private drawText(markup: TextMarkup<Data>) {
    const { text, align, top } = markup.options;

    const yOffset = this.y + (top ?? 0);
    const xOffset = this.xTextOffset(markup);

    this.ctx.textAlign = align;
    this.ctx.fillText(this.getText(text), xOffset, yOffset);
  }

  private getText(text: string | ((data: Data) => string)): string {
    if (typeof text === 'function') return text(this.data);
    return text;
  }

  private xTextOffset(markup: TextMarkup<Data>): number {
    const { align, left, width } = markup.options;

    if (align === 'right') return this.x + (width ?? 0) + (left ?? 0);
    return this.x + (left ?? 0);
  }

  private drawSprite(markup: SpriteMarkup<Data>) {
    const { left, top, sprite, width, height } = markup.options;
    const spriteKey = typeof sprite === 'function' ? sprite(this.data) : sprite;

    const yOffset = this.y + (top ?? 0);
    const xOffset = this.x + (left ?? 0);

    const image = Textures.get(spriteKey);
    image.drawFrame(this.ctx, 0, 0, xOffset, yOffset, width ?? 0, height ?? 0);
  }
}

export default MarkupPanel;
