import { Aspect } from '@/core/Aspect';
import { withComponentMetadata } from '@/core/withComponentMeta';

class ValueComponent {
  value: number;

  constructor(value: number) {
    this.value = value;
  }
}

class PositionComponent {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class PositionAspect extends Aspect {
  @withComponentMetadata(PositionComponent)
  position: PositionComponent;
}

class PositionAndValueAspect extends Aspect {
  @withComponentMetadata(PositionComponent)
  position: PositionComponent;

  @withComponentMetadata(ValueComponent)
  value: ValueComponent;
}

export { ValueComponent, PositionComponent, PositionAspect, PositionAndValueAspect };
