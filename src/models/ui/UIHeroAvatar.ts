import UISprite from '../sprites/UISprite';
import UIBlock from './UIBlock';

import { heroAvatar, panelBackground } from '../../constants/sprites';

interface IOptions {
  sx: number;
  sy: number;

  avatarSprite: UISprite;
  width?: number;
}

const defaultOptions = {
  width: 90,
};

class UIHeroAvatar {
  readonly ctx: CanvasRenderingContext2D;
  readonly options: Required<IOptions>;

  constructor(ctx: CanvasRenderingContext2D, options: IOptions) {
    this.ctx = ctx;
    this.options = { ...defaultOptions, ...options };
  }

  public draw() {
    this.drawAvatarImage();
    this.drawUIBlocks();
  }

  private drawAvatarImage() {
    const { sx, sy, width, avatarSprite } = this.options;

    avatarSprite.drawFrame(0, 0, sx, sy);

    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#e7ce8c';
    this.ctx.strokeRect(sx, sy, width, heroAvatar.canvasHeight);
  }

  private setTextDefault() {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '12px sans-serif';
    this.ctx.textBaseline = 'bottom';
  }

  private drawUIBlocks() {
    const { sx, width } = this.options;

    const lineHeight = 16;
    const textLeft = sx + 8;
    const textRight = sx + width - 6;

    let sy = this.options.sy + heroAvatar.canvasHeight;
    let height = 75;
    let textSy = sy + 5;

    const panelSprite = new UISprite(this.ctx, panelBackground);

    const statsUI = new UIBlock(this.ctx, { sx, sy, width, height });
    statsUI.draw(panelSprite);

    this.setTextDefault();

    this.ctx.textAlign = 'start';
    this.ctx.fillText('Att:', textLeft, textSy + lineHeight);
    this.ctx.fillText('Def:', textLeft, textSy + 2 * lineHeight);
    this.ctx.fillText('Pwr:', textLeft, textSy + 3 * lineHeight);
    this.ctx.fillText('Know:', textLeft, textSy + 4 * lineHeight);

    this.ctx.textAlign = 'right';
    this.ctx.fillText('5', textRight, textSy + lineHeight);
    this.ctx.fillText('8', textRight, textSy + 2 * lineHeight);
    this.ctx.fillText('1', textRight, textSy + 3 * lineHeight);
    this.ctx.fillText('4', textRight, textSy + 4 * lineHeight);

    sy = sy + height;
    height = 45;
    textSy = sy + 7;

    const moraleUI = new UIBlock(this.ctx, { sx, sy, width, height });
    moraleUI.draw(panelSprite);

    this.setTextDefault();

    this.ctx.textAlign = 'start';
    this.ctx.fillText('Morale:', textLeft, textSy + lineHeight);
    this.ctx.fillText('Luck', textLeft, textSy + 2 * lineHeight);

    this.ctx.textAlign = 'right';
    this.ctx.fillText('1', textRight, textSy + lineHeight);
    this.ctx.fillText('3', textRight, textSy + 2 * lineHeight);

    sy = sy + height;
    height = 45;
    textSy = sy + 7;

    const manaUI = new UIBlock(this.ctx, { sx, sy, width, height });
    manaUI.draw(panelSprite);

    this.setTextDefault();

    this.ctx.textAlign = 'center';
    this.ctx.fillText('Spell Points', sx + 45, textSy + lineHeight);
    this.ctx.fillText('24/40', sx + 45, textSy + 2 * lineHeight);
  }
}

export default UIHeroAvatar;
