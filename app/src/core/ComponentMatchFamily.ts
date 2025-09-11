import { ComponentMetaKey, type Meta } from '@/decorators/withComponentMeta';

import { Node } from './Node';
import { NodeList } from './NodeList';

import type { Engine } from './Engine';
import type { Entity } from './Entity';
import type { Constructor } from '@/types';

class ComponentMatchingFamily<NodeType extends Node = Node> {
  public nodeList: NodeList<NodeType> = new NodeList();

  private entities: Set<Entity> = new Set();
  private requiredComponents: Map<Constructor, string> = new Map();
  private engine: Engine;

  constructor(engine: Engine, nodeClass: Constructor) {
    this.engine = engine;

    const componentsData: Meta = Reflect.getMetadata(ComponentMetaKey, nodeClass.prototype);
    for (const [componentKey, componentClass] of componentsData) {
      this.requiredComponents.set(componentClass, componentKey);
    }
  }

  onAddEntity(entity: Entity) {
    this.addEntityToFamily(entity);
  }

  onComponentAddToEntity(entity: Entity) {
    this.addEntityToFamily(entity);
  }

  addEntityToFamily(entity: Entity) {
    if (this.entities.has(entity)) return;
    if (!this.hasAllRequiredComponents(entity)) return;

    const node = new Node();
    node.entity = entity;

    for (const [componentClass, componentKey] of this.requiredComponents) {
      node[componentKey as keyof typeof Node] = entity.get(componentClass);
    }

    this.entities.add(entity);
    this.nodeList.add(node as NodeType);
  }

  onComponentRemovedFromEntity(entity: Entity, componentName: string) {
    console.log('onComponentRemovedFromEntity: entity, componentName :>> ', entity, componentName);
  }

  private hasAllRequiredComponents(entity: Entity) {
    for (const [componentClass] of this.requiredComponents) {
      if (!entity.has(componentClass)) return false;
    }

    return true;
  }
}

export { ComponentMatchingFamily };
