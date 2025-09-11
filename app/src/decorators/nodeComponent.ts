function nodeComponent(target: object, propertyKey: string) {
  const ctor = target.constructor as { __components?: string[] };
  const type = Reflect.getMetadata('design:type', target, propertyKey);
  console.log('type :>> ', type);

  if (!ctor.__components) ctor.__components = [];
  ctor.__components.push(propertyKey);
}

export { nodeComponent };
