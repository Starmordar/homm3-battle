import { AnimationComponent } from '@/components/AnimationComponet';

import type { System } from './System';
import type { Entity } from '@/entities/Entity';
import type { Container } from 'pixi.js';

class RenderSystem implements System {
  container: Container;
  entities: Entity[] = [];

  constructor(container: Container) {
    this.container = container;
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
    this.addToDisplay(entity);
  }

  addToDisplay(entity: Entity) {
    const animation = entity.get(AnimationComponent);
    if (!animation) return;

    this.container.addChild(animation.animatedSprite);
  }

  public update() {}
}

export { RenderSystem };
