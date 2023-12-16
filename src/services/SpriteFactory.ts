import Sprite from '@/view/sprites/Sprite';
import AnimatedSprite from '@/view/sprites/AnimatedSprite';
import UISprite from '@/view/sprites/UISprite';

import type { SpriteOptions, AnimatedSpriteOptions } from '@/constants/sprites';

class SpriteFactory {
  constructor() {}

  public create(options: SpriteOptions): Sprite {
    if (options.animations) {
      return new AnimatedSprite(options as AnimatedSpriteOptions);
    }

    return new UISprite(options);
  }
}

export default SpriteFactory;
