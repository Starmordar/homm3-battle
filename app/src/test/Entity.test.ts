import { describe, expect, test, vi } from 'vitest';

import { Entity } from '@/core/Entity';
import { ValueComponent } from '@/test/mock/Components';

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
    const component = new ValueComponent(1);
    entity.add(component);

    expect(entity.has(ValueComponent)).toBe(true);
    entity.remove(ValueComponent);
    expect(entity.has(ValueComponent)).toBe(false);
  });

  test('should add and retrieve components', () => {
    const entity = new Entity();
    const component = new ValueComponent(1);
    entity.add(component);

    const componentsList = entity.get(ValueComponent);
    expect(componentsList).toBe(component);
    expect(componentsList?.value).toBe(1);
  });

  test('should override existing component of the same type', () => {
    const entity = new Entity();
    const component1 = new ValueComponent(1);
    const component2 = new ValueComponent(2);

    entity.add(component1);
    entity.add(component2);

    const componentsList = entity.get(ValueComponent);
    expect(componentsList).toBe(component2);
    expect(componentsList?.value).toBe(2);
    expect(entity.getAll().size).toBe(1);
  });

  test('should trigger callback on component addition', () => {
    const entity = new Entity();
    const component = new ValueComponent(1);

    const onComponentAdded = vi.fn();
    entity.onComponentAdded = onComponentAdded;
    entity.add(component);

    expect(onComponentAdded).toHaveBeenCalledWith(entity);
  });

  test('should remove components', () => {
    const entity = new Entity();
    const component = new ValueComponent(1);
    entity.add(component);

    const removedComponent = entity.remove(ValueComponent);
    expect(removedComponent).toBe(component);
    expect(entity.get(ValueComponent)).toBeNull();
  });

  test('should return null when removing non-existent component', () => {
    const entity = new Entity();
    const removedComponent = entity.remove(ValueComponent);
    expect(removedComponent).toBeNull();
  });

  test('should trigger callback on component removal', () => {
    const entity = new Entity();
    const component = new ValueComponent(1);
    entity.add(component);

    const onComponentRemoved = vi.fn();
    entity.onComponentRemoved = onComponentRemoved;
    entity.remove(ValueComponent);

    expect(onComponentRemoved).toHaveBeenCalledWith(entity, ValueComponent);
  });

  test('should throw error when adding a non-class instance as component', () => {
    const entity = new Entity();
    expect(() => entity.add({ position: 12 })).toThrowError();
  });
});
