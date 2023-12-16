import Sprite from '@/view/sprites/Sprite';
import AnimatedSprite from '@/models/sprites/AnimatedSprite';
import UISprite from '@/models/sprites/UISprite';

import { AnimatedSpriteOptions, SpriteOptions } from '@/constants/sprites';

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
