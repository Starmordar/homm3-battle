import { hero1SpriteOptions, hero2SpriteOptions } from '../../constants/sprites';
import AnimatedSprite from '../../models/sprites/AnimatedSprite';
import Canvas, { CanvasOptions } from './Canvas';

interface TerrarianCanvasOptions extends CanvasOptions {
  backgroundImage: string;
}

class HeroCanvas extends Canvas<TerrarianCanvasOptions> {
  readonly options: TerrarianCanvasOptions;
  private heroSprites: Array<AnimatedSprite> = [];

  private frameCount = 0;

  constructor(canvas: HTMLCanvasElement, options: TerrarianCanvasOptions) {
    super(canvas, options);

    this.options = options;
  }

  private animationStep() {
    this.frameCount++;

    if (this.frameCount < 15) {
      requestAnimationFrame(() => this.animationStep());
      return;
    }

    this.frameCount = 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.animate();

    requestAnimationFrame(() => this.animationStep());
  }

  // 1. requestAnimationFrame

  private animate() {
    this.heroSprites[0].drawFrame(this.ctx, 0, 0, 175, 200);
    this.heroSprites[0].currentFrame++;
    this.heroSprites[0].nextAnimation = 'active';

    this.heroSprites[1].drawFrame(
      this.ctx,
      parseInt(this.canvas.style.width, 10) - 175,
      0,
      175,
      200
    );
    this.heroSprites[1].currentFrame++;
  }

  public async setup() {
    this.heroSprites = await Promise.all([
      new AnimatedSprite(hero1SpriteOptions).loadPromise,
      new AnimatedSprite(hero2SpriteOptions).loadPromise,
    ]);

    requestAnimationFrame(() => this.animationStep());
  }
}

export default HeroCanvas;
