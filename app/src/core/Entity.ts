import type { Constructor } from '@/types';

class Entity {
  static entityId = 0;

  public name: string;
  public onComponentAdded?: ((entity: this) => void) | null = null;
  public onComponentRemoved?: ((entity: this, component: Constructor) => void) | null = null;

  private components: Map<string, object> = new Map();

  constructor(name?: string) {
    this.name = name ?? `entityId-${++Entity.entityId}`;
  }

  add<T extends object>(component: T): this {
    const constructor = component.constructor as Constructor<T>;
    if (this.has(constructor)) this.remove(constructor);

    this.components.set(constructor.name, component);
    this.onComponentAdded?.(this);
    return this;
  }

  remove<T extends object>(componentClass: Constructor<T>): T | null {
    const component = this.get<T>(componentClass);
    if (!component) return null;

    this.components.delete(componentClass.name);
    this.onComponentRemoved?.(this, componentClass);
    return component;
  }

  get<T extends object>(componentClass: Constructor<T>): T | null {
    return (this.components.get(componentClass.name) as T) ?? null;
  }

  getAll() {
    return this.components;
  }

  has(componentClass: Constructor<object>): boolean {
    return this.components.has(componentClass.name);
  }
}

export { Entity };
