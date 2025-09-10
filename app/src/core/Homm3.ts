import { AnimationSystem } from '@/systems/AnimationSystem';
import { RenderSystem } from '@/systems/RenderSystem';

import { Engine } from './Engine';
import { EntityCreator } from './EntityCreator';

import type { Application } from 'pixi.js';

class Homm3 {
  private app: Application;
  private engine: Engine;

  constructor(app: Application) {
    this.app = app;
    this.setup();
  }

  async setup() {
    this.engine = new Engine();
    const creator = new EntityCreator(this.engine);

    const renderSystem = new RenderSystem(this.app.stage);
    const animationSystem = new AnimationSystem(this.app.stage);
    this.engine.addSystem(renderSystem);
    this.engine.addSystem(animationSystem);

    const creature1 = await creator.createCreature({
      sprite: 'spritesheets/CDDRAG.json',
      position: { x: 250, y: this.app.screen.height / 2 + 200 },
    });
    renderSystem.addEntity(creature1);
    animationSystem.addEntity(creature1);

    const creature2 = await creator.createCreature({
      sprite: 'spritesheets/CRANGL.json',
      position: { x: 450, y: this.app.screen.height / 2 + 200 },
    });
    renderSystem.addEntity(creature2);
    animationSystem.addEntity(creature2);
  }

  start() {
    this.app.ticker.add(() => {
      this.engine.update();
    });
  }
}

export { Homm3 };
