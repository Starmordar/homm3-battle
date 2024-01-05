import { Observer } from '@/services/Observer';
import BattleHero from '@/controllers/BattleHero';
import HeroSprite from '../sprites/HeroSprite';

import { heroesClasses } from '@/constants/hero';
import { Textures } from '@/services/SpriteRepository';

interface Settings {
  mirror: boolean;
}

class BattleHeroView implements Observer {
  private readonly settings: Settings;
  private readonly controller: BattleHero;
  private readonly ctx: CanvasRenderingContext2D;

  sprite!: HeroSprite;
  frameY!: number;

  constructor(controller: BattleHero, ctx: CanvasRenderingContext2D, settings: Settings) {
    this.settings = settings;
    this.ctx = ctx;

    this.controller = controller;
    this.controller.model.addObserver(this);

    this.createSprite();
  }

  private createSprite() {
    const { model } = this.controller;
    const heroClass = heroesClasses[model.class];
    const spriteKey = this.settings.mirror ? 'mirror' : 'normal';

    this.sprite = Textures.get<HeroSprite>(heroClass.animation.sprites[spriteKey]);
    this.frameY = heroClass.animation.frame.y;
  }

  draw() {
    console.log('draw', this.ctx);
  }

  update() {
    this.draw();
  }
}

export default BattleHeroView;
