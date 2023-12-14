import SpriteRepository from '../sprites/SpriteRepository';
import Canvas, { CanvasOptions } from './Canvas';

import BattleHeroInfo from '../battle/BattleHeroInfo';
import AnimatedSprite from '../sprites/AnimatedSprite';
import { Layout } from '../../models/grid';

import { type SpriteAnimation } from '../../constants/sprites';
import { Creature, heroArmy } from '../../constants/units';
import { heroAnimationSize, heroesClasses } from '@/constants/hero';

export interface UnitsCanvasOptions extends CanvasOptions {
  heroes: Array<BattleHeroInfo>;
}

export interface AnimatedUnit {
  sprite: AnimatedSprite;
  creature: Creature;
}

class UnitsCanvas extends Canvas<UnitsCanvasOptions> {
  private readonly layout: Layout;
  private readonly spriteRepository: SpriteRepository;

  private animationStart: number = 0;
  private heroSprites: Array<{ sprite: AnimatedSprite; frameY: number }> = [];
  private unitSprites: Array<AnimatedUnit> = [];

  constructor(spriteRepository: SpriteRepository, layout: Layout, options: UnitsCanvasOptions) {
    super(options);

    this.layout = layout;
    this.spriteRepository = spriteRepository;

    this.animationStep = this.animationStep.bind(this);
  }

  public async setup() {
    const heroes = this.options.heroes;

    this.createHeroAnimation(heroes[0], false);
    this.createHeroAnimation(heroes[1], true);

    this.createCreaturesAnimation();

    requestAnimationFrame(this.firstFrame.bind(this));
  }

  private createHeroAnimation(hero: BattleHeroInfo, mirror: boolean) {
    const settings = heroesClasses[hero.options.class];
    const spriteKey = mirror ? 'mirror' : 'normal';

    const sprite = this.spriteRepository.get<AnimatedSprite>(settings.animation.sprites[spriteKey]);
    this.heroSprites.push({ sprite, frameY: settings.animation.frame.y });
  }

  private createCreaturesAnimation() {
    heroArmy.forEach((creature) => {
      const sprite = this.spriteRepository.get<AnimatedSprite>(creature.sprite);
      this.unitSprites.push({ sprite, creature });
    });
  }

  private firstFrame(timeStamp: DOMHighResTimeStamp) {
    this.animationStart = timeStamp;
    this.animationStep(timeStamp);
  }

  private animationStep(timeStamp: DOMHighResTimeStamp) {
    const delta = (timeStamp - this.animationStart) / 250;

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
    this.unitSprites.forEach((animatedUnit) => this.animateCreature(animatedUnit));
  }

  private animateCreature(animatedUnit: AnimatedUnit) {
    const { creature, sprite } = animatedUnit;
    const { width, height, offsetY } = creature.size;

    const pixel = this.layout.hexToPixel(creature.hex);
    const x = pixel.x - width / 2;
    const y = pixel.y - height + offsetY;

    sprite.drawFrame(this.ctx, 0, x, y, width, height);
    sprite.currentFrame++;
  }
}

export default UnitsCanvas;
