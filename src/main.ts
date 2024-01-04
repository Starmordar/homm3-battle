import './index.css';

import SpriteFactory from './services/SpriteFactory';
import { Textures } from './services/SpriteRepository';
import ResourceController from './services/ResourceController';

import UICanvas from './models/canvas/UICanvas';
import UnitsView from './models/canvas/UnitsView';
import HexLayoutView from './models/canvas/HexLayoutView';

import { SPRITE } from './constants/sprites';
import { hexObstacles } from './constants/hex';
import { BATTLE_SIDE } from './constants/common';
import BattleModel from './models/Battle';
import Battle from '@/controllers/Battle';
import { monsterTextures } from './constants/textures';
import BattleGraph from './models/BattleGraph';

const spriteFactory = new SpriteFactory();

const resources = new ResourceController(Textures, spriteFactory);
await resources.load();

const battleWidth = 950;
const battleHeight = 650;

const side = BATTLE_SIDE.left;
const battleModel = new BattleModel(side);
const battle = new Battle(battleModel);

const monsterSprites: Record<string, any> = {};

battle.monsters.forEach(({ model }) => {
  monsterSprites[model.uuid] = monsterTextures[model.animation.sprite];
});

await resources.loadSprites(monsterSprites);

const uiCanvasOptions = {
  classNames: ['ui-canvas', 'cursor-default'],
  size: { width: window.innerWidth, height: window.innerHeight },

  battleHeight,
  battleWidth,
  backgroundSprite: SPRITE.battle_bg_01,
};

const uiCanvas = new UICanvas(battle, uiCanvasOptions);
uiCanvas.draw();

const graph = new BattleGraph(hexObstacles);

const hexLayoutViewOptions = {
  classNames: ['grid-canvas'],
  size: { width: battleWidth, height: battleHeight - 90 },
  obstacles: hexObstacles,
};

const hexagonCanvas = new HexLayoutView(battle, graph, hexLayoutViewOptions);
hexagonCanvas.draw();

const unitsViewOptions = {
  classNames: ['units-canvas'],
  size: { width: battleWidth, height: battleHeight - 90 },
};

const unitsCanvas = new UnitsView(battle, graph, unitsViewOptions);
unitsCanvas.setup();
