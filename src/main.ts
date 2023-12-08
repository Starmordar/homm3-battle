import './index.css';
import ResourceController from './controllers/ResourceController';
import SpriteRepository from './models/sprites/SpriteRepository';
import UICanvas, { UICanvasOptions } from './lib/canvas/UICanvas';
import SpriteFactory from './models/sprites/SpriteFactory';
import { SPRITE } from './constants/sprites';

const spriteRepository = new SpriteRepository();
const spriteFactory = new SpriteFactory();

const resources = new ResourceController(spriteRepository, spriteFactory);
await resources.load();

const battleHeight = window.innerHeight - 25;
const battleWidth = Math.min(window.innerHeight * 1.5, window.innerWidth);

const uiCanvasOptions: UICanvasOptions = {
  classNames: ['ui-canvas', 'cursor-default'],
  size: { width: window.innerWidth, height: window.innerHeight },

  battleHeight,
  battleWidth,
  backgroundColor: 'transparent',
};

const uiCanvas = new UICanvas(spriteRepository, uiCanvasOptions);
uiCanvas.setup(SPRITE.edge_pattern, SPRITE.battle_bg_01);
