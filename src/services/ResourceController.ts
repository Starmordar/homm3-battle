import Sprite from '../view/sprites/Sprite';
import SpriteFactory from './SpriteFactory';
import SpriteRepository from './SpriteRepository';

import { staticTextures } from '@/constants/textures/static';
import type { StaticTexture, TEXTURE_TYPE } from '@/constants/textures/types';

class ResourceController {
  private readonly spriteRegistry: SpriteRepository;
  private readonly spriteFactory: SpriteFactory;

  constructor(spriteRegistry: SpriteRepository, spriteFactory: SpriteFactory) {
    this.spriteRegistry = spriteRegistry;
    this.spriteFactory = spriteFactory;
  }

  load() {
    return Promise.all([this.loadSprites(staticTextures)]);
  }

  loadSprite(key: string, options: StaticTexture): Promise<Sprite<StaticTexture>> {
    const sprite = this.spriteFactory.create(options);

    this.spriteRegistry.register(key, sprite);
    return sprite.load;
  }

  async loadSprites(
    options: Record<string, StaticTexture>,
    type?: TEXTURE_TYPE
  ): Promise<Array<Sprite<StaticTexture>>> {
    const promises = Object.keys(options).map((key) => {
      const sprite = this.spriteFactory.create(options[key as keyof typeof options], type);

      this.spriteRegistry.register(key, sprite);
      return sprite.load;
    });

    return Promise.all(promises);
  }
}

export default ResourceController;
