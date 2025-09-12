import type { Ctor } from '@/types';

type Component = object;

class Entity {
  static entityId = 0;

  public name: string;
  public onComponentAdded?: ((entity: this) => void) | null = null;
  public onComponentRemoved?: ((entity: this, ctor: Ctor) => void) | null = null;

  private components: Map<string, Component> = new Map();

  constructor(name?: string) {
    this.name = name ?? `entityId-${++Entity.entityId}`;
  }

  add<T extends Component>(component: T): this {
    if (component.constructor === Object) {
      throw new Error('Engine: You must provide a class instance as a component');
    }

    const constructor = component.constructor as Ctor<T>;
    if (this.has(constructor)) this.remove(constructor);

    this.components.set(constructor.name, component);
    this.onComponentAdded?.(this);
    return this;
  }

  remove<T extends Component>(componentCtor: Ctor<T>): T | null {
    const component = this.get<T>(componentCtor);
    if (!component) return null;

    this.components.delete(componentCtor.name);
    this.onComponentRemoved?.(this, componentCtor);
    return component;
  }

  get<T extends Component>(componentCtor: Ctor<T>): T | null {
    return (this.components.get(componentCtor.name) as T) ?? null;
  }

  getAll() {
    return this.components;
  }

  has(componentCtor: Ctor) {
    return this.components.has(componentCtor.name);
  }
}

export { Entity };
