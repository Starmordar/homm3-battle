import { describe, expect, test, vi } from 'vitest';

import { TestComponent } from '@/core/test/utils/TestComponent';

import { Entity } from './Entity';

describe('Entity', () => {
  test('should create an entity with a unique name', () => {
    const entity1 = new Entity();
    const entity2 = new Entity();

    expect(entity1.name).toBeDefined();
    expect(entity2.name).toBeDefined();
    expect(entity1.name).not.toBe(entity2.name);
  });

  test('should respect provided name', () => {
    const entity = new Entity('TestEntity');
    expect(entity.name).toBe('TestEntity');
  });

  test('should check for component existence', () => {
    const entity = new Entity();
    const component = new TestComponent(1);
    entity.add(component);

    expect(entity.has(TestComponent)).toBe(true);
    entity.remove(TestComponent);
    expect(entity.has(TestComponent)).toBe(false);
  });

  test('should add and retrieve components', () => {
    const entity = new Entity();
    const component = new TestComponent(1);
    entity.add(component);

    const componentsList = entity.get(TestComponent);
    expect(componentsList).toBe(component);
    expect(componentsList?.value).toBe(1);
  });

  test('should override existing component of the same type', () => {
    const entity = new Entity();
    const component1 = new TestComponent(1);
    const component2 = new TestComponent(2);

    entity.add(component1);
    entity.add(component2);

    const componentsList = entity.get(TestComponent);
    expect(componentsList).toBe(component2);
    expect(componentsList?.value).toBe(2);
    expect(entity.getAll().size).toBe(1);
  });

  test('should trigger callback on component addition', () => {
    const entity = new Entity();
    const component = new TestComponent(1);

    const onComponentAdded = vi.fn();
    entity.onComponentAdded = onComponentAdded;
    entity.add(component);

    expect(onComponentAdded).toHaveBeenCalledWith(entity);
  });

  test('should remove components', () => {
    const entity = new Entity();
    const component = new TestComponent(1);
    entity.add(component);

    const removedComponent = entity.remove(TestComponent);
    expect(removedComponent).toBe(component);
    expect(entity.get(TestComponent)).toBeNull();
  });

  test('should return null when removing non-existent component', () => {
    const entity = new Entity();
    const removedComponent = entity.remove(TestComponent);
    expect(removedComponent).toBeNull();
  });

  test('should trigger callback on component removal', () => {
    const entity = new Entity();
    const component = new TestComponent(1);
    entity.add(component);

    const onComponentRemoved = vi.fn();
    entity.onComponentRemoved = onComponentRemoved;
    entity.remove(TestComponent);

    expect(onComponentRemoved).toHaveBeenCalledWith(entity, TestComponent);
  });
});
