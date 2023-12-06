import { cornerGems, heroAvatar } from '../../constants/sprites';
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
    const cornerGemsSprite = new UISprite(this.ctx, cornerGems);

    const top = border;
    const bottom = height - cornerGems.height - border;
    const left = border;
    const right = width - cornerGems.width - border;

    cornerGemsSprite.drawFrame(0, 0, left, top);
    cornerGemsSprite.drawFrame(1, 0, right, top);
    cornerGemsSprite.drawFrame(2, 0, left, bottom);
    cornerGemsSprite.drawFrame(3, 0, right, bottom);
  }

  private drawHeroAvatars() {
    const { size, battleWidth, battleHeight } = this.options;
    const avatarSprite = new UISprite(this.ctx, heroAvatar);

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
