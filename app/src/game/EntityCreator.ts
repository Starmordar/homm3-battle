import { AnimatedSprite, Assets } from 'pixi.js';

import { AnimationComponent } from '@/components/AnimationComponet';
import { DisplayComponent } from '@/components/DisplayComponent';
import { PositionComponent } from '@/components/PositionComponent';
import { Entity } from '@/core/Entity';
import { GridView } from '@/view/GridView';

import type { GameConfig } from './GameConfig';
import type { Engine } from '../core/Engine';
import type { Point } from '@/types';

class EntityCreator {
  private engine: Engine;
  private config: GameConfig;

  constructor(engine: Engine, config: GameConfig) {
    this.engine = engine;
    this.config = config;
  }

  public async createCreature({ sprite, position }: { sprite: string; position: Point }) {
    const assets = await Assets.load(sprite);

    const entity = new Entity(sprite)
      .add(new PositionComponent(position.x, position.y))
      .add(new AnimationComponent(new AnimatedSprite(assets.animations['standing'])));

    this.engine.addEntity(entity);
    return entity;
  }

  public createBoard() {
    const gridView = new GridView(this.config);

    const entity = new Entity('board')
      .add(new PositionComponent(0, 0))
      .add(new DisplayComponent(gridView));

    this.engine.addEntity(entity);
    return entity;
  }
}

export { EntityCreator };
