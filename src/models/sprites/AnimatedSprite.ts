import Sprite from '@/models/sprites/Sprite';
import type { AnimatedSpriteOptions, SpriteAnimation } from '@/constants/sprites';

const defaultAnimation: keyof SpriteAnimation = 'idle';

class AnimatedSprite extends Sprite<AnimatedSpriteOptions> {
  private _currentFrame = 0;

  private _nextAnimation: keyof SpriteAnimation = defaultAnimation;
  private _currentAnimation: keyof SpriteAnimation = defaultAnimation;
  private _animationSteps: Array<number> = [];

  constructor(options: AnimatedSpriteOptions) {
    super(options);

    this._animationSteps = this.options.animations[this._currentAnimation] as Array<number>;
  }

  get currentFrame() {
    return this._currentFrame;
  }

  set currentFrame(frame: number) {
    this._currentFrame = frame;

    if (this._currentFrame >= this._animationSteps.length) {
      this._currentFrame = 0;
      this._currentAnimation = this._nextAnimation;
      this._nextAnimation = defaultAnimation;

      this._animationSteps = this.options.animations[this._currentAnimation] as Array<number>;
    }
  }

  set nextAnimation(mode: keyof SpriteAnimation) {
    if (!this.options.animations[mode]) return;

    this._nextAnimation = mode;
  }

  public drawFrame(
    ctx: CanvasRenderingContext2D,
    fy: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ) {
    ctx.drawImage(
      this.image,
      this._animationSteps[this._currentFrame] * this.options.width,
      fy * this.options.height,
      this.options.width,
      this.options.height,
      dx,
      dy,
      dw,
      dh
    );
  }
}

export default AnimatedSprite;
