import { AnimationComponent } from '@/components/AnimationComponet';
import { PositionComponent } from '@/components/PositionComponent';

import type { System } from './System';
import type { Entity } from '@/entities/Entity';
import type { Container } from 'pixi.js';

class AnimationSystem implements System {
  container: Container;
  entities: Entity[] = [];

  constructor(container: Container) {
    this.container = container;
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  public update() {
    for (const entity of this.entities) {
      const position = entity.get(PositionComponent);
      const animation = entity.get(AnimationComponent);

      if (!position || !animation) continue;

      animation.animatedSprite.x = position.position.x;
      animation.animatedSprite.y = position.position.y;
      animation.animatedSprite.animationSpeed = 0.1;

      if (animation.animatedSprite.playing) continue;
      animation.animatedSprite.play();
    }
  }
}

export { AnimationSystem };
