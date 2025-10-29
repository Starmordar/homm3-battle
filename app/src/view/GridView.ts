import { Graphics } from 'pixi.js';

import type { View } from './View';
import type { GameConfig } from '@/game/GameConfig';

class GridView implements View {
  graphics: Graphics;

  constructor(config: GameConfig) {
    console.log('config :>> ', config);

    this.graphics = new Graphics().rect(50, 50, 100, 100).fill(0xff0000);
  }
}

export { GridView };
