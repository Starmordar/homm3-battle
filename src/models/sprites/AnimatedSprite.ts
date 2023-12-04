import Sprite, { ISpriteOptions } from './Sprite';

export interface IAnimatedSpriteOptions extends ISpriteOptions {
  animations: Array<number>;
  animationSpeed: number;
}

class AnimatedSprite extends Sprite<IAnimatedSpriteOptions> {
  readonly options: IAnimatedSpriteOptions;
  private _currentFrame = 0;

  constructor(ctx: CanvasRenderingContext2D, options: IAnimatedSpriteOptions) {
    super(ctx, options);

    this.options = options;
  }

  get currentFrame() {
    return this._currentFrame;
  }

  set currentFrame(frameIndex: number) {
    this._currentFrame = frameIndex;

    if (this._currentFrame >= this.options.animations.length) {
      this._currentFrame = 0;
    }
  }

  public drawFrame(canvasX: number, canvasY: number) {
    this.ctx.drawImage(
      this.image,
      this.options.animations[this._currentFrame] * this.options.width,
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
