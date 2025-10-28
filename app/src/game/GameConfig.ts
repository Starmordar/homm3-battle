import { calcBattleLayout, createHexArray } from '@/core/board/utils';

import type { Hexagon, Layout } from '@/core/board';

class GameConfig {
  static readonly GRID_WIDTH = 15;
  static readonly GRID_HEIGHT = 11;
  static readonly HEX_COUNT = 22;

  static readonly BATTLE_WIDTH = 1000;
  static readonly BATTLE_HEIGHT = 680;

  battleLayout: Layout;
  hexes: Hexagon[];

  constructor() {
    this.setup();
  }

  private setup() {
    this.battleLayout = calcBattleLayout({
      count: GameConfig.HEX_COUNT,
      width: GameConfig.BATTLE_WIDTH,
      height: GameConfig.BATTLE_HEIGHT,
    });

    this.hexes = createHexArray({
      width: GameConfig.GRID_WIDTH,
      height: GameConfig.GRID_HEIGHT,
    });

    console.log('this.battleLayout :>> ', this.battleLayout);
    console.log('this.hexes :>> ', this.hexes);
  }
}

export { GameConfig };
