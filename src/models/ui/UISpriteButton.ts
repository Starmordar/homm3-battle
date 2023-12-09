import UISprite from '../sprites/UISprite';

interface IUIButtonSettings {
  height: number;
  width: number;

  dx: number;
  dy: number;
}

class UISpriteButton {
  private readonly settings: IUIButtonSettings;

  constructor(settings: IUIButtonSettings) {
    this.settings = settings;
  }

  public draw(ctx: CanvasRenderingContext2D, sprite: UISprite) {
    const { dx, dy, width, height } = this.settings;

    sprite.drawFrame(ctx, 0, 0, dx, dy, width, height);
  }
}

export default UISpriteButton;
