import { Graphics } from 'pixi.js';

import type { View } from './View';
import type { GameConfig } from '@/config/GameConfig';

class GridView implements View {
  graphics: Graphics[] = [];

  constructor(config: GameConfig) {
    for (const [, corners] of config.boardConfig.cornerMaps) {
      const graphics = new Graphics();
      const startPoint = corners[corners.length - 1];

      graphics.beginPath();

      graphics.moveTo(startPoint.x, startPoint.y);
      for (let i = 0; i < corners.length; i++) {
        graphics.lineTo(corners[i].x, corners[i].y);
      }

      graphics.strokeStyle = { width: 1, color: 'yellow' };
      graphics.stroke();

      this.graphics.push(graphics);
    }
  }
}

export { GridView };
