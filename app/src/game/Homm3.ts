import { RenderSystem } from '@/systems/RenderSystem';

import { Engine } from '../core/Engine';

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

    this.engine.addSystem(new RenderSystem(this.app.stage));

    const dragon = await creator.createCreature({
      sprite: 'spritesheets/CDDRAG.json',
      position: { x: 250, y: this.app.screen.height / 2 + 200 },
    });
    console.log('dragon :>> ', dragon);

    const angel = await creator.createCreature({
      sprite: 'spritesheets/CRANGL.json',
      position: { x: 450, y: this.app.screen.height / 2 + 200 },
    });
    console.log('angel :>> ', angel);
  }

  start() {
    this.app.ticker.add(() => {
      this.engine.update();
    });
  }
}

export { Homm3 };
