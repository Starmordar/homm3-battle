import type { CreatureEntity } from '@/entities/CreatureEntity';

class RenderSystem {
  context: CanvasRenderingContext2D;
  entities: CreatureEntity[] = [];

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  addEntity(entity: CreatureEntity) {
    this.entities.push(entity);
  }

  public update() {
    for (const entity of this.entities) {
      const position = entity.position;
      const display = entity.display;

      const img = new Image();
      img.src = display.displayObject.path;

      img.onload = () => {
        console.log('on load', img);
        this.context.drawImage(
          img,
          0,
          0,
          220,
          180,
          position.position.x,
          position.position.y,
          220,
          180,
        );
      };
    }
  }
}

export { RenderSystem };
