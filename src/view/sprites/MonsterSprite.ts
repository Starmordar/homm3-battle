import Sprite from '@/view/sprites/Sprite';
import { MONSTER_SPRITES } from '@/constants/textures/monsters';
import { Texture } from '@/constants/textures/types';

class MonsterSprite extends Sprite<Texture<MONSTER_SPRITES>> {
  currentAnimation: MONSTER_SPRITES;

  private currentFrame = 0;
  private nextAnimation: MONSTER_SPRITES;
  private animationSteps: { y: number; x: Array<number> };

  constructor(options: Texture<MONSTER_SPRITES>) {
    super(options);

    this.nextAnimation = MONSTER_SPRITES.standing;
    this.currentAnimation = MONSTER_SPRITES.standing;
    this.animationSteps = this.options.textures![this.currentAnimation];
  }

  get isLastFrame() {
    const xLength = this.animationSteps.x.length - 1;
    return this.currentFrame >= xLength;
  }

  setNextFrame() {
    this.currentFrame++;

    if (this.currentFrame >= this.animationSteps.x.length) {
      this.currentFrame = 0;
      this.currentAnimation = this.nextAnimation;
      this.nextAnimation = MONSTER_SPRITES.standing;

      this.animationSteps = this.options.textures![this.currentAnimation];
    }
  }

  setAnimation(sprite: MONSTER_SPRITES) {
    if (!this.options.textures?.[sprite]) return;

    this.currentFrame = 0;
    this.currentAnimation = sprite;
    this.nextAnimation = MONSTER_SPRITES.standing;

    this.animationSteps = this.options.textures![this.currentAnimation];
  }

  setNextAnimation(sprite: MONSTER_SPRITES) {
    if (!this.options.textures?.[sprite]) return;
    this.nextAnimation = sprite;
  }

  drawFrame(ctx: CanvasRenderingContext2D, dx: number, dy: number, dw: number, dh: number) {
    ctx.drawImage(
      this.image,
      this.animationSteps.x[this.currentFrame] * this.options.width,
      this.animationSteps.y * this.options.height,
      this.options.width,
      this.options.height,
      dx,
      dy,
      dw,
      dh
    );
  }
}

export default MonsterSprite;
