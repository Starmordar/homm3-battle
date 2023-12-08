import { uiSprites, animatedSprites, type ISpriteOptions } from '../constants/sprites';
import Sprite from '../models/sprites/Sprite';
import SpriteFactory from '../models/sprites/SpriteFactory';
import SpriteRepository from '../models/sprites/SpriteRepository';

class ResourceController {
  private readonly spriteRegistry: SpriteRepository;
  private readonly spriteFactory: SpriteFactory;

  constructor(spriteRegistry: SpriteRepository, spriteFactory: SpriteFactory) {
    this.spriteRegistry = spriteRegistry;
    this.spriteFactory = spriteFactory;
  }

  public load() {
    return Promise.all([this.loadSprites(uiSprites), this.loadSprites(animatedSprites)]);
  }

  private async loadSprites(options: Record<string, ISpriteOptions>): Promise<Array<Sprite>> {
    const promises = Object.keys(options).map((key) => {
      const sprite = this.spriteFactory.create(options[key as keyof typeof options]);

      this.spriteRegistry.register(key, sprite);
      return sprite.loadPromise;
    });

    return Promise.all(promises);
  }
}

export default ResourceController;
