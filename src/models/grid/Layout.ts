import Point from './Point';
import Hexagon from './Hexagon';
import OrientationMatrix from './OrientationMatrix';

class Layout {
  constructor(
    readonly orientation: OrientationMatrix,
    readonly size: Point,
    readonly origin: Point,
  ) {
    this.orientation = orientation;
    this.size = size;
    this.origin = origin;
  }

  hexToPixel(hex: Hexagon): Point {
    const x = (this.orientation.f00 * hex.q + this.orientation.f10 * hex.r) * this.size.x;
    const y = (this.orientation.f01 * hex.q + this.orientation.f11 * hex.r) * this.size.y;

    return new Point(x + this.origin.x, y + this.origin.y);
  }

  pixelToHex(point: Point): Hexagon {
    const pt = new Point(
      (point.x - this.origin.x) / this.size.x,
      (point.y - this.origin.y) / this.size.y,
    );

    const q = this.orientation.b00 * pt.x + this.orientation.b10 * pt.y;
    const r = this.orientation.b01 * pt.x + this.orientation.b11 * pt.y;

    return new Hexagon(q, r, -q - r);
  }

  hexCornerOffset(corner: number): Point {
    const angle = (2.0 * Math.PI * (this.orientation.startAngle - corner)) / 6.0;
    return new Point(this.size.x * Math.cos(angle), this.size.y * Math.sin(angle));
  }

  hexToCorners(hex: Hexagon): Array<Point> {
    const center = this.hexToPixel(hex);
    const corners = [];

    for (let i = 0; i < 6; i++) {
      const offset = this.hexCornerOffset(i);
      corners.push(new Point(center.x + offset.x, center.y + offset.y));
    }
    return corners;
  }

  static pointyOnTop: OrientationMatrix = new OrientationMatrix(
    Math.sqrt(3.0),
    Math.sqrt(3.0) / 2.0,
    0.0,
    3.0 / 2.0,
    Math.sqrt(3.0) / 3.0,
    -1.0 / 3.0,
    0.0,
    2.0 / 3.0,
    0.5,
  );

  static flatOnTop: OrientationMatrix = new OrientationMatrix(
    3.0 / 2.0,
    0.0,
    Math.sqrt(3.0) / 2.0,
    Math.sqrt(3.0),
    2.0 / 3.0,
    0.0,
    -1.0 / 3.0,
    Math.sqrt(3.0) / 3.0,
    0.0,
  );
}

export default Layout;
