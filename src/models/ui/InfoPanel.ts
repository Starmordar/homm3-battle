import SpriteRepository from '../sprites/SpriteRepository';
import Stroke from './Stroke';
import type { Renderable } from '../../types';
import { SPRITE } from '../../constants/sprites';

interface Settings {
  x: number;
  y: number;
  height: number;
  width: number;

  borderSize?: number;
  lightColor?: string;
  darkColor?: string;
}

const defaultOptions = {
  borderSize: 4,
  lightColor: 'rgba(255, 255, 255, 0.4)',
  darkColor: 'rgba(0, 0, 0, 0.4)',
};

class InfoPanel implements Renderable {
  private readonly spriteRepository: SpriteRepository;
  private readonly settings: Required<Settings>;

  private lightShadow: Path2D = new Path2D();
  private darkShadow: Path2D = new Path2D();

  constructor(spriteRepository: SpriteRepository, settings: Settings) {
    this.spriteRepository = spriteRepository;
    this.settings = { ...defaultOptions, ...settings };
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.drawBackgroundImage(ctx);

    this.drawShadows(ctx);
    this.drawStroke(ctx);
  }

  private drawShadows(ctx: CanvasRenderingContext2D) {
    this.generateShadow();

    ctx.fillStyle = this.settings.lightColor;
    ctx.fill(this.lightShadow);

    ctx.fillStyle = this.settings.darkColor;
    ctx.fill(this.darkShadow);
  }

  private drawStroke(ctx: CanvasRenderingContext2D) {
    const stroke = new Stroke(this.settings);
    stroke.draw(ctx);
  }

  private drawBackgroundImage(ctx: CanvasRenderingContext2D) {
    const { width, height, x, y } = this.settings;

    const backgroundSprite = this.spriteRepository.get(SPRITE.panel_bg);
    const pattern = ctx.createPattern(backgroundSprite.image, 'repeat')!;

    ctx.fillStyle = pattern;
    ctx.fillRect(x, y, width, height);
  }

  private generateShadow() {
    const { width, height, x, y, borderSize } = this.settings;

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

export default InfoPanel;
