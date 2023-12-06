class OrientationMatrix {
  constructor(
    readonly f00: number,
    readonly f10: number,
    readonly f01: number,
    readonly f11: number,
    readonly b00: number,
    readonly b10: number,
    readonly b01: number,
    readonly b11: number,
    readonly startAngle: number
  ) {
    this.f00 = f00;
    this.f10 = f10;
    this.f01 = f01;
    this.f11 = f11;
    this.b00 = b00;
    this.b10 = b10;
    this.b01 = b01;
    this.b11 = b11;
    this.startAngle = startAngle;
  }
}

export default OrientationMatrix;
