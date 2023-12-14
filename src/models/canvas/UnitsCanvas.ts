import { SPRITE } from '../../constants/sprites';
import { units } from '../../constants/units';
import AnimatedSprite from '../sprites/AnimatedSprite';
import { Hexagon, Layout } from '../../models/grid';
import SpriteRepository from '../sprites/SpriteRepository';
import Canvas, { CanvasOptions } from './Canvas';
import BattleHeroInfo from '../battle/BattleHeroInfo';
import { heroAnimationSize, heroesClasses } from '@/constants/hero';

export interface UnitsCanvasOptions extends CanvasOptions {
  heroes: Array<BattleHeroInfo>;
}

class UnitsCanvas extends Canvas<UnitsCanvasOptions> {
  private readonly layout: Layout;
  private readonly spriteRepository: SpriteRepository;

  private animationStart: number = 0;
  private heroSprites: Array<{ sprite: AnimatedSprite; frameY: number }> = [];
  private unitSprites: Array<{ sprite: AnimatedSprite; hex: Hexagon }> = [];

  constructor(spriteRepository: SpriteRepository, layout: Layout, options: UnitsCanvasOptions) {
    super(options);

    this.layout = layout;
    this.spriteRepository = spriteRepository;

    this.animationStep = this.animationStep.bind(this);
  }

  public async setup() {
    const heroes = this.options.heroes;

    this.createHero(heroes[0], false);
    this.createHero(heroes[1], true);

    requestAnimationFrame(this.firstFrame.bind(this));
  }

  private createHero(hero: BattleHeroInfo, mirror: boolean) {
    const settings = heroesClasses[hero.options.class];
    const spriteKey = mirror ? 'mirror' : 'normal';

    const sprite = this.spriteRepository.get<AnimatedSprite>(settings.animation.sprites[spriteKey]);
    this.heroSprites.push({ sprite, frameY: settings.animation.frame.y });
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
  }

  private animateSecondHero({ top, left }: { top: number; left: number }) {
    const { width, height } = heroAnimationSize;
    const { sprite, frameY } = this.heroSprites[1];

    sprite.drawFrame(this.ctx, frameY, left, top, width, height);
    sprite.currentFrame++;
  }
}

export default UnitsCanvas;
