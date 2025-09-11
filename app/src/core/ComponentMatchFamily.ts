import { ComponentMetaKey, type Meta } from '@/decorators/withComponentMeta';

import { Node, type NodeType } from './Node';
import { NodeList } from './NodeList';

import type { Engine } from './Engine';
import type { Entity } from './Entity';
import type { Constructor } from '@/types';

class ComponentMatchingFamily {
  public nodeList: NodeList = new NodeList();

  private entities: Set<Entity> = new Set();
  private requiredComponents: Map<Constructor, string> = new Map();

  private engine: Engine;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(engine: Engine, nodeClass: new (...args: any[]) => any) {
    this.engine = engine;

    const componentsData: Meta = Reflect.getMetadata(ComponentMetaKey, nodeClass.prototype);
    for (const [componentKey, componentClass] of componentsData) {
      this.requiredComponents.set(componentClass, componentKey);
    }
  }

  onAddEntity(entity: Entity) {
    this.addEntityToFamily(entity);
  }

  onComponentAddToEntity(entity: Entity, _componentName: string) {
    this.addEntityToFamily(entity);
  }

  addEntityToFamily(entity: Entity) {
    if (this.entities.has(entity)) return;
    if (!this.hasAllRequiredComponents(entity)) return;

    const node = new Node() as NodeType;
    node.entity = entity;

    for (const [componentClass, componentKey] of this.requiredComponents) {
      node[componentKey] = entity.get(componentClass);
    }

    this.entities.add(entity);
    this.nodeList.add(node);
  }

  hasAllRequiredComponents(entity: Entity) {
    for (const [componentClass] of this.requiredComponents) {
      if (!entity.has(componentClass)) return false;
    }

    return true;
  }

  onComponentRemovedFromEntity(entity: Entity, componentName: string) {
    console.log('onComponentRemovedFromEntity: entity, componentName :>> ', entity, componentName);
  }
}

export { ComponentMatchingFamily };
