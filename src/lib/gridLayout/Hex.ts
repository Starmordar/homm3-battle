class Hex {
  // Cube coordinates derived from x,y,z cartesian coordinates, and use three axes q,r,s 120° apart.
  constructor(readonly q: number, readonly r: number, readonly s: number) {
    if (Math.round(q + r + s) !== 0) throw new Error('Invalid q + r + s must be 0');
  }

  add(hex: Hex): Hex {
    return new Hex(this.q + hex.q, this.r + hex.r, this.s + hex.s);
  }

  subtract(hex: Hex): Hex {
    return new Hex(this.q - hex.q, this.r - hex.r, this.s - hex.s);
  }

  scale(factor: number): Hex {
    return new Hex(this.q * factor, this.r * factor, this.s * factor);
  }

  rotateLeft(): Hex {
    return new Hex(-this.s, -this.q, -this.r);
  }

  rotateRight(): Hex {
    return new Hex(-this.r, -this.s, -this.q);
  }

  static direction(direction: number): Hex {
    return Hex.directions[direction];
  }

  neighbor(direction: number): Hex {
    return this.add(Hex.direction(direction));
  }

  diagonalNeighbor(direction: number): Hex {
    return this.add(Hex.diagonals[direction]);
  }

  len(): number {
    return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
  }

  distance(hex: Hex): number {
    return this.subtract(hex).len();
  }

  round(): Hex {
    let qi: number = Math.round(this.q);
    let ri: number = Math.round(this.r);
    let si: number = Math.round(this.s);

    const q_diff: number = Math.abs(qi - this.q);
    const r_diff: number = Math.abs(ri - this.r);
    const s_diff: number = Math.abs(si - this.s);

    if (q_diff > r_diff && q_diff > s_diff) qi = -ri - si;
    else if (r_diff > s_diff) ri = -qi - si;
    else si = -qi - ri;

    return new Hex(qi, ri, si);
  }

  lerp(hex: Hex, t: number): Hex {
    return new Hex(
      this.q * (1.0 - t) + hex.q * t,
      this.r * (1.0 - t) + hex.r * t,
      this.s * (1.0 - t) + hex.s * t
    );
  }

  linedraw(hex: Hex): Array<Hex> {
    const distance = this.distance(hex);

    const nudge_1 = new Hex(this.q + 0.000001, this.r + 0.000001, this.s - 0.000002);
    const nudge_2 = new Hex(hex.q + 0.000001, hex.r + 0.000001, hex.s - 0.000002);

    const result: Array<Hex> = [];
    const step = 1.0 / Math.max(distance, 1);

    for (let i = 0; i <= distance; i++) {
      result.push(nudge_1.lerp(nudge_2, step * i).round());
    }
    return result;
  }

  static isEqual(hex1: Hex, hex2: Hex): boolean {
    return hex1.q === hex2.q && hex1.r === hex2.r && hex1.s === hex2.s;
  }

  static diagonals: Hex[] = [
    new Hex(2, -1, -1),
    new Hex(1, -2, 1),
    new Hex(-1, -1, 2),
    new Hex(-2, 1, 1),
    new Hex(-1, 2, -1),
    new Hex(1, 1, -2),
  ];

  static directions: Hex[] = [
    new Hex(1, 0, -1),
    new Hex(1, -1, 0),
    new Hex(0, -1, 1),
    new Hex(-1, 0, 1),
    new Hex(-1, 1, 0),
    new Hex(0, 1, -1),
  ];
}

export default Hex;
