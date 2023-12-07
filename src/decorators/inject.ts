/* eslint-disable @typescript-eslint/no-explicit-any */
import InjectionRegistry from '../models/injection/InjectionRegistry';

export function Injectable(key: string) {
  return function <T extends { new (): any }>(ClassInstance: T) {
    InjectionRegistry.register(key, new ClassInstance());
  };
}

export function Inject(key: string) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: () => InjectionRegistry.get(key),
      writable: false,
      enumerable: false,
      configurable: false,
    });
  };
}
