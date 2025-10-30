import { GridPositionComponent } from '@/components/GridPositionComponent';
import { PositionComponent } from '@/components/PositionComponent';
import { Aspect } from '@/core/Aspect';
import { withComponentMetadata } from '@/core/withComponentMeta';

class GridPositionAspect extends Aspect {
  @withComponentMetadata(PositionComponent)
  public position: PositionComponent;

  @withComponentMetadata(GridPositionComponent)
  public gridPosition: GridPositionComponent;
}

export { GridPositionAspect };
