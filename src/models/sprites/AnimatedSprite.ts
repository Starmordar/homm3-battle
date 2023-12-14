import Sprite from '@/models/sprites/Sprite';
import type { IAnimatedSpriteOptions, ISpriteAnimation } from '@/constants/sprites';

const defaultAnimation: keyof ISpriteAnimation = 'idle';

class AnimatedSprite extends Sprite<IAnimatedSpriteOptions> {
  private _currentFrame = 0;

  private _nextAnimation: keyof ISpriteAnimation = defaultAnimation;
  private _currentAnimation: keyof ISpriteAnimation = defaultAnimation;
  private _animationSteps: Array<number> = [];

  constructor(options: IAnimatedSpriteOptions) {
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

  set nextAnimation(mode: keyof ISpriteAnimation) {
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
