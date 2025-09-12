import { ComponentMetaKey, type Meta } from '@/core/withComponentMeta';

import { Aspect } from './Aspect';
import { AspectList } from './AspectList';

import type { Entity } from './Entity';
import type { Ctor } from '@/types';

class Archetype<AspectType extends Aspect = Aspect> {
  public aspectList: AspectList<AspectType> = new AspectList();

  private entities: Set<Entity> = new Set();
  private requiredComponents: Map<Ctor, string> = new Map();

  constructor(aspectCtor: Ctor<AspectType>) {
    const componentsData: Meta = Reflect.getMetadata(ComponentMetaKey, aspectCtor.prototype);
    if (!componentsData) {
      throw new Error(`Engine: The aspect class ${aspectCtor.name} is missing metadata.`);
    }

    for (const [componentKey, componentCtor] of componentsData) {
      this.requiredComponents.set(componentCtor, componentKey);
    }
  }

  onAddEntity(entity: Entity) {
    this.addEntityToArchetype(entity);
  }

  onRemoveEntity(entity: Entity) {
    this.removeEntityFromArchetype(entity);
  }

  onComponentAddToEntity(entity: Entity) {
    this.addEntityToArchetype(entity);
  }

  onComponentRemoveFromEntity(entity: Entity, componentCtor: Ctor) {
    if (!this.requiredComponents.has(componentCtor)) return;
    this.removeEntityFromArchetype(entity);
  }

  private removeEntityFromArchetype(entity: Entity) {
    if (!this.entities.has(entity)) return;

    this.entities.delete(entity);
    this.aspectList.removeByEntity(entity);
  }

  private addEntityToArchetype(entity: Entity) {
    if (this.entities.has(entity)) return;
    if (!this.hasAllRequiredComponents(entity)) return;

    const aspect = new Aspect() as AspectType;
    aspect.entity = entity;

    for (const [componentCtor, componentKey] of this.requiredComponents) {
      // @ts-expect-error we know that the component exists because of hasAllRequiredComponents check
      aspect[componentKey] = entity.get(componentCtor);
    }

    this.entities.add(entity);
    this.aspectList.add(aspect);
  }

  private hasAllRequiredComponents(entity: Entity) {
    for (const [componentCtor] of this.requiredComponents) {
      if (!entity.has(componentCtor)) return false;
    }

    return true;
  }
}

export { Archetype };
