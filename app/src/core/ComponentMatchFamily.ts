import { AnimationComponent } from '@/components/AnimationComponet';
import { PositionComponent } from '@/components/PositionComponent';

import { Node } from './Node';
import { NodeList } from './NodeList';

import type { Engine } from './Engine';
import type { Entity } from './Entity';

class ComponentMatchingFamily {
  public nodeList: NodeList = new NodeList();

  private entities: Entity[] = [];
  private components: unknown[] = [];

  //   private nodeName: string;
  private engine: Engine;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(engine: Engine, nodeClass: new (...args: any[]) => any) {
    this.engine = engine;

    // const instance = new nodeClass();
    // const instanceFields = Object.keys(instance);

    const components = Object.getOwnPropertyNames(nodeClass.prototype);
    console.log('components :>> ', components);
    console.log('Reflect', Reflect.getMetadataKeys(nodeClass, 'design:type'));
    // console.log('Component properties:', Object.getPrototypeOf(instance).constructor.__components);

    // console.log('nodeClass :>> ', instanceFields, Object.getOwnPropertyDescriptors(instance));
    // this.nodeClass = nodeClass;
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

    const newNode = new Node();
    newNode.entity = entity;

    newNode.position = entity.get(PositionComponent);
    newNode.animation = entity.get(AnimationComponent);

    this.entities.push(entity);
    this.nodeList.add(newNode);
  }

  onComponentRemovedFromEntity(entity: Entity, componentName: string) {
    console.log('onComponentRemovedFromEntity: entity, componentName :>> ', entity, componentName);
  }
}

export { ComponentMatchingFamily };
