import Sprite from '@/view/sprites/Sprite';
import { Texture } from '@/constants/textures/types';
import { HERO_SPRITES } from '@/constants/textures/heroes';

class HeroSprite extends Sprite<Texture<HERO_SPRITES>> {
  currentAnimation: HERO_SPRITES;

  private currentFrame = 0;
  private nextAnimation: HERO_SPRITES;
  private animationSteps: { y: number; x: Array<number> };

  constructor(options: Texture<HERO_SPRITES>) {
    super(options);

    this.nextAnimation = HERO_SPRITES.idle;
    this.currentAnimation = HERO_SPRITES.idle;
    this.animationSteps = this.options.textures![this.currentAnimation];
  }

  setNextFrame() {
    this.currentFrame++;

    if (this.currentFrame >= this.animationSteps.x.length) {
      this.currentFrame = 0;
      this.currentAnimation = this.nextAnimation;
      this.nextAnimation = this.pickNextAnimation();

      this.animationSteps = this.options.textures![this.currentAnimation];
    }
  }

  private pickNextAnimation(): HERO_SPRITES {
    return Math.random() < 0.1 ? HERO_SPRITES.active : HERO_SPRITES.idle;
  }

  drawFrame(
    ctx: CanvasRenderingContext2D,
    frameY: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ) {
    ctx.drawImage(
      this.image,
      this.animationSteps.x[this.currentFrame] * this.options.width,
      frameY * this.options.height,
      this.options.width,
      this.options.height,
      dx,
      dy,
      dw,
      dh
    );
  }
}

export default HeroSprite;
