import type { Graphics } from 'pixi.js';

abstract class View {
  public abstract graphics: Graphics | Graphics[];
}

export { View };
