import { AnimationComponent } from '@/components/AnimationComponet';
import { PositionComponent } from '@/components/PositionComponent';
import { Node } from '@/core/Node';
// import { nodeComponent } from '@/decorators/nodeComponent';

class AnimatedPositionNode extends Node {
  // @nodeComponent
  @Reflect.metadata('design:type', PositionComponent)
  public position: PositionComponent;

  // @nodeComponent
  @Reflect.metadata('design:type', AnimationComponent)
  public animation: AnimationComponent;
}

export { AnimatedPositionNode };
