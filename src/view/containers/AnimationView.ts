import View, { ViewOptions } from './View';
import { EventKey, globalEvents } from '@/services/EventBus';

import Battle from '@/controllers/Battle';
import BattleGraph from '@/models/BattleGraph';

import BattleHero from '@/controllers/BattleHero';
import BattleHeroView from '@/view/objects/BattleHero';

import BattleMonster from '@/controllers/BattleMonster';
import BattleMonsterView from '@/view/objects/BattleMonster';
import MonsterWindow from '@/view/windows/MonsterWindow';

import { heroOverrides } from '@/constants/textures/overrides';
import { mousePointFromEvent } from '@/utils/canvas';
import { BUTTON_CODE } from '@/constants/common';

class AnimationView extends View<ViewOptions> {
  private readonly graph: BattleGraph;
  private readonly battle: Battle;

  private startTick: number = 0;

  private heroAnimations: Array<BattleHeroView> = [];
  private monsterAnimations: Array<BattleMonsterView> = [];
  private monsterPopup: MonsterWindow | null = null;

  constructor(battle: Battle, graph: BattleGraph, options: ViewOptions) {
    super(options);

    this.battle = battle;
    this.graph = graph;

    this.animationTick = this.animationTick.bind(this);
  }

  async setup() {
    const [leftHero, rightHero] = this.battle.model.heroes;

    this.heroAnimations.push(this.createHeroAnimation(leftHero, false));
    this.heroAnimations.push(this.createHeroAnimation(rightHero, true));

    this.animationViewListeners();

    requestAnimationFrame(this.firstFrame.bind(this));
  }

  private createHeroAnimation(hero: BattleHero, mirror: boolean) {
    const { top, left, right } = heroOverrides;
    const x = mirror ? right(this.options.size.width) : left;

    const view = new BattleHeroView(hero, this.ctx, { mirror, x, y: top });
    this.createMonsterViews(hero.model.army);

    return view;
  }

  private createMonsterViews(monsters: Array<BattleMonster>) {
    monsters.forEach((monster) => {
      const view = new BattleMonsterView(monster, this.ctx);
      this.monsterAnimations.push(view);
    });
  }

  private firstFrame(timeStamp: DOMHighResTimeStamp) {
    this.startTick = timeStamp;
    this.animationTick(timeStamp);
  }

  private animationTick(timeStamp: DOMHighResTimeStamp) {
    const delta = (timeStamp - this.startTick) / 20;

    if (delta < 1) {
      requestAnimationFrame(this.animationTick);
      return;
    }

    this.startTick = timeStamp;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.animateHeroes();
    this.animateMonsters();
    this.drawMonsterPopup();

    requestAnimationFrame(this.animationTick);
  }

  private animateHeroes() {
    this.heroAnimations.forEach((hero) => hero.draw());
  }

  private animateMonsters() {
    const sorted = this.monsterAnimations.sort((a, b) =>
      this.graph.renderOrder(a.position, b.position)
    );

    sorted.forEach((monster) => monster.draw());
  }

  private drawMonsterPopup() {
    if (!this.monsterPopup) return;
    this.monsterPopup.draw();
  }

  private removeMonsterPopup() {
    if (!this.monsterPopup) return;
    this.monsterPopup.remove();
    this.monsterPopup = null;
  }

  private createMonsterWindow(evt: MouseEvent) {
    const hexUnderPoint = this.graph.hexUnderPoint(mousePointFromEvent(evt));
    if (!hexUnderPoint) return;

    const monster = this.battle.monsterByPosition(hexUnderPoint);
    if (!monster) return;

    this.monsterPopup = new MonsterWindow(monster, this.ctx);
  }

  private animationViewListeners() {
    this.canvas.addEventListener('contextmenu', (evt: MouseEvent) => {
      evt.preventDefault();
    });

    this.canvas.addEventListener('mousedown', (evt: MouseEvent) => {
      if (evt.button === BUTTON_CODE.RIGHT) this.createMonsterWindow(evt);
    });

    this.canvas.addEventListener('mouseup', (evt: MouseEvent) => {
      if (evt.button === BUTTON_CODE.RIGHT) this.removeMonsterPopup();
    });

    this.canvas.addEventListener('mousemove', (evt: MouseEvent) => {
      globalEvents.emit(EventKey.hoverBattleground, evt);
    });

    this.canvas.addEventListener('click', (evt: MouseEvent) => {
      globalEvents.emit(EventKey.clickBattleground, evt);
    });
  }
}

export default AnimationView;
