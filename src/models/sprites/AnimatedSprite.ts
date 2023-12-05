import Sprite, { ISpriteOptions } from './Sprite';

export interface ISpriteAnimation {
  idle: Array<number>;
  active?: Array<number>;
  attack?: Array<number>;
}
export interface IAnimatedSpriteOptions extends ISpriteOptions {
  animations: ISpriteAnimation;
}

const defaultAnimation: keyof ISpriteAnimation = 'idle';

class AnimatedSprite extends Sprite<IAnimatedSpriteOptions> {
  private _currentFrame = 0;

  private _nextAnimation: keyof ISpriteAnimation = defaultAnimation;
  private _currentAnimation: keyof ISpriteAnimation = defaultAnimation;
  private _animationSteps: Array<number> = [];

  constructor(ctx: CanvasRenderingContext2D, options: IAnimatedSpriteOptions) {
    super(ctx, options);

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

  public drawFrame(canvasX: number, canvasY: number) {
    this.ctx.drawImage(
      this.image,
      this._animationSteps[this._currentFrame] * this.options.width,
      0 * this.options.height,
      this.options.width,
      this.options.height,
      canvasX,
      canvasY,
      this.options.canvasWidth,
      this.options.canvasHeight
    );
  }
}

export default AnimatedSprite;
