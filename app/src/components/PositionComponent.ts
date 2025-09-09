import type { Point } from '@/types';

class PositionComponent {
  position: Point;
  rotation: number = 0;

  constructor(x: number, y: number, rotation: number) {
    this.position = { x, y };
    this.rotation = rotation;
  }
}

export { PositionComponent };
