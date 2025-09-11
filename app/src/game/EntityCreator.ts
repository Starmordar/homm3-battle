import { AnimatedSprite, Assets } from 'pixi.js';

import { AnimationComponent } from '@/components/AnimationComponet';
import { PositionComponent } from '@/components/PositionComponent';
import { Entity } from '@/core/Entity';

import type { Engine } from '../core/Engine';
import type { Point } from '@/types';

class EntityCreator {
  private engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  public async createCreature({ sprite, position }: { sprite: string; position: Point }) {
    const assets = await Assets.load(sprite);

    const entity = new Entity(sprite)
      .add(new PositionComponent(position.x, position.y, 0))
      .add(new AnimationComponent(new AnimatedSprite(assets.animations['moving'])));

    this.engine.addEntity(entity);
    return entity;
  }
}

export { EntityCreator };
