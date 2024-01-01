import './index.css';

import SpriteFactory from './services/SpriteFactory';
import SpriteRepository from './services/SpriteRepository';
import ResourceController from './services/ResourceController';

import UICanvas from './models/canvas/UICanvas';
import UnitsCanvas from './models/canvas/UnitsCanvas';
import HexagonalCanvas from './models/canvas/HexagonalCanvas';

import { SPRITE } from './constants/sprites';
import { gridLayout, hexObstacles } from './constants/hex';
import { BATTLE_SIDE } from './constants/common';
import BattleModel from './models/Battle';
import Battle from '@/controllers/Battle';

const spriteRepository = new SpriteRepository();
const spriteFactory = new SpriteFactory();

const resources = new ResourceController(spriteRepository, spriteFactory);
await resources.load();

const battleWidth = 950;
const battleHeight = 650;

const side = BATTLE_SIDE.left;
const battleModel = new BattleModel(side);
const battle = new Battle(battleModel);

const uiCanvasOptions = {
  classNames: ['ui-canvas', 'cursor-default'],
  size: { width: window.innerWidth, height: window.innerHeight },

  battleHeight,
  battleWidth,
  backgroundSprite: SPRITE.battle_bg_01,
};

const uiCanvas = new UICanvas(spriteRepository, battle, uiCanvasOptions);
uiCanvas.draw();

const hexCanvasOptions = {
  classNames: ['grid-canvas'],
  size: { width: battleWidth, height: battleHeight - 90 },
  obstacles: hexObstacles,
};

const hexagonCanvas = new HexagonalCanvas(gridLayout, battle, hexCanvasOptions);
hexagonCanvas.draw();

const unitsCanvasOptions = {
  classNames: ['units-canvas'],
  size: { width: battleWidth, height: battleHeight - 90 },
  heroes: battle.model.heroes,
};

const unitsCanvas = new UnitsCanvas(spriteRepository, unitsCanvasOptions);
unitsCanvas.setup();
