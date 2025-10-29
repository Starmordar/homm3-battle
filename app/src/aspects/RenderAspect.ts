import { DisplayComponent } from '@/components/DisplayComponent';
import { PositionComponent } from '@/components/PositionComponent';
import { Aspect } from '@/core/Aspect';
import { withComponentMetadata } from '@/core/withComponentMeta';

class RenderAspect extends Aspect {
  @withComponentMetadata(PositionComponent)
  public position: PositionComponent;

  @withComponentMetadata(DisplayComponent)
  public display: DisplayComponent;
}

export { RenderAspect };
