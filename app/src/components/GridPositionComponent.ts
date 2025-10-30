import type { Hexagon } from '@/core/board';

class GridPositionComponent {
  hexagon: Hexagon;

  constructor(hexagon: Hexagon) {
    this.hexagon = hexagon;
  }
}

export { GridPositionComponent };
