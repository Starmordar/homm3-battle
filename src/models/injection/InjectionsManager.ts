/* eslint-disable @typescript-eslint/no-explicit-any */

class InjectionsManager {
  private _registry: Map<string, any> = new Map();

  constructor() {}

  public register(key: string, instance: any) {
    if (this._registry.has(key)) return;
    this._registry.set(key, instance);
  }

  public get(key: string) {
    return this._registry.get(key);
  }
}

export default new InjectionsManager();
