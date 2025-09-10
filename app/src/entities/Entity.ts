interface Component {
  constructor: { name: string };
}

class Entity {
  static entityId = 0;

  public name: string;
  private components: Map<string, unknown> = new Map();

  constructor(name?: string) {
    this.name = name ?? `entityId-${++Entity.entityId}`;
  }

  add<T extends Component>(component: T): this {
    this.components.set(component.constructor.name, component);
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<T>(componentClass: { new (...args: any[]): T }): T | undefined {
    return this.components.get(componentClass.name) as T | undefined;
  }

  remove<T>(componentClass: { new (): T }): void {
    this.components.delete(componentClass.name);
  }

  has<T>(componentClass: { new (): T }): boolean {
    return this.components.has(componentClass.name);
  }
}

export { Entity };
