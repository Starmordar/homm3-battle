import { DisplayComponent } from './components/DisplayComponent';
import { PositionComponent } from './components/PositionComponent';
import { CreatureEntity } from './entities/CreatureEntity';
import { RenderSystem } from './systems/RenderSystem';

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const renderSystem = new RenderSystem(ctx);

const creatureEntity = new CreatureEntity();
creatureEntity.position = new PositionComponent(50, 50, 0);
creatureEntity.display = new DisplayComponent({ path: 'assets/CDDRAG.webp' });
renderSystem.addEntity(creatureEntity);

function gameLoop() {
  ctx?.clearRect(0, 0, canvas.width, canvas.height);
  renderSystem.update();

  // requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
