import { SPRITE } from '../../constants/sprites';
import { units } from '../../constants/units';
import AnimatedSprite from '../sprites/AnimatedSprite';
import { Hexagon, Layout } from '../../models/grid';
import SpriteRepository from '../sprites/SpriteRepository';
import Canvas, { CanvasOptions } from './Canvas';

class UnitsCanvas extends Canvas<CanvasOptions> {
  private readonly layout: Layout;
  private readonly spriteRepository: SpriteRepository;

  private animationStart: number = 0;
  private heroSprites: Array<AnimatedSprite> = [];
  private unitSprites: Array<{ sprite: AnimatedSprite; hex: Hexagon }> = [];

  constructor(spriteRepository: SpriteRepository, layout: Layout, options: CanvasOptions) {
    super(options);

    this.layout = layout;
    this.spriteRepository = spriteRepository;
    this.animationStep = this.animationStep.bind(this);
  }

  public async setup() {
    this.heroSprites = [
      this.spriteRepository.get<AnimatedSprite>(SPRITE.heroes_undead)!,
      this.spriteRepository.get<AnimatedSprite>(SPRITE.heroes_undead_mirror)!,
    ];

    this.unitSprites = units.map((hex) => {
      const sprite = this.spriteRepository.get<AnimatedSprite>(SPRITE.wraith)!;
      return { hex, sprite };
    });

    requestAnimationFrame(this.firstFrame.bind(this));
  }

  private firstFrame(timeStamp: DOMHighResTimeStamp) {
    this.animationStart = timeStamp;
    this.animationStep(timeStamp);
  }

  private animationStep(timeStamp: DOMHighResTimeStamp) {
    const delta = (timeStamp - this.animationStart) / 250;

    if (delta < 1) {
      requestAnimationFrame(this.animationStep);
      return;
    }

    this.animationStart = timeStamp;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.animate();
    requestAnimationFrame(this.animationStep);
  }

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
    // if (Math.random() < 0.01) this.heroSprites[1].nextAnimation = 'active';

    this.unitSprites.forEach(({ sprite, hex }, index) => {
      const pixel = this.layout.hexToPixel(hex);
      sprite.drawFrame(this.ctx, pixel.x - 70 / 2, pixel.y - 100, 70, 115);
      sprite.currentFrame++;
    });
  }
}

export default UnitsCanvas;
