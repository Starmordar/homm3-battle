import Sprite from './Sprite';
import AnimatedSprite from './AnimatedSprite';
import UISprite from './UISprite';

import { IAnimatedSpriteOptions, ISpriteOptions } from '../../constants/sprites';

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