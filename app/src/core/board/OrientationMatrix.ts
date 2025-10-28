class OrientationMatrix {
  public readonly f00: number;
  public readonly f10: number;
  public readonly f01: number;
  public readonly f11: number;

  public readonly b00: number;
  public readonly b10: number;
  public readonly b01: number;
  public readonly b11: number;

  public readonly startAngle: number;

  constructor(
    f00: number,
    f10: number,
    f01: number,
    f11: number,
    b00: number,
    b10: number,
    b01: number,
    b11: number,
    startAngle: number,
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

export { OrientationMatrix };
