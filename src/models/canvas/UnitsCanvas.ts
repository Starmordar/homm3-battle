import SpriteRepository from '../../services/SpriteRepository';
import Canvas, { CanvasOptions } from './Canvas';

import AnimatedSprite from '../../view/sprites/AnimatedSprite';

import { type SpriteAnimation } from '../../constants/sprites';
import { heroAnimationSize, heroesClasses } from '@/constants/hero';
import { EventKey, globalEvents } from '@/services/EventBus';

import BattleMonster from '@/controllers/objects/BattleMonster';
import BattleMonsterView from '@/view/objects/BattleMonster';
import BattleHero from '@/controllers/objects/BattleHero';

export interface UnitsCanvasOptions extends CanvasOptions {
  heroes: Array<BattleHero>;
}

export interface AnimatedUnit {
  sprite: AnimatedSprite;
  monster: BattleMonster;
}

class UnitsCanvas extends Canvas<UnitsCanvasOptions> {
  private readonly spriteRepository: SpriteRepository;

  private animationStart: number = 0;
  private heroSprites: Array<{ sprite: AnimatedSprite; frameY: number }> = [];

  private monsters: Array<BattleMonsterView> = [];

  constructor(spriteRepository: SpriteRepository, options: UnitsCanvasOptions) {
    super(options);

    this.spriteRepository = spriteRepository;
    this.animationStep = this.animationStep.bind(this);
  }

  public async setup() {
    const heroes = this.options.heroes;

    this.createHeroAnimation(heroes[0], false);
    this.createHeroAnimation(heroes[1], true);

    this.attachMouseEvents();

    requestAnimationFrame(this.firstFrame.bind(this));
  }

  private createHeroAnimation(hero: BattleHero, mirror: boolean) {
    const settings = heroesClasses[hero.model.class];
    const spriteKey = mirror ? 'mirror' : 'normal';

    const sprite = this.spriteRepository.get<AnimatedSprite>(settings.animation.sprites[spriteKey]);
    this.heroSprites.push({ sprite, frameY: settings.animation.frame.y });

    this.createCreaturesAnimation(hero.model.army);
  }

  private createCreaturesAnimation(army: Array<BattleMonster>) {
    army.forEach((monster) => {
      const sprite = this.spriteRepository.get<AnimatedSprite>(monster.model.animation.sprite);

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
    this.monsters.forEach((monster) => monster.draw());
  }

  private attachMouseEvents() {
    this.canvas.addEventListener('mousemove', async (evt: MouseEvent) => {
      globalEvents.emit(EventKey.hoverHex, evt);
    });

    this.canvas.addEventListener('click', async (evt: MouseEvent) => {
      globalEvents.emit(EventKey.clickHex, evt);
    });
  }
}

export default UnitsCanvas;
