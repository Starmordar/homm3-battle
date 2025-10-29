import { calcBattleLayout, createHexArray } from '@/core/board/utils';

import type { Hexagon, Layout, Point } from '@/core/board';

class BoardConfig {
  static readonly GRID_WIDTH = 15;
  static readonly GRID_HEIGHT = 11;
  static readonly HEX_COUNT = 19;

  static readonly BATTLE_WIDTH = 1000;
  static readonly BATTLE_HEIGHT = 680;

  battleLayout: Layout;
  hexes: Hexagon[];
  cornerMaps: Map<Hexagon, Point[]>;

  constructor() {
    this.initializeBoard();
  }

  private initializeBoard() {
    this.battleLayout = calcBattleLayout({
      count: BoardConfig.HEX_COUNT,
      width: BoardConfig.BATTLE_WIDTH,
      height: BoardConfig.BATTLE_HEIGHT,
    });

    this.hexes = createHexArray({
      width: BoardConfig.GRID_WIDTH,
      height: BoardConfig.GRID_HEIGHT,
    });

    this.cornerMaps = this.getHexCornersMap();
  }

  private getHexCornersMap(): Map<Hexagon, Point[]> {
    const map = new Map();

    this.hexes.forEach((hex) => {
      map.set(hex, this.battleLayout.hexToCorners(hex));
    });

    return map;
  }
}

export { BoardConfig };
