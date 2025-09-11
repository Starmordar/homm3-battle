import type { Entity } from '@/entities/Entity';
import type { System } from '@/systems/System';

// Featch families of nodes, what is the nodes - ???
// Nodes - Group of components together, group of components that a system works with
class Engine {
  public updatePenging: boolean = false;

  private entities: Entity[] = [];
  private entityNames: Map<string, Entity> = new Map();
  private systems: System[] = [];

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

  onComponentAdded(entity: Entity, component: string) {
    console.log('entity, component :>> ', entity, component);
  }

  onComponentRemoved(entity: Entity, component: string) {
    console.log('entity, component :>> ', entity, component);
  }

  addSystem(system: System) {
    system.addToEngine?.();
    this.systems.push(system);
  }

  removeSystem(system: System) {
    const systemIndex = this.systems.findIndex((listSystem) => listSystem === system);

    if (systemIndex === -1) {
      throw new Error(`removeSystem(): The system was not found: ${system.constructor.name}`);
    }

    system.removeFromEngine?.();
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
