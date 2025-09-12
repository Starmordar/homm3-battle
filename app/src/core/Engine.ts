import { Archetype } from './Archetype';

import type { Aspect } from './Aspect';
import type { AspectList } from './AspectList';
import type { Entity } from '@/core/Entity';
import type { System } from '@/core/System';
import type { Ctor } from '@/types';

type EntityName = string;
type AspectName = string;

class Engine {
  public updatePenging: boolean = false;

  private entities: Set<Entity> = new Set();
  private entityNames: Map<EntityName, Entity> = new Map();
  private systems: System[] = [];
  private aspectArchetypes: Map<AspectName, Archetype> = new Map();

  addEntity(entity: Entity) {
    if (this.entityNames.has(entity.name)) {
      throw new Error(`Engine: The entity with the same name is already in use ${entity.name}`);
    }

    this.entityNames.set(entity.name, entity);
    this.entities.add(entity);

    entity.onComponentAdded = this.onComponentAdded.bind(this);
    entity.onComponentRemoved = this.onComponentRemoved.bind(this);

    for (const [, archetype] of this.aspectArchetypes) {
      archetype.onAddEntity(entity);
    }
  }

  removeEntity(entity: Entity) {
    if (!this.entityNames.has(entity.name)) {
      throw new Error(`Engine: The entity with the ${entity.name} name was not found`);
    }

    entity.onComponentAdded = null;
    entity.onComponentRemoved = null;

    for (const [, archetype] of this.aspectArchetypes) {
      archetype.onRemoveEntity(entity);
    }

    this.entityNames.delete(entity.name);
    this.entities.delete(entity);
  }

  getEntityByName(entityName: string) {
    return this.entityNames.get(entityName);
  }

  onComponentAdded(entity: Entity) {
    for (const [, archetype] of this.aspectArchetypes) {
      archetype.onComponentAddToEntity(entity);
    }
  }

  onComponentRemoved(entity: Entity, componentCtor: Ctor) {
    for (const [, archetype] of this.aspectArchetypes) {
      archetype.onComponentRemoveFromEntity(entity, componentCtor);
    }
  }

  getAspectList<T extends Aspect>(aspectCtor: Ctor<T>): AspectList<T> {
    const archetype = this.aspectArchetypes.get(aspectCtor.name) as Archetype<T> | undefined;
    if (archetype) return archetype.aspectList;

    const newArchetype = new Archetype(aspectCtor);
    this.aspectArchetypes.set(aspectCtor.name, newArchetype as unknown as Archetype<Aspect>);

    for (const entity of this.entities) {
      newArchetype.onAddEntity(entity);
    }

    return newArchetype.aspectList;
  }

  addSystem(system: System) {
    system.addToEngine(this);
    this.systems.push(system);
  }

  removeSystem(system: System) {
    const systemIndex = this.systems.findIndex((listSystem) => listSystem === system);

    if (systemIndex === -1) {
      throw new Error(`Engine: The system was not found: ${system.constructor.name}`);
    }

    system.removeFromEngine(this);
    this.systems.splice(systemIndex, 1);
  }

  update() {
    this.updatePenging = true;

    for (const system of this.systems) {
      system.update();
    }

    this.updatePenging = false;
  }
}

export { Engine };
