import Sprite from '../view/sprites/Sprite';
import SpriteFactory from './SpriteFactory';
import { Textures } from './SpriteRepository';

import { fetchHeroClasses, fetchHeroes } from '@/api/settings';
import { staticTextures } from '@/constants/textures/static';
import type { DataSettings } from '@/types';
import type { StaticTexture, TEXTURE_TYPE } from '@/constants/textures/types';

class ResourceController {
  private readonly spriteFactory: SpriteFactory;

  constructor() {
    this.spriteFactory = new SpriteFactory();
  }

  load() {
    return Promise.all([this.loadSprites(staticTextures)]);
  }

  loadSprite(key: string, options: StaticTexture): Promise<Sprite<StaticTexture>> {
    const sprite = this.spriteFactory.create(options);

    Textures.register(key, sprite);
    return sprite.load;
  }

  async loadSprites(
    options: Record<string, StaticTexture>,
    type?: TEXTURE_TYPE
  ): Promise<Array<Sprite<StaticTexture>>> {
    const promises = Object.keys(options).map((key) => {
      const sprite = this.spriteFactory.create(options[key as keyof typeof options], type);

      Textures.register(key, sprite);
      return sprite.load;
    });

    return Promise.all(promises);
  }

  async loadSettings(): Promise<DataSettings> {
    const [heroes, heroClasses] = await Promise.all([fetchHeroes(), fetchHeroClasses()]);
    return { heroes, heroClasses };
  }
}

export default ResourceController;
