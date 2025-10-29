import { BoardConfig } from './BoardConfig';

class GameConfig {
  boardConfig: BoardConfig;

  constructor() {
    this.boardConfig = new BoardConfig();
  }
}

export { GameConfig };
