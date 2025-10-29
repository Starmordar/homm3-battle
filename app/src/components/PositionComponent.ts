import type { Point } from '@/types';

class PositionComponent {
  position: Point;

  constructor(x: number, y: number) {
    this.position = { x, y };
  }
}

export { PositionComponent };
