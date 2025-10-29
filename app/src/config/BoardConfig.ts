import {
  generateBattleLayout,
  generateHexagonList,
  generateHexagonCornersMap,
} from '@/core/board/utils';

import type { Hexagon, Layout, Point } from '@/core/board';

class BoardConfig {
  static readonly BOARD_WIDTH_HEX = 15;
  static readonly BOARD_HEIGHT_HEX = 11;

  static readonly BOARD_WIDTH_PX = 1000;
  static readonly BOARD_HEIGHT_PX = 580;

  static readonly SCREEN_WIDTH = window.innerWidth;
  static readonly SCREEN_HEIGHT = window.innerHeight;

  layout: Layout;
  hexagonList: Hexagon[];
  hexagonCornersMap: Map<Hexagon, Point[]>;

  constructor() {
    this.initializeBoard();
  }

  private initializeBoard() {
    this.layout = generateBattleLayout({
      hexagonCount: Math.max(BoardConfig.BOARD_WIDTH_HEX, BoardConfig.BOARD_HEIGHT_HEX),

      boardWidth: BoardConfig.BOARD_WIDTH_PX,
      boardHeight: BoardConfig.BOARD_HEIGHT_PX,

      screenWidth: BoardConfig.SCREEN_WIDTH,
      screenHeight: BoardConfig.SCREEN_HEIGHT,
    });

    this.hexagonList = generateHexagonList({
      width: BoardConfig.BOARD_WIDTH_HEX,
      height: BoardConfig.BOARD_HEIGHT_HEX,
    });

    this.hexagonCornersMap = generateHexagonCornersMap(this.hexagonList, this.layout);
  }
}

export { BoardConfig };
