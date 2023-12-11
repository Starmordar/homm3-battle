import Sprite from '@/models/sprites/Sprite';
import AnimatedSprite from '@/models/sprites/AnimatedSprite';
import UISprite from '@/models/sprites/UISprite';

import { IAnimatedSpriteOptions, ISpriteOptions } from '@/constants/sprites';

class SpriteFactory {
  constructor() {}

  public create(options: ISpriteOptions): Sprite {
    if (options.animations) {
      return new AnimatedSprite(options as IAnimatedSpriteOptions);
    }

    return new UISprite(options);
  }
}

export default SpriteFactory;
