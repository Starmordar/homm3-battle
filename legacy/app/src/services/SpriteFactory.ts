import Sprite from '@/view/sprites/Sprite';
import StaticSprite from '@/view/sprites/StaticSprite';
import MonsterSprite from '@/view/sprites/MonsterSprite';
import HeroSprite from '@/view/sprites/HeroSprite';

import { StaticTexture, TEXTURE_TYPE, Texture } from '@/constants/textures/types';
import type { MONSTER_SPRITES } from '@/constants/textures/monsters';
import { HERO_SPRITES } from '@/constants/textures/heroes';

class SpriteFactory {
  constructor() {}

  create(options: StaticTexture, type?: TEXTURE_TYPE): Sprite<StaticTexture> {
    switch (type) {
      case TEXTURE_TYPE.hero:
        return new HeroSprite(options as Texture<HERO_SPRITES>);
      case TEXTURE_TYPE.monster:
        return new MonsterSprite(options as Texture<MONSTER_SPRITES>);
      case TEXTURE_TYPE.static:
        return new StaticSprite(options);
      default:
        return new StaticSprite(options);
    }
  }
}

export default SpriteFactory;
