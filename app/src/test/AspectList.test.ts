import { expect, describe, test } from 'vitest';

import { AspectList } from '@/core/AspectList';
import { Entity } from '@/core/Entity';

import { PositionAspect } from './mock/Components';

describe('Aspect List', () => {
  test('should create Aspect instance', () => {
    const aspect = new AspectList();
    expect(aspect).toBeInstanceOf(AspectList);
  });

  test('should add and remove aspects', () => {
    const aspectList = new AspectList();
    const entity = new Entity();

    const aspect1 = new PositionAspect();
    const aspect2 = new PositionAspect();
    aspect1.entity = entity;
    aspect2.entity = entity;

    aspectList.add(aspect1);
    expect(aspectList.aspects).toContain(aspect1);

    aspectList.removeByEntity(entity);
    expect(aspectList.aspects).not.toContain(aspect1);
    expect(aspectList.aspects).toHaveLength(0);

    aspectList.add(aspect2);
    expect(aspectList.aspects).toContain(aspect2);
    expect(aspectList.aspects).toHaveLength(1);
  });
});
