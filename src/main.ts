import './index.css';

import SpriteFactory from './models/sprites/SpriteFactory';
import SpriteRepository from './models/sprites/SpriteRepository';
import ResourceController from './controllers/ResourceController';

import UICanvas from './models/canvas/UICanvas';
import UnitsCanvas from './models/canvas/UnitsCanvas';
import HexagonalCanvas from './models/canvas/HexagonalCanvas';

import BattleHeroInfo from './models/battle/BattleHeroInfo';
import Battle from './models/battle/Battle';

import { SPRITE } from './constants/sprites';
import { hexObstacles } from './constants/hex';
import { buildGridLayout } from './utils/grid';

const spriteRepository = new SpriteRepository();
const spriteFactory = new SpriteFactory();

const resources = new ResourceController(spriteRepository, spriteFactory);
await resources.load();

const battleWidth = 950;
const battleHeight = 650;

const layout = buildGridLayout({ width: battleWidth, height: battleHeight });

const battle = new Battle();
const heroes = battle.heroes.map((hero) => new BattleHeroInfo(hero));

const uiCanvasOptions = {
  classNames: ['ui-canvas', 'cursor-default'],
  size: { width: window.innerWidth, height: window.innerHeight },

  battleHeight,
  battleWidth,
  backgroundSprite: SPRITE.battle_bg_01,
  heroes,
};

const uiCanvas = new UICanvas(spriteRepository, uiCanvasOptions);
uiCanvas.display();

const hexCanvasOptions = {
  classNames: ['grid-canvas'],
  size: { width: battleWidth, height: battleHeight - 90 },
  obstacles: hexObstacles,
};

const hexagonCanvas = new HexagonalCanvas(layout, battle, hexCanvasOptions);
hexagonCanvas.display();

const unitsCanvasOptions = {
  classNames: ['units-canvas'],
  size: { width: battleWidth, height: battleHeight - 90 },
  heroes,
};

const unitsCanvas = new UnitsCanvas(spriteRepository, layout, unitsCanvasOptions);
unitsCanvas.setup();
