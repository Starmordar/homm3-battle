import { Textures } from '../../services/SpriteRepository';
import Canvas, { CanvasOptions } from './Canvas';

import AnimatedSprite from '../../view/sprites/AnimatedSprite';

import { type SpriteAnimation } from '../../constants/sprites';
import { heroAnimationSize, heroesClasses } from '@/constants/hero';
import { EventKey, globalEvents } from '@/services/EventBus';

import BattleMonster from '@/controllers/BattleMonster';
import BattleMonsterView from '@/view/objects/BattleMonster';
import BattleHero from '@/controllers/BattleHero';
import MonsterSprite from '@/view/sprites/MonsterSprite';
import Battle from '@/controllers/Battle';
import { mousePointFromEvent } from '@/utils/canvas';
import BattleGraph from '../BattleGraph';
import MonsterWindow from '@/view/windows/MonsterWindow';

export interface ViewOptions extends CanvasOptions {}

export interface AnimatedUnit {
  sprite: AnimatedSprite;
  monster: BattleMonster;
}

class UnitsView extends Canvas<ViewOptions> {
  private readonly graph: BattleGraph;
  private readonly battle: Battle;

  private animationStart: number = 0;
  private heroSprites: Array<{ sprite: AnimatedSprite; frameY: number }> = [];

  private monsters: Array<BattleMonsterView> = [];
  private showMenu: boolean;
  private monsterWindow: MonsterWindow | null;

  constructor(battle: Battle, graph: BattleGraph, options: ViewOptions) {
    super(options);

    this.battle = battle;
    this.graph = graph;

    this.showMenu = false;
    this.monsterWindow = null;

    this.animationStep = this.animationStep.bind(this);
  }

  public async setup() {
    const heroes = this.battle.model.heroes;

    this.createHeroAnimation(heroes[0], false);
    this.createHeroAnimation(heroes[1], true);

    this.attachMouseEvents();

    requestAnimationFrame(this.firstFrame.bind(this));
  }

  private createHeroAnimation(hero: BattleHero, mirror: boolean) {
    const settings = heroesClasses[hero.model.class];
    const spriteKey = mirror ? 'mirror' : 'normal';

    const sprite = Textures.get<AnimatedSprite>(settings.animation.sprites[spriteKey]);
    this.heroSprites.push({ sprite, frameY: settings.animation.frame.y });

    this.createCreaturesAnimation(hero.model.army);
  }

  private createCreaturesAnimation(army: Array<BattleMonster>) {
    army.forEach((monster) => {
      const sprite = Textures.get<MonsterSprite>(monster.model.uuid);

      const monsterView = new BattleMonsterView(monster, this.ctx, sprite);
      this.monsters.push(monsterView);
    });
  }

  private firstFrame(timeStamp: DOMHighResTimeStamp) {
    this.animationStart = timeStamp;
    this.animationStep(timeStamp);
  }

  private animationStep(timeStamp: DOMHighResTimeStamp) {
    const delta = (timeStamp - this.animationStart) / 20;

    if (delta < 1) {
      requestAnimationFrame(this.animationStep);
      return;
    }

    this.animationStart = timeStamp;
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
    const { sprite, frameY } = this.heroSprites[0];

    sprite.drawFrame(this.ctx, frameY, left, top, width, height);
    sprite.currentFrame++;
    sprite.nextAnimation = this.nextHeroAnimation();
  }

  private animateSecondHero({ top, left }: { top: number; left: number }) {
    const { width, height } = heroAnimationSize;
    const { sprite, frameY } = this.heroSprites[1];

    sprite.drawFrame(this.ctx, frameY, left, top, width, height);
    sprite.currentFrame++;
    sprite.nextAnimation = this.nextHeroAnimation();
  }

  private nextHeroAnimation(): keyof SpriteAnimation {
    return Math.random() < 0.05 ? 'active' : 'idle';
  }

  private animateCreatures() {
    const sortedMonsters = this.monsters.sort((a, b) => a.position.r - b.position.r);
    sortedMonsters.forEach((monster) => monster.draw());
  }

  private drawMonsterWindow() {
    if (!this.showMenu) return;
    console.log('draw monster window');
    this.monsterWindow?.draw();
  }

  private attachMouseEvents() {
    this.canvas.addEventListener('contextmenu', (evt: MouseEvent) => {
      evt.preventDefault();
    });

    this.canvas.addEventListener('mousedown', (evt: MouseEvent) => {
      if (evt.button === 2) {
        this.triggerMonsterWindow(evt);
        this.showMenu = true;
      }
    });

    this.canvas.addEventListener('mouseup', (evt: MouseEvent) => {
      if (evt.button === 2) {
        console.log('mouseup trigger');
        this.monsterWindow = null;
        this.showMenu = false;
      }
    });

    this.canvas.addEventListener('mousemove', (evt: MouseEvent) => {
      globalEvents.emit(EventKey.hoverBattleground, evt);
    });

    this.canvas.addEventListener('click', (evt: MouseEvent) => {
      globalEvents.emit(EventKey.clickBattleground, evt);
    });
  }

  private triggerMonsterWindow(evt: MouseEvent) {
    const hexUnderPoint = this.graph.hexUnderPoint(mousePointFromEvent(evt));
    if (!hexUnderPoint) return;

    const monster = this.battle.monsterByPosition(hexUnderPoint);
    if (!monster) return;

    this.monsterWindow = new MonsterWindow(monster, this.ctx);
  }
}

export default UnitsView;
