import './index.css';
import ResourceController from './controllers/ResourceController';
import SpriteRepository from './models/sprites/SpriteRepository';
import UICanvas, { UICanvasOptions } from './models/canvas/UICanvas';
import SpriteFactory from './models/sprites/SpriteFactory';
import { SPRITE } from './constants/sprites';
import UnitsCanvas from './models/canvas/UnitsCanvas';
import { CanvasOptions } from './models/canvas/Canvas';
import HexagonalCanvas from './models/canvas/HexagonalCanvas';
import { hexObstacles } from './constants/hex';
import { buildGridLayout } from './utils/grid';

const spriteRepository = new SpriteRepository();
const spriteFactory = new SpriteFactory();

const resources = new ResourceController(spriteRepository, spriteFactory);
await resources.load();

// const battleWidth = Math.min(window.innerHeight * 1.5, window.innerWidth);
// const battleHeight = window.innerHeight - 75;

// width - (battleWidth + (width - battleWidth) / 2)
// width - (width - battleWidth) / 2

const battleWidth = 950;
const battleHeight = 650;

const layout = buildGridLayout({ width: battleWidth, height: battleHeight });

const uiCanvasOptions: UICanvasOptions = {
  classNames: ['ui-canvas', 'cursor-default'],
  size: { width: window.innerWidth, height: window.innerHeight },

  battleHeight,
  battleWidth,
};

const uiCanvas = new UICanvas(spriteRepository, uiCanvasOptions);
uiCanvas.setup(SPRITE.edge_pattern, SPRITE.battle_bg_01);

console.log('battleWidth :>> ', battleWidth);
// const unitsCanvasOptions: CanvasOptions = {
//   classNames: ['units-canvas'],
//   size: { width: battleWidth, height: battleHeight },
// };

// const unitsCanvas = new UnitsCanvas(spriteRepository, layout, unitsCanvasOptions);
// unitsCanvas.setup();

// const hexCanvasOptions = {
//   classNames: ['grid-canvas'],
//   size: { width: battleWidth, height: battleHeight },
//   obstacles: hexObstacles,
// };

// const hexagonCanvas = new HexagonalCanvas(layout, hexCanvasOptions);
// hexagonCanvas.setup();
