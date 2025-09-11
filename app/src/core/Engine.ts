import { ComponentMatchingFamily } from './ComponentMatchFamily';

import type { Entity } from '@/core/Entity';
import type { System } from '@/core/System';

type EntityName = string;
type NodeName = string;

class Engine {
  public updatePenging: boolean = false;

  private entities: Entity[] = [];
  private entityNames: Map<EntityName, Entity> = new Map();
  private systems: System[] = [];
  private families: Map<NodeName, ComponentMatchingFamily> = new Map();

  addEntity(entity: Entity) {
    if (this.entityNames.has(entity.name)) {
      throw new Error(`addEntity(): The entity name is already in use ${entity.name}`);
    }

    this.entityNames.set(entity.name, entity);
    this.entities.push(entity);

    entity.onComponentAdded = this.onComponentAdded.bind(this);
    entity.onComponentRemoved = this.onComponentRemoved.bind(this);
  }

  removeEntity(entity: Entity) {
    if (!this.entityNames.has(entity.name)) {
      throw new Error(`removeEntity(): The entity name was not found ${entity.name}`);
    }

    const entityIndex = this.entities.findIndex(({ name }) => name === entity.name);

    this.entityNames.delete(this.entities[entityIndex].name);
    this.entities.splice(entityIndex, 1);
  }

  removeAllEntities() {
    this.entities = [];
  }

  getEntityByName(entityName: string) {
    return this.entityNames.get(entityName);
  }

  onComponentAdded(entity: Entity, componentName: string) {
    for (const [, family] of this.families) {
      family.onComponentAddToEntity(entity, componentName);
    }
  }

  onComponentRemoved(entity: Entity, componentName: string) {
    for (const [, family] of this.families) {
      family.onComponentRemovedFromEntity(entity, componentName);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getNodeList<T>(nodeClass: new (...args: any[]) => T) {
    const nodeList = this.families.get(nodeClass.name);
    if (nodeList) return nodeList.nodeList;

    const newFamily = new ComponentMatchingFamily(this, nodeClass);
    this.families.set(nodeClass.name, newFamily);

    for (const entity of this.entities) {
      newFamily.onAddEntity(entity);
    }

    return newFamily.nodeList;
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
