import { ComponentMetaKey, type Meta } from '@/decorators/withComponentMeta';

import { Node, type NodeType } from './Node';
import { NodeList } from './NodeList';

import type { Engine } from './Engine';
import type { Entity } from './Entity';
import type { Constructor } from '@/types';

class ComponentMatchingFamily {
  public nodeList: NodeList = new NodeList();

  private entities: Entity[] = [];
  private components: Map<Constructor, string> = new Map();

  //   private nodeName: string;
  private engine: Engine;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(engine: Engine, nodeClass: new (...args: any[]) => any) {
    this.engine = engine;

    const componentsData: Meta = Reflect.getMetadata(ComponentMetaKey, nodeClass.prototype);
    for (const [componentKey, componentClass] of componentsData) {
      this.components.set(componentClass, componentKey);
    }
  }

  onAddEntity(entity: Entity) {
    this.addEntityToFamily(entity);
  }

  onComponentAddToEntity(entity: Entity, _componentName: string) {
    this.addEntityToFamily(entity);
  }

  addEntityToFamily(entity: Entity) {
    if (this.entities.find((en) => en === entity)) return;
    // TODO: check if entity has all required components

    const newNode = new Node() as NodeType;
    newNode.entity = entity;

    for (const [componentClass, componentKey] of this.components) {
      newNode[componentKey] = entity.get(componentClass);
    }

    this.entities.push(entity);
    this.nodeList.add(newNode);
  }

  onComponentRemovedFromEntity(entity: Entity, componentName: string) {
    console.log('onComponentRemovedFromEntity: entity, componentName :>> ', entity, componentName);
  }
}

export { ComponentMatchingFamily };
