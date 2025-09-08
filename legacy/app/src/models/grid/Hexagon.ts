class Hexagon {
  // Cube coordinates derived from x,y,z cartesian coordinates, and use three axes q,r,s 120° apart.
  constructor(
    readonly q: number,
    readonly r: number,
    readonly s: number,
  ) {
    if (Math.round(q + r + s) !== 0) throw new Error('Invalid q + r + s must be 0');
  }

  add(hex: Hexagon): Hexagon {
    return new Hexagon(this.q + hex.q, this.r + hex.r, this.s + hex.s);
  }

  subtract(hex: Hexagon): Hexagon {
    return new Hexagon(this.q - hex.q, this.r - hex.r, this.s - hex.s);
  }

  scale(factor: number): Hexagon {
    return new Hexagon(this.q * factor, this.r * factor, this.s * factor);
  }

  rotateLeft(): Hexagon {
    return new Hexagon(-this.s, -this.q, -this.r);
  }

  rotateRight(): Hexagon {
    return new Hexagon(-this.r, -this.s, -this.q);
  }

  static direction(direction: number): Hexagon {
    return Hexagon.directions[direction];
  }

  neighbor(direction: number): Hexagon {
    return this.add(Hexagon.direction(direction));
  }

  diagonalNeighbor(direction: number): Hexagon {
    return this.add(Hexagon.diagonals[direction]);
  }

  len(): number {
    return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
  }

  distance(hex: Hexagon): number {
    return this.subtract(hex).len();
  }

  round(): Hexagon {
    let qi: number = Math.round(this.q);
    let ri: number = Math.round(this.r);
    let si: number = Math.round(this.s);

    const qDiff: number = Math.abs(qi - this.q);
    const rDiff: number = Math.abs(ri - this.r);
    const sDiff: number = Math.abs(si - this.s);

    if (qDiff > rDiff && qDiff > sDiff) qi = -ri - si;
    else if (rDiff > sDiff) ri = -qi - si;
    else si = -qi - ri;

    return new Hexagon(qi, ri, si);
  }

  lerp(hex: Hexagon, t: number): Hexagon {
    return new Hexagon(
      this.q * (1.0 - t) + hex.q * t,
      this.r * (1.0 - t) + hex.r * t,
      this.s * (1.0 - t) + hex.s * t,
    );
  }

  linedraw(hex: Hexagon): Array<Hexagon> {
    const distance = this.distance(hex);

    const nudge1 = new Hexagon(this.q + 0.000001, this.r + 0.000001, this.s - 0.000002);
    const nudge2 = new Hexagon(hex.q + 0.000001, hex.r + 0.000001, hex.s - 0.000002);

    const result: Array<Hexagon> = [];
    const step = 1.0 / Math.max(distance, 1);

    for (let i = 0; i <= distance; i++) {
      result.push(nudge1.lerp(nudge2, step * i).round());
    }
    return result;
  }

  toString(): string {
    return `${this.q},${this.r},${this.s}`;
  }

  static isEqual(hex1: Hexagon, hex2: Hexagon): boolean {
    return hex1.q === hex2.q && hex1.r === hex2.r && hex1.s === hex2.s;
  }

  static diagonals: Hexagon[] = [
    new Hexagon(2, -1, -1),
    new Hexagon(1, -2, 1),
    new Hexagon(-1, -1, 2),
    new Hexagon(-2, 1, 1),
    new Hexagon(-1, 2, -1),
    new Hexagon(1, 1, -2),
  ];

  static directions: Hexagon[] = [
    new Hexagon(1, 0, -1),
    new Hexagon(1, -1, 0),
    new Hexagon(0, -1, 1),
    new Hexagon(-1, 0, 1),
    new Hexagon(-1, 1, 0),
    new Hexagon(0, 1, -1),
  ];
}

export default Hexagon;
