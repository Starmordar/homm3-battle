import { AnimationSystem } from '@/systems/AnimationSystem';
import { RenderSystem } from '@/systems/RenderSystem';

import { Engine } from '../core/Engine';

import { EntityCreator } from './EntityCreator';
import { GameConfig } from './GameConfig';

import type { Application } from 'pixi.js';

class Homm3 {
  private app: Application;
  private engine: Engine;
  private config: GameConfig;

  constructor(app: Application) {
    this.app = app;
    this.setup();
  }

  async setup() {
    this.engine = new Engine();
    this.config = new GameConfig();
    const creator = new EntityCreator(this.engine, this.config);

    this.engine.addSystem(new RenderSystem(this.app.stage));
    this.engine.addSystem(new AnimationSystem(this.app.stage));

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

    const archer = await creator.createCreature({
      sprite: 'spritesheets/CHCBOW.json',
      position: { x: 800, y: this.app.screen.height / 2 + 200 },
    });
    console.log('archer :>> ', archer);

    const gridView = creator.createBoard();
    console.log('gridView :>> ', gridView);
  }

  start() {
    this.app.ticker.add(() => {
      this.engine.update();
    });
  }
}

export { Homm3 };
