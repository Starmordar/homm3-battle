import Sprite from '@/view/sprites/Sprite';
import AnimatedSprite from '@/view/sprites/AnimatedSprite';
import UISprite from '@/view/sprites/UISprite';
import MonsterSprite from '@/view/sprites/MonsterSprite';

import type { SpriteOptions, AnimatedSpriteOptions } from '@/constants/sprites';
import type { MonsterTexture } from '@/types';

class SpriteFactory {
  constructor() {}

  public create(options: SpriteOptions): Sprite {
    if (options.animations) {
      return new AnimatedSprite(options as AnimatedSpriteOptions);
    }
    if (options.sprites) {
      return new MonsterSprite(options as MonsterTexture);
    }

    return new UISprite(options);
  }
}

export default SpriteFactory;
