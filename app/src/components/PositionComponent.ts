import type { Point } from '@/types';

class PositionComponent {
  position: Point;

  constructor(x: number = 0, y: number = 0) {
    this.position = { x, y };
  }
}

export { PositionComponent };
