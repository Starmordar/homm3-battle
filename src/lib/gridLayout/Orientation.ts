class Orientation {
  constructor(
    readonly f0: number,
    readonly f1: number,
    readonly f2: number,
    readonly f3: number,
    readonly b0: number,
    readonly b1: number,
    readonly b2: number,
    readonly b3: number,
    readonly start_angle: number
  ) {
    this.f0 = f0;
    this.f1 = f1;
    this.f2 = f2;
    this.f3 = f3;
    this.b0 = b0;
    this.b1 = b1;
    this.b2 = b2;
    this.b3 = b3;
    this.start_angle = start_angle;
  }
}

export default Orientation;
