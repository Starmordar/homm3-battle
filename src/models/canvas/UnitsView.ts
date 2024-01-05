import Canvas, { CanvasOptions } from './Canvas';

import { heroAnimationSize } from '@/constants/hero';
import { EventKey, globalEvents } from '@/services/EventBus';

import Battle from '@/controllers/Battle';
import BattleGraph from '@/models/BattleGraph';

import BattleHero from '@/controllers/BattleHero';
import BattleHeroView from '@/view/objects/BattleHero';

import BattleMonster from '@/controllers/BattleMonster';
import BattleMonsterView from '@/view/objects/BattleMonster';
import MonsterWindow from '@/view/windows/MonsterWindow';

import { mousePointFromEvent } from '@/utils/canvas';
import { BUTTON_CODE } from '@/constants/common';
import MonsterSprite from '@/view/sprites/MonsterSprite';

export interface ViewOptions extends CanvasOptions {}

export interface AnimatedUnit {
  sprite: MonsterSprite;
  monster: BattleMonster;
}

class UnitsView extends Canvas<ViewOptions> {
  private readonly graph: BattleGraph;
  private readonly battle: Battle;

  private animationStartTimestamp: number = 0;
  private heroViews: Array<BattleHeroView> = [];
  private monsterViews: Array<BattleMonsterView> = [];
  private monsterWindow: MonsterWindow | null;

  constructor(battle: Battle, graph: BattleGraph, options: ViewOptions) {
    super(options);

    this.battle = battle;
    this.graph = graph;

    this.monsterWindow = null;
    this.animationStep = this.animationStep.bind(this);
  }

  public async setup() {
    const [leftHero, rightHero] = this.battle.model.heroes;

    this.createHeroView(leftHero, false);
    this.createHeroView(rightHero, true);

    this.attachEvents();

    requestAnimationFrame(this.firstFrame.bind(this));
  }

  private createHeroView(hero: BattleHero, mirror: boolean) {
    const view = new BattleHeroView(hero, this.ctx, { mirror });
    this.heroViews.push(view);

    this.createMonsterViews(hero.model.army);
  }

  private createMonsterViews(monsters: Array<BattleMonster>) {
    monsters.forEach((monster) => {
      const view = new BattleMonsterView(monster, this.ctx);
      this.monsterViews.push(view);
    });
  }

  private firstFrame(timeStamp: DOMHighResTimeStamp) {
    this.animationStartTimestamp = timeStamp;
    this.animationStep(timeStamp);
  }

  private animationStep(timeStamp: DOMHighResTimeStamp) {
    const delta = (timeStamp - this.animationStartTimestamp) / 20;

    if (delta < 1) {
      requestAnimationFrame(this.animationStep);
      return;
    }

    this.animationStartTimestamp = timeStamp;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.animateHeroes();
    this.animateCreatures();
    this.drawMonsterWindow();

    requestAnimationFrame(this.animationStep);
  }

  private animateHeroes() {
    const offsetY = -30;
    const offsetStartX = -15;
    const offsetEndX = this.options.size.width - 130;

    this.animateFirstHero({ top: offsetY, left: offsetStartX });
    this.animateSecondHero({ top: offsetY, left: offsetEndX });
  }

  private animateFirstHero({ top, left }: { top: number; left: number }) {
    const { width, height } = heroAnimationSize;
    const { sprite } = this.heroViews[0];

    sprite.drawFrame(this.ctx, left, top, width, height);
    sprite.setNextFrame();
  }

  private animateSecondHero({ top, left }: { top: number; left: number }) {
    const { width, height } = heroAnimationSize;
    const { sprite } = this.heroViews[1];

    sprite.drawFrame(this.ctx, left, top, width, height);
    sprite.setNextFrame();
  }

  private animateCreatures() {
    const sortedMonsters = this.monsterViews.sort((a, b) => a.position.r - b.position.r);
    sortedMonsters.forEach((monster) => monster.draw());
  }

  private drawMonsterWindow() {
    this.monsterWindow?.draw();
  }

  private removeMonsterWindow() {
    this.monsterWindow?.remove();
    this.monsterWindow = null;
  }

  private createMonsterWindow(evt: MouseEvent) {
    const hexUnderPoint = this.graph.hexUnderPoint(mousePointFromEvent(evt));
    if (!hexUnderPoint) return;

    const monster = this.battle.monsterByPosition(hexUnderPoint);
    if (!monster) return;

    this.monsterWindow = new MonsterWindow(monster, this.ctx);
  }

  private attachEvents() {
    this.canvas.addEventListener('contextmenu', (evt: MouseEvent) => {
      evt.preventDefault();
    });

    this.canvas.addEventListener('mousedown', (evt: MouseEvent) => {
      if (evt.button === BUTTON_CODE.RIGHT) this.createMonsterWindow(evt);
    });

    this.canvas.addEventListener('mouseup', (evt: MouseEvent) => {
      if (evt.button === BUTTON_CODE.RIGHT) this.removeMonsterWindow();
    });

    this.canvas.addEventListener('mousemove', (evt: MouseEvent) => {
      globalEvents.emit(EventKey.hoverBattleground, evt);
    });

    this.canvas.addEventListener('click', (evt: MouseEvent) => {
      globalEvents.emit(EventKey.clickBattleground, evt);
    });
  }
}

export default UnitsView;
