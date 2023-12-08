import './index.css';
import ResourceController from './controllers/ResourceController';
import SpriteRepository from './models/sprites/SpriteRepository';
import UICanvas, { UICanvasOptions } from './lib/canvas/UICanvas';
import SpriteFactory from './models/sprites/SpriteFactory';
import { SPRITE } from './constants/sprites';
import UnitsCanvas from './lib/canvas/UnitsCanvas';
import { CanvasOptions } from './lib/canvas/Canvas';

const spriteRepository = new SpriteRepository();
const spriteFactory = new SpriteFactory();

const resources = new ResourceController(spriteRepository, spriteFactory);
await resources.load();

const battleWidth = Math.min(window.innerHeight * 1.5, window.innerWidth);
const battleHeight = window.innerHeight - 25;

const uiCanvasOptions: UICanvasOptions = {
  classNames: ['ui-canvas', 'cursor-default'],
  size: { width: window.innerWidth, height: window.innerHeight },

  battleHeight,
  battleWidth,
};

const uiCanvas = new UICanvas(spriteRepository, uiCanvasOptions);
uiCanvas.setup(SPRITE.edge_pattern, SPRITE.battle_bg_01);

console.log('battleWidth :>> ', battleWidth);
const unitsCanvasOptions: CanvasOptions = {
  classNames: ['units-canvas'],
  size: { width: battleWidth, height: battleHeight },
};

const unitsCanvas = new UnitsCanvas(spriteRepository, unitsCanvasOptions);
unitsCanvas.setup();
