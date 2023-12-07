import { uiSprites } from '../constants/sprites';
import SpriteRegistry from '../models/sprites/SpriteRegistry';
import UISprite from '../models/sprites/UISprite';

type IUISpriteKey = keyof typeof uiSprites;

class ResourceController {
  private readonly spriteRegistry: SpriteRegistry;

  constructor(spriteRegistry: SpriteRegistry) {
    this.spriteRegistry = spriteRegistry;
  }

  // public loadSprites() {

  // }

  public loadUISprites(): Promise<Array<UISprite>> {
    const promises = Object.keys(uiSprites).map((spriteKey) => {
      const sprite = new UISprite(uiSprites[spriteKey as IUISpriteKey]);
      this.spriteRegistry.register(spriteKey, sprite);

      return sprite.loadPromise;
    });

    return Promise.all(promises);
  }
}

export default ResourceController;
