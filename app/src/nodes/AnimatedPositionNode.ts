import { AnimationComponent } from '@/components/AnimationComponet';
import { PositionComponent } from '@/components/PositionComponent';
import { Node } from '@/core/Node';
import { withComponentMetadata } from '@/decorators/withComponentMeta';

class AnimatedPositionNode extends Node {
  @withComponentMetadata(PositionComponent)
  public position: PositionComponent;

  @withComponentMetadata(AnimationComponent)
  public animation: AnimationComponent;
}

export { AnimatedPositionNode };
