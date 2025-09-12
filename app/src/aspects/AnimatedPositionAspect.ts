import { AnimationComponent } from '@/components/AnimationComponet';
import { PositionComponent } from '@/components/PositionComponent';
import { Aspect } from '@/core/Aspect';
import { withComponentMetadata } from '@/core/withComponentMeta';

class AnimatedPositionAspect extends Aspect {
  @withComponentMetadata(PositionComponent)
  public position: PositionComponent;

  @withComponentMetadata(AnimationComponent)
  public animation: AnimationComponent;
}

export { AnimatedPositionAspect };
