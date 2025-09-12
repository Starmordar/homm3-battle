import { expect, describe, test } from 'vitest';

import { ComponentMatchingFamily } from './ComponentMatchFamily';
import { Entity } from './Entity';
import { TestComponent, TestPositionComponent, TestPositionNode } from './test/utils/TestComponent';

describe('ComponentMatchFamily', () => {
  test('should match components by family', () => {
    const family = new ComponentMatchingFamily(TestPositionNode);
    const entity = new Entity().add(new TestPositionComponent(10, 20)).add(new TestComponent(5));

    family.onAddEntity(entity);
    expect(family.nodeList.nodes).toHaveLength(1);
    expect(family.nodeList.nodes[0].position).toBeInstanceOf(TestPositionComponent);
    expect(family.nodeList.nodes[0].position.x).toBe(10);
    expect(family.nodeList.nodes[0].position.y).toBe(20);
  });

  test('should not add if required component is missing', () => {
    const family = new ComponentMatchingFamily(TestPositionNode);
    const entity = new Entity().add(new TestComponent(5));

    family.onAddEntity(entity);
    expect(family.nodeList.nodes).toHaveLength(0);
  });

  test('should remove entity from family', () => {
    const family = new ComponentMatchingFamily(TestPositionNode);
    const entity = new Entity().add(new TestPositionComponent(10, 20)).add(new TestComponent(5));

    family.onAddEntity(entity);
    expect(family.nodeList.nodes).toHaveLength(1);

    family.onRemoveEntity(entity);
    expect(family.nodeList.nodes).toHaveLength(0);
  });

  test('should add entity when it gains required component', () => {
    const family = new ComponentMatchingFamily(TestPositionNode);
    const entity = new Entity().add(new TestComponent(5));

    family.onAddEntity(entity);
    expect(family.nodeList.nodes).toHaveLength(0);

    entity.add(new TestPositionComponent(15, 25));
    family.onComponentAddToEntity(entity);
    expect(family.nodeList.nodes).toHaveLength(1);
    expect(family.nodeList.nodes[0].position.x).toBe(15);
    expect(family.nodeList.nodes[0].position.y).toBe(25);
  });
});
