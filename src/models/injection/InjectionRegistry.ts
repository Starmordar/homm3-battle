/* eslint-disable @typescript-eslint/no-explicit-any */

import { InjectablesMapping } from './injections';

class InjectionRegistry {
  private _registry: Map<string, any> = new Map();

  constructor() {
    InjectablesMapping.forEach(({ key, value }) => {
      this.register(key, new value());
    });
  }

  public register(key: string, instance: any) {
    if (this._registry.has(key)) return;
    this._registry.set(key, instance);
  }

  public get(key: string) {
    return this._registry.get(key);
  }
}

export default new InjectionRegistry();
