/* eslint-disable @typescript-eslint/no-explicit-any */
import InjectionsManager from '../models/injection/InjectionsManager';

export function Injectable(key: string) {
  console.log('key :>> ', key);
  return function <T extends { new (): any }>(ClassInstance: T) {
    InjectionsManager.register(key, new ClassInstance());
  };
}

export function Inject(key: string) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: () => InjectionsManager.get(key),
      writable: false,
      enumerable: false,
      configurable: false,
    });
  };
}
