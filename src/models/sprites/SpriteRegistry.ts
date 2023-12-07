import Sprite from './Sprite';
import type { ISpriteOptions } from '../../constants/sprites';

class SpriteRegistry {
  private _registry: Map<string, Sprite<ISpriteOptions>> = new Map();

  constructor() {}

  public register(key: string, instance: Sprite<ISpriteOptions>) {
    if (this._registry.has(key)) return;
    this._registry.set(key, instance);
  }

  public get(key: string) {
    return this._registry.get(key);
  }
}

export default SpriteRegistry;
