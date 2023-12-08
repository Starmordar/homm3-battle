import { SPRITE, wrathSprite } from '../../constants/sprites';
import { units } from '../../constants/units';
import AnimatedSprite from '../../models/sprites/AnimatedSprite';
// import { Hexagon } from '../../models/grid';
import SpriteRepository from '../../models/sprites/SpriteRepository';
import Canvas, { CanvasOptions } from './Canvas';

class UnitsCanvas extends Canvas<CanvasOptions> {
  private readonly spriteRepository: SpriteRepository;

  private animationStart: number = 0;
  private heroSprites: Array<AnimatedSprite> = [];
  // private unitSprites: Array<{ sprite: AnimatedSprite; hex: Hexagon }> = [];

  constructor(spriteRepository: SpriteRepository, options: CanvasOptions) {
    super(options);

    this.spriteRepository = spriteRepository;
    this.animationStep = this.animationStep.bind(this);
  }

  public async setup() {
    this.heroSprites = [
      this.spriteRepository.get<AnimatedSprite>(SPRITE.heroes_undead)!,
      this.spriteRepository.get<AnimatedSprite>(SPRITE.heroes_undead_mirror)!,
    ];

    // this.unitSprites = await Promise.all(
    //   units.map(async (hex) => {
    //     const sprite = await new AnimatedSprite(wrathSprite).loadPromise;
    //     return { hex, sprite };
    //   })
    // );

    requestAnimationFrame(this.firstFrame.bind(this));
  }

  private firstFrame(timeStamp: DOMHighResTimeStamp) {
    this.animationStart = timeStamp;
    this.animationStep(timeStamp);
  }

  private animationStep(timeStamp: DOMHighResTimeStamp) {
    const delta = (timeStamp - this.animationStart) / 200;

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

    // this.unitSprites.forEach(({ sprite, hex }, index) => {
    //   sprite.drawFrame(this.ctx, 0, 0, 155, 138);
    //   sprite.currentFrame++;
    // });
  }
}

export default UnitsCanvas;
