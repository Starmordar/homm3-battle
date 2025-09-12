import type { Ctor } from '@/types';

type Meta = Map<string, Ctor>;

const ComponentMetaKey = Symbol('aspect:component');

function withComponentMetadata(metadata: Ctor) {
  return function (target: object, propertyKey: string) {
    const components: Meta = Reflect.getMetadata(ComponentMetaKey, target) || new Map();
    components.set(propertyKey, metadata);

    Reflect.defineMetadata(ComponentMetaKey, components, target);
  };
}

export type { Meta };
export { ComponentMetaKey, withComponentMetadata };
