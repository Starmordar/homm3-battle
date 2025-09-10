import './style.css';
// import { DisplayComponent } from './components/DisplayComponent';
// import { PositionComponent } from './components/PositionComponent';
// import { CreatureEntity } from './entities/CreatureEntity';
// import { RenderSystem } from './systems/RenderSystem';

// const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
// const ctx = canvas.getContext('2d')!;

// const renderSystem = new RenderSystem(ctx);

// const creatureEntity = new CreatureEntity();
// creatureEntity.position = new PositionComponent(50, 50, 0);
// creatureEntity.display = new DisplayComponent({ path: 'assets/CDDRAG.webp' });
// renderSystem.addEntity(creatureEntity);

// function gameLoop() {
//   ctx?.clearRect(0, 0, canvas.width, canvas.height);
//   renderSystem.update();

//   // requestAnimationFrame(gameLoop);
// }

// requestAnimationFrame(gameLoop);
import { AnimatedSprite, Application, Assets, Container } from 'pixi.js';

(async () => {
  const app = new Application();
  // @ts-expect-error enable pixi devtools
  window.__PIXI_DEVTOOLS__ = { app: app };

  await app.init({ background: '#7cbbe7ff', resizeTo: window });
  document.body.appendChild(app.canvas);

  const container = new Container();
  app.stage.addChild(container);

  // container.x = 0;
  // container.y = app.screen.height / 2;

  // container.pivot.x = container.width / 2;
  // container.pivot.y = container.height / 2;
  const dragonSheet = await Assets.load('spritesheets/CDDRAG.json');
  const dragonSprite = new AnimatedSprite(dragonSheet.animations['move']);

  dragonSprite.anchor.set(0.5);
  dragonSprite.animationSpeed = 0.05;
  dragonSprite.x = (app.screen.width - dragonSprite.width) / 2;
  dragonSprite.y = app.screen.height / 2;
  dragonSprite.play();
  app.stage.addChild(dragonSprite);

  // const dragonTexture = await Assets.load('assets/CDDRAG.webp');
  // for (let i = 0; i < 4; i++) {
  //   const dragon = new Sprite(dragonTexture);

  //   dragon.x = (i % 4) * 220;
  //   dragon.y = Math.floor(i / 4) * 40;
  //   container.addChild(dragon);
  // }

  // Listen for animate update
  // app.ticker.add((time) => {
  //   // Continuously rotate the container!
  //   // * use delta to create frame-independent transform *
  //   // container.rotation -= 0.01 * time.deltaTime;
  // });
})();
