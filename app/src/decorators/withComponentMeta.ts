interface MetaValue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): any;
}

type Meta = Map<string, MetaValue>;

const ComponentMetaKey = Symbol('node:component');

function withComponentMetadata(metadata: MetaValue) {
  return function (target: object, propertyKey: string) {
    const components: Meta = Reflect.getMetadata(ComponentMetaKey, target) || new Map();
    components.set(propertyKey, metadata);

    Reflect.defineMetadata(ComponentMetaKey, components, target);
  };
}

export type { Meta };
export { ComponentMetaKey, withComponentMetadata };
