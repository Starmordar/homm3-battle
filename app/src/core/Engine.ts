import { ComponentMatchingFamily } from './ComponentMatchFamily';

import type { Node } from './Node';
import type { NodeList } from './NodeList';
import type { Entity } from '@/core/Entity';
import type { System } from '@/core/System';
import type { Constructor } from '@/types';

type EntityName = string;
type NodeName = string;

class Engine {
  public updatePenging: boolean = false;

  private entities: Set<Entity> = new Set();
  private entityNames: Map<EntityName, Entity> = new Map();
  private systems: System[] = [];
  private families: Map<NodeName, ComponentMatchingFamily> = new Map();

  addEntity(entity: Entity) {
    if (this.entityNames.has(entity.name)) {
      throw new Error(`addEntity: The entity with the same name is already in use ${entity.name}`);
    }

    this.entityNames.set(entity.name, entity);
    this.entities.add(entity);

    entity.onComponentAdded = this.onComponentAdded.bind(this);
    entity.onComponentRemoved = this.onComponentRemoved.bind(this);

    for (const [, family] of this.families) {
      family.onAddEntity(entity);
    }
  }

  removeEntity(entity: Entity) {
    if (!this.entityNames.has(entity.name)) {
      throw new Error(`removeEntity: The entity with the ${entity.name} name was not found`);
    }

    entity.onComponentAdded = null;
    entity.onComponentRemoved = null;

    for (const [, family] of this.families) {
      family.onRemoveEntity(entity);
    }

    this.entityNames.delete(entity.name);
    this.entities.delete(entity);
  }

  getEntityByName(entityName: string) {
    return this.entityNames.get(entityName);
  }

  onComponentAdded(entity: Entity) {
    for (const [, family] of this.families) {
      family.onComponentAddToEntity(entity);
    }
  }

  onComponentRemoved(entity: Entity, componentClass: Constructor) {
    for (const [, family] of this.families) {
      family.onComponentRemovedFromEntity(entity, componentClass);
    }
  }

  getNodeList<T extends Node>(nodeClass: Constructor<T>): NodeList<T> {
    const family = this.families.get(nodeClass.name) as ComponentMatchingFamily<T> | undefined;
    if (family) return family.nodeList;

    const newFamily = new ComponentMatchingFamily(nodeClass);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.families.set(nodeClass.name, newFamily as any);

    for (const entity of this.entities) {
      newFamily.onAddEntity(entity);
    }

    return newFamily.nodeList as unknown as NodeList<T>;
  }

  addSystem(system: System) {
    system.addToEngine(this);
    this.systems.push(system);
  }

  removeSystem(system: System) {
    const systemIndex = this.systems.findIndex((listSystem) => listSystem === system);

    if (systemIndex === -1) {
      throw new Error(`removeSystem(): The system was not found: ${system.constructor.name}`);
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
