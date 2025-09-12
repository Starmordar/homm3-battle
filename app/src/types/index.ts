interface Point {
  x: number;
  y: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Constructor<T extends object = {}> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ctor<T extends object = object> = new (...args: any[]) => T;

export type { Ctor, Constructor, Point };
