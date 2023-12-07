import sprites from '../../constants/sprites';
import { Inject } from '../../decorators/inject';
import { Injectables } from '../../models/injection/injections';
import { SpriteRegistry } from '../../models/sprites/SpriteRegistry';
import UISprite from '../../models/sprites/UISprite';
import UIHeroAvatar from '../../models/ui/UIHeroAvatar';
import Canvas, { CanvasOptions } from './Canvas';

interface UICanvasOptions extends CanvasOptions {
  battleWidth: number;
  battleHeight: number;

  patternImage: string;
}

const border = 2;

class UICanvas extends Canvas<UICanvasOptions> {
  readonly options: UICanvasOptions;

  // @Inject(Injectables.Textures)
  // private spriteRegistry!: SpriteRegistry;

  constructor(canvas: HTMLCanvasElement, options: UICanvasOptions) {
    super(canvas, options);

    this.options = options;
  }

  public async setup() {
    await this.createPattern(this.options.patternImage);
    this.drawBorders();
    this.drawCornerGems();
    this.drawHeroAvatars();
  }

  private drawBorders() {
    const { width, height } = this.options.size;

    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#392715';
    this.ctx.strokeRect(0, 0, width, height);

    this.ctx.strokeStyle = '#b59442';
    this.ctx.strokeRect(1, 1, width - 2, height - 2);

    this.ctx.strokeStyle = '#e7ce8c';
    this.ctx.strokeRect(2, 2, width - 4, height - 4);
  }

  private drawCornerGems() {
    const { width, height } = this.options.size;
    // const result = this.spriteRegistry.get('corner_gems');
    // console.log('result :>> ', this.spriteRegistry);

    const cornerGemsSprite = new UISprite(sprites.corner_gems);

    const top = border;
    const bottom = height - sprites.corner_gems.height - border;
    const left = border;
    const right = width - sprites.corner_gems.width - border;

    cornerGemsSprite.drawFrame(this.ctx, 0, 0, left, top, 46, 45);
    cornerGemsSprite.drawFrame(this.ctx, 1, 0, right, top, 46, 45);
    cornerGemsSprite.drawFrame(this.ctx, 2, 0, left, bottom, 46, 45);
    cornerGemsSprite.drawFrame(this.ctx, 3, 0, right, bottom, 46, 45);
  }

  private drawHeroAvatars() {
    const { size, battleWidth, battleHeight } = this.options;
    const avatarSprite = new UISprite(sprites.hero_avatar_lg);

    const uiHeroWidth = 90;
    const border = 5;

    const options = {
      sx: (size.width - battleWidth) / 2 - uiHeroWidth - border,
      sy: (size.height - battleHeight) / 2,
      width: uiHeroWidth,
      avatarSprite,
    };

    const avatar = new UIHeroAvatar(this.ctx, options);
    avatar.draw();

    const options2 = {
      sx: (size.width + battleWidth) / 2 + border,
      sy: (window.innerHeight - battleHeight) / 2,
      width: uiHeroWidth,
      avatarSprite,
    };

    const avatar2 = new UIHeroAvatar(this.ctx, options2);
    avatar2.draw();
  }
}

export default UICanvas;
