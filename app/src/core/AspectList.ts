import type { Aspect } from './Aspect';
import type { Entity } from './Entity';

class AspectList<AspectType extends Aspect> {
  public aspects: AspectType[] = [];

  public aspectAdded: (aspect: AspectType) => void;
  public aspectRemoved: (aspect: AspectType) => void;

  add(aspect: AspectType) {
    this.aspects.push(aspect);
    this.aspectAdded?.(aspect);
  }

  removeByEntity(entity: Entity) {
    let deletedAspect: AspectType | null = null;

    const aspects = this.aspects.filter((aspect) => {
      const isEqual = aspect.entity === entity;
      if (isEqual) deletedAspect = aspect;
      return !isEqual;
    });

    this.aspects = aspects;
    this.aspectRemoved?.(deletedAspect!);
  }
}

export { AspectList };
