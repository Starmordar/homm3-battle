import { GridPositionAspect } from '@/aspects/GridPositionAspect';

import type { System } from '../core/System';
import type { GameConfig } from '@/config/GameConfig';
import type { Engine } from '@/core/Engine';

class GridPositionSystem implements System {
  config: GameConfig;

  private aspects: GridPositionAspect[] = [];

  constructor(config: GameConfig) {
    this.config = config;
  }

  public addToEngine(engine: Engine): void {
    const aspectList = engine.getAspectList(GridPositionAspect);
    this.aspects = aspectList.aspects;
  }

  public update() {
    for (const aspect of this.aspects) {
      const position = aspect.position;
      const gridPosition = aspect.gridPosition;

      const positionFromHex = this.config.boardConfig.layout.hexToPixel(gridPosition.hexagon);
      position.position.x = positionFromHex.x;
      position.position.y = positionFromHex.y;
    }
  }

  public removeFromEngine(): void {
    this.aspects = [];
  }
}

export { GridPositionSystem };
