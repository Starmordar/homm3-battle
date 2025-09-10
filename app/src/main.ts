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

  const dragonSheet = await Assets.load('spritesheets/CDDRAG.json');
  const dragonSprite = new AnimatedSprite(dragonSheet.animations['start moving']);
  dragonSprite.animationSpeed = 0.1;
  dragonSprite.x = dragonSprite.width / 2;
  dragonSprite.y = app.screen.height / 2;
  dragonSprite.loop = false;
  dragonSprite.play();
  app.stage.addChild(dragonSprite);

  dragonSprite.onComplete = () => {
    dragonSprite.textures = dragonSheet.animations['moving'];
    dragonSprite.loop = true;
    dragonSprite.play();

    setTimeout(() => {
      dragonSprite.textures = dragonSheet.animations['stop moving'];
      dragonSprite.loop = false;
      dragonSprite.play();
      dragonSprite.onComplete = () => {
        dragonSprite.textures = dragonSheet.animations['standing_active'];
        dragonSprite.loop = true;
        dragonSprite.play();
      };
    }, 2000);
  };

  const angelSheet = await Assets.load('spritesheets/CRANGL.json');
  console.log('angelSheet.animations :>> ', angelSheet.animations);
  const angelSprite = new AnimatedSprite([
    // ...angelSheet.animations['start moving'],
    ...angelSheet.animations['moving'],
    // ...angelSheet.animations['stop moving'],
  ]);

  angelSprite.animationSpeed = 0.1;
  angelSprite.x = angelSprite.width / 2;
  angelSprite.y = app.screen.height / 2 + 100;
  angelSprite.play();
  app.stage.addChild(angelSprite);

  const picMan = await Assets.load('spritesheets/CPKMAN.json');
  console.log('picMan.animations :>> ', picMan.animations);
  const picManSprite = new AnimatedSprite([
    ...picMan.animations['start moving'],
    ...picMan.animations['moving'],
    ...picMan.animations['stop moving'],
  ]);

  picManSprite.animationSpeed = 0.1;
  picManSprite.x = picManSprite.width / 2 + 50;
  picManSprite.y = app.screen.height / 2 + 200;
  picManSprite.play();
  app.stage.addChild(picManSprite);

  setTimeout(() => {
    angelSprite.textures = angelSheet.animations['defend'];
    angelSprite.play();
  }, 1000);
})();
