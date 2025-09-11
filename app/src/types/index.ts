interface Point {
  x: number;
  y: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Constructor<T extends object = {}> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
}

export type { Constructor, Point };
