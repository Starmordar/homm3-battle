import Sprite from '../sprites/Sprite';

interface IBlockOptions {
  sx: number;
  sy: number;
  height: number;
  width: number;
  borderSize?: number;

  lightColor?: string;
  darkColor?: string;
}

type IDrawText = Array<{
  textAlign: CanvasTextAlign;
  lines: Array<{ text: string; sx: number; sy: number }>;
}>;

const defaultOptions = {
  borderSize: 4,
  lightColor: 'rgba(255, 255, 255, 0.4)',
  darkColor: 'rgba(0, 0, 0, 0.4)',
};

class UIBlock {
  readonly ctx: CanvasRenderingContext2D;
  readonly options: Required<IBlockOptions>;

  private lightShadow: Path2D = new Path2D();
  private darkShadow: Path2D = new Path2D();

  constructor(ctx: CanvasRenderingContext2D, options: IBlockOptions) {
    this.ctx = ctx;
    this.options = { ...defaultOptions, ...options };

    this.createShadows();
  }

  public draw(sprite: Sprite) {
    this.drawPatternImage(sprite);

    this.drawShadows();
    this.drawStroke();
  }

  public drawText(text: IDrawText) {
    text.forEach(({ textAlign, lines }) => {
      this.ctx.textAlign = textAlign;

      lines.map(({ text, sx, sy }) => this.ctx.fillText(text, sx, sy));
    });
  }

  private drawShadows() {
    this.ctx.fillStyle = this.options.lightColor;
    this.ctx.fill(this.lightShadow);

    this.ctx.fillStyle = this.options.darkColor;
    this.ctx.fill(this.darkShadow);
  }

  private drawStroke() {
    this.ctx.strokeStyle = '#e7ce8c';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(this.options.sx, this.options.sy, this.options.width, this.options.height);
  }

  private drawPatternImage(sprite: Sprite) {
    const { width, height, sx, sy } = this.options;
    const pattern = this.ctx.createPattern(sprite.image, 'repeat')!;

    this.ctx.fillStyle = pattern;
    this.ctx.fillRect(sx, sy, width, height);
  }

  private createShadows() {
    const { width, height, sx, sy, borderSize } = this.options;

    this.lightShadow = new Path2D(`\
            M ${sx} ${sy + height}
            v -${height} 
            h ${width} 
            l -${borderSize} ${borderSize} 
            h -${width - borderSize * 2} 
            v ${height - borderSize * 2} 
            Z\
        `);

    this.darkShadow = new Path2D(`\
        M ${sx + width} ${sy}
        v ${height} 
        h -${width} 
        l ${borderSize} -${borderSize} 
        h ${width - borderSize * 2} 
        v -${height - borderSize * 2} 
        Z\
    `);
  }
}

export default UIBlock;
