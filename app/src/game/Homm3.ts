import { Hexagon } from '@/core/board';
import { AnimationSystem } from '@/systems/AnimationSystem';
import { GridPositionSystem } from '@/systems/GridPositionSystem';
import { RenderSystem } from '@/systems/RenderSystem';

import { GameConfig } from '../config/GameConfig';
import { Engine } from '../core/Engine';

import { EntityCreator } from './EntityCreator';

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

    this.engine.addSystem(new GridPositionSystem(this.config));
    this.engine.addSystem(new RenderSystem(this.app.stage));
    this.engine.addSystem(new AnimationSystem(this.app.stage));

    const gridView = creator.createBoard();
    console.log('gridView :>> ', gridView);

    const dragon = await creator.createCreature({
      sprite: 'spritesheets/CDDRAG.json',
      position: new Hexagon(-7, 0, 7),
    });
    console.log('dragon :>> ', dragon);

    const angel = await creator.createCreature({
      sprite: 'spritesheets/CRANGL.json',
      position: new Hexagon(-5, -4, 9),
    });
    console.log('angel :>> ', angel);

    const archer = await creator.createCreature({
      sprite: 'spritesheets/CHCBOW.json',
      position: new Hexagon(-9, 4, 5),
    });
    console.log('archer :>> ', archer);
  }

  start() {
    this.app.ticker.add(() => {
      this.engine.update();
    });
  }
}

export { Homm3 };
