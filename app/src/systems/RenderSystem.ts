import { AnimatedPositionAspect } from '@/aspects/AnimatedPositionAspect';

import type { System } from '../core/System';
import type { Engine } from '@/core/Engine';
import type { Entity } from '@/core/Entity';
import type { Container } from 'pixi.js';

class RenderSystem implements System {
  container: Container;
  entities: Entity[] = [];

  private aspects: AnimatedPositionAspect[] = [];

  constructor(container: Container) {
    this.container = container;
  }

  public addToEngine(engine: Engine): void {
    const aspectList = engine.getAspectList(AnimatedPositionAspect);

    for (const aspect of aspectList.aspects) {
      this.addToDisplay(aspect);
    }

    aspectList.aspectAdded = this.addToDisplay.bind(this);
    aspectList.aspectRemoved = this.removeFromDisplay.bind(this);
    this.aspects = aspectList.aspects;
  }

  public update() {
    for (const aspect of this.aspects) {
      const position = aspect.position;
      const animation = aspect.animation;

      if (!position || !animation) continue;

      animation.animatedSprite.x = position.position.x;
      animation.animatedSprite.y = position.position.y;
      animation.animatedSprite.animationSpeed = 0.1;
    }
  }

  public removeFromEngine(): void {
    this.aspects = [];
  }

  private addToDisplay(aspect: AnimatedPositionAspect) {
    const animation = aspect.animation;

    this.container.addChild(animation.animatedSprite);
    animation.animatedSprite.play();
  }

  private removeFromDisplay(aspect: AnimatedPositionAspect) {
    const animation = aspect.animation;

    this.container.removeChild(animation.animatedSprite);
    animation.animatedSprite.stop();
  }
}

export { RenderSystem };
