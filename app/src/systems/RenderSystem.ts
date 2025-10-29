import { RenderAspect } from '@/aspects/RenderAspect';
import { castArray } from '@/utils/castArray';

import type { System } from '../core/System';
import type { Engine } from '@/core/Engine';
import type { Entity } from '@/core/Entity';
import type { Container } from 'pixi.js';

class RenderSystem implements System {
  container: Container;
  entities: Entity[] = [];

  constructor(container: Container) {
    this.container = container;
  }

  public addToEngine(engine: Engine): void {
    const aspectList = engine.getAspectList(RenderAspect);

    for (const aspect of aspectList.aspects) {
      this.addToDisplay(aspect);
    }

    aspectList.aspectAdded = this.addToDisplay.bind(this);
    aspectList.aspectRemoved = this.removeFromDisplay.bind(this);
  }

  public update() {}

  public removeFromEngine(): void {}

  private addToDisplay(aspect: RenderAspect) {
    const graphics = castArray(aspect.display.view.graphics);
    graphics.forEach((graphic) => this.container.addChild(graphic));
  }

  private removeFromDisplay(aspect: RenderAspect) {
    const graphics = castArray(aspect.display.view.graphics);
    graphics.forEach((graphic) => graphic.destroy());
  }
}

export { RenderSystem };
