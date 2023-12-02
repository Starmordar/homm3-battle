import Point from './Point';
import Hex from './Hex';
import Orientation from './Orientation';

class Layout {
  constructor(readonly orientation: Orientation, readonly size: Point, readonly origin: Point) {
    this.orientation = orientation;
    this.size = size;
    this.origin = origin;
  }

  hexToPixel(hex: Hex): Point {
    const x = (this.orientation.f0 * hex.q + this.orientation.f1 * hex.r) * this.size.x;
    const y = (this.orientation.f2 * hex.q + this.orientation.f3 * hex.r) * this.size.y;

    return new Point(x + this.origin.x, y + this.origin.y);
  }

  pixelToHex(point: Point): Hex {
    const pt = new Point(
      (point.x - this.origin.x) / this.size.x,
      (point.y - this.origin.y) / this.size.y
    );

    const q = this.orientation.b0 * pt.x + this.orientation.b1 * pt.y;
    const r = this.orientation.b2 * pt.x + this.orientation.b3 * pt.y;

    return new Hex(q, r, -q - r);
  }

  hexCornerOffset(corner: number): Point {
    const angle = (2.0 * Math.PI * (this.orientation.start_angle - corner)) / 6.0;
    return new Point(this.size.x * Math.cos(angle), this.size.y * Math.sin(angle));
  }

  getHexCorners(hex: Hex): Array<Point> {
    const center = this.hexToPixel(hex);
    const corners = [];

    for (let i = 0; i < 6; i++) {
      const offset = this.hexCornerOffset(i);
      corners.push(new Point(center.x + offset.x, center.y + offset.y));
    }
    return corners;
  }

  static pointy: Orientation = new Orientation(
    Math.sqrt(3.0),
    Math.sqrt(3.0) / 2.0,
    0.0,
    3.0 / 2.0,
    Math.sqrt(3.0) / 3.0,
    -1.0 / 3.0,
    0.0,
    2.0 / 3.0,
    0.5
  );

  static flat: Orientation = new Orientation(
    3.0 / 2.0,
    0.0,
    Math.sqrt(3.0) / 2.0,
    Math.sqrt(3.0),
    2.0 / 3.0,
    0.0,
    -1.0 / 3.0,
    Math.sqrt(3.0) / 3.0,
    0.0
  );
}

export default Layout;
