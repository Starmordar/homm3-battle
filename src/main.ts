import './index.css';

import SpriteFactory from './services/SpriteFactory';
import { Textures } from './services/SpriteRepository';
import ResourceController from './services/ResourceController';

import UICanvas from './models/canvas/UICanvas';
import AnimationView from './models/canvas/AnimationView';
import HexLayoutView from './models/canvas/HexLayoutView';

import { battleHeight, battleWidth, hexObstacles, layoutViewSize } from './constants/hex';
import { BATTLE_SIDE } from './constants/common';
import BattleModel from './models/Battle';
import Battle from '@/controllers/Battle';
import { monsterTextures } from './constants/textures/monsters';
import BattleGraph from './models/BattleGraph';
import { heroTextures } from './constants/textures/heroes';
import { TEXTURES, TEXTURE_TYPE } from './constants/textures/types';

const spriteFactory = new SpriteFactory();

const resources = new ResourceController(Textures, spriteFactory);
await resources.load();

const side = BATTLE_SIDE.left;
const battleModel = new BattleModel(side);
const battle = new Battle(battleModel);

const monsterSprites: Record<string, any> = {};

battle.monsters.forEach(({ model }) => {
  monsterSprites[model.uuid] = monsterTextures[model.animation.sprite];
});

await resources.loadSprites(monsterSprites, TEXTURE_TYPE.monster);
await resources.loadSprites(heroTextures as any, TEXTURE_TYPE.hero);

const uiCanvasOptions = {
  classNames: ['ui-canvas', 'cursor-default'],
  size: { width: window.innerWidth, height: window.innerHeight },

  battleHeight,
  battleWidth,
  backgroundSprite: TEXTURES.battle_bg_01,
};

const uiCanvas = new UICanvas(battle, uiCanvasOptions);
uiCanvas.draw();

const graph = new BattleGraph(hexObstacles);

const hexLayoutViewOptions = {
  classNames: ['grid-canvas'],
  size: layoutViewSize,
  obstacles: hexObstacles,
};

const hexagonCanvas = new HexLayoutView(battle, graph, hexLayoutViewOptions);
hexagonCanvas.draw();

const unitsViewOptions = {
  classNames: ['units-canvas'],
  size: layoutViewSize,
};

const unitsCanvas = new AnimationView(battle, graph, unitsViewOptions);
unitsCanvas.setup();
