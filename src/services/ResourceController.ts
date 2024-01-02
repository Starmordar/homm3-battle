import { uiSprites, animatedSprites, type SpriteOptions } from '../constants/sprites';
import Sprite from '../view/sprites/Sprite';
import SpriteFactory from './SpriteFactory';
import SpriteRepository from './SpriteRepository';

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

  // sprite + uuid
  public loadSprite(key: string, options: SpriteOptions): Promise<Sprite> {
    const sprite = this.spriteFactory.create(options);

    this.spriteRegistry.register(key, sprite);
    return sprite.load;
  }

  public async loadSprites(options: Record<string, SpriteOptions>): Promise<Array<Sprite>> {
    const promises = Object.keys(options).map((key) => {
      const sprite = this.spriteFactory.create(options[key as keyof typeof options]);

      this.spriteRegistry.register(key, sprite);
      return sprite.load;
    });

    return Promise.all(promises);
  }
}

export default ResourceController;
