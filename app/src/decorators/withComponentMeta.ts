import type { Constructor } from '@/types';

type Meta = Map<string, Constructor>;

const ComponentMetaKey = Symbol('node:component');

function withComponentMetadata(metadata: Constructor) {
  return function (target: object, propertyKey: string) {
    const components: Meta = Reflect.getMetadata(ComponentMetaKey, target) || new Map();
    components.set(propertyKey, metadata);

    Reflect.defineMetadata(ComponentMetaKey, components, target);
  };
}

export type { Meta };
export { ComponentMetaKey, withComponentMetadata };
