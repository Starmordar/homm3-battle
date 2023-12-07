/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectables } from '../models/injection/injections';
import SpriteRegistry from '../models/sprites/SpriteRegistry';

import InjectionRegistry from '../models/injection/InjectionRegistry';

InjectionRegistry.register(Injectables.Textures, new SpriteRegistry());

interface Injection {
  index: number;
  key: string;
}

type IConstructor = { new (...args: Array<any>): any };

export function InjectionClass() {
  return function <T extends IConstructor>(constructor: T): T | void {
    return class extends constructor {
      constructor(...args: Array<any>) {
        const injections = (constructor as any).injections as Array<Injection>;
        const injectedArgs = injections.map(({ key }) => InjectionRegistry.get(key));

        super(...args, ...injectedArgs);
      }
    };
  };
}

export function Inject(key: string) {
  return function (target: any, _propertyKey: string, parameterIndex: number) {
    const injection: Injection = { index: parameterIndex, key };
    const existingInjections: Array<Injection> = target.injections ?? [];

    Object.defineProperty(target, 'injections', {
      get: () => [...existingInjections, injection],
    });
  };
}
