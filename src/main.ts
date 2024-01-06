import './index.css';

import ResourceController from './services/ResourceController';

import BackgroundView from './view/containers/BackgroundView';
import AnimationView from './view/containers/AnimationView';
import LayoutView from './view/containers/LayoutView';

import Battle from '@/controllers/Battle';
import BattleModel from './models/Battle';
import BattleGraph from './models/BattleGraph';

import { battleHeight, battleWidth, hexObstacles, layoutViewSize } from './constants/hex';
import { BATTLE_SIDE } from './constants/common';
import { monsterTextures } from './constants/textures/monsters';
import { heroTextures } from './constants/textures/heroes';
import { TEXTURES, TEXTURE_TYPE } from './constants/textures/types';

const resources = new ResourceController();
await resources.load();
const settings = await resources.loadSettings();

const side = BATTLE_SIDE.left;
const battleModel = new BattleModel(side, settings);
const battle = new Battle(battleModel);

const monsterSprites: Record<string, any> = {};

battle.monsters.forEach(({ model }) => {
  monsterSprites[model.uuid] = monsterTextures[model.animation.sprite];
});

await resources.loadSprites(monsterSprites, TEXTURE_TYPE.monster);
await resources.loadSprites(heroTextures as any, TEXTURE_TYPE.hero);

const backgroundViewOptions = {
  classNames: ['ui-canvas', 'cursor-default'],
  size: { width: window.innerWidth, height: window.innerHeight },

  battleHeight,
  battleWidth,
  backgroundSprite: TEXTURES.battle_bg_01,
};

const backgroundView = new BackgroundView(battle, backgroundViewOptions);
backgroundView.draw();

const graph = new BattleGraph(hexObstacles);

const layoutViewOptions = {
  classNames: ['grid-canvas'],
  size: layoutViewSize,
  obstacles: hexObstacles,
};

const layoutView = new LayoutView(battle, graph, layoutViewOptions);
layoutView.draw();

const animationViewOptions = {
  classNames: ['units-canvas'],
  size: layoutViewSize,
};

const animationView = new AnimationView(battle, graph, animationViewOptions);
animationView.setup();
