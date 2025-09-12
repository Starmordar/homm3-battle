import { Node } from '@/core/Node';
import { withComponentMetadata } from '@/decorators/withComponentMeta';

class TestComponent {
  value: number;

  constructor(value: number) {
    this.value = value;
  }
}

class TestPositionComponent {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class TestPositionNode extends Node {
  @withComponentMetadata(TestPositionComponent)
  position: TestPositionComponent;
}

class TestPositionAndValueNode extends Node {
  @withComponentMetadata(TestPositionComponent)
  position: TestPositionComponent;

  @withComponentMetadata(TestComponent)
  value: TestComponent;
}

export { TestComponent, TestPositionComponent, TestPositionNode, TestPositionAndValueNode };
