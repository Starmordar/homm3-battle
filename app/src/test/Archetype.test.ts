import { expect, describe, test } from 'vitest';

import { Archetype } from '@/core/Archetype';
import { Aspect } from '@/core/Aspect';
import { Entity } from '@/core/Entity';
import {
  ValueComponent,
  PositionComponent,
  PositionAspect,
  PositionAndValueAspect,
} from '@/test/mock/Components';

describe('Archetype', () => {
  test('should match components by archetype', () => {
    const archetype = new Archetype(PositionAndValueAspect);
    const entity = new Entity().add(new PositionComponent(10, 20)).add(new ValueComponent(5));

    archetype.onAddEntity(entity);
    expect(archetype.aspectList.aspects).toHaveLength(1);
    expect(archetype.aspectList.aspects[0].position).toBeInstanceOf(PositionComponent);
    expect(archetype.aspectList.aspects[0].position.x).toBe(10);
    expect(archetype.aspectList.aspects[0].position.y).toBe(20);
  });

  test('should not add if required component is missing', () => {
    const archetype = new Archetype(PositionAspect);
    const entity = new Entity().add(new ValueComponent(5));

    archetype.onAddEntity(entity);
    expect(archetype.aspectList.aspects).toHaveLength(0);
  });

  test('should remove entity from archetype', () => {
    const archetype = new Archetype(PositionAndValueAspect);
    const entity = new Entity().add(new PositionComponent(10, 20)).add(new ValueComponent(5));

    archetype.onAddEntity(entity);
    expect(archetype.aspectList.aspects).toHaveLength(1);

    archetype.onRemoveEntity(entity);
    expect(archetype.aspectList.aspects).toHaveLength(0);
  });

  test('should add entity when it gains required component', () => {
    const archetype = new Archetype(PositionAndValueAspect);
    const entity = new Entity().add(new ValueComponent(5));

    archetype.onAddEntity(entity);
    expect(archetype.aspectList.aspects).toHaveLength(0);

    entity.add(new PositionComponent(15, 25));
    archetype.onComponentAddToEntity(entity);

    expect(archetype.aspectList.aspects).toHaveLength(1);
    expect(archetype.aspectList.aspects[0].position.x).toBe(15);
    expect(archetype.aspectList.aspects[0].position.y).toBe(25);
  });

  test('should remove entity when it loses required component', () => {
    const archetype = new Archetype(PositionAndValueAspect);
    const entity = new Entity().add(new PositionComponent(10, 20)).add(new ValueComponent(5));

    archetype.onAddEntity(entity);
    expect(archetype.aspectList.aspects).toHaveLength(1);

    entity.remove(PositionComponent);
    archetype.onComponentRemoveFromEntity(entity, PositionComponent);

    expect(archetype.aspectList.aspects).toHaveLength(0);
  });

  test('should not remove entity when it loses non-required component', () => {
    const archetype = new Archetype(PositionAspect);
    const entity = new Entity().add(new PositionComponent(10, 20)).add(new ValueComponent(5));

    archetype.onAddEntity(entity);
    expect(archetype.aspectList.aspects).toHaveLength(1);

    entity.remove(ValueComponent);
    archetype.onComponentRemoveFromEntity(entity, ValueComponent);

    expect(archetype.aspectList.aspects).toHaveLength(1);
  });

  test('should not add entity again if it already exists in archetype', () => {
    const archetype = new Archetype(PositionAspect);
    const entity = new Entity().add(new PositionComponent(10, 20));

    archetype.onAddEntity(entity);
    expect(archetype.aspectList.aspects).toHaveLength(1);

    entity.add(new PositionComponent(15, 25));
    archetype.onComponentAddToEntity(entity);
    expect(archetype.aspectList.aspects).toHaveLength(1);
  });

  test('should throw error if aspect class lacks metadata', () => {
    class InvalidAspect extends Aspect {}
    expect(() => new Archetype(InvalidAspect)).toThrowError();
  });
});
