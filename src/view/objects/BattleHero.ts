import { Observer } from '@/services/Observer';
import BattleHero from '@/controllers/BattleHero';
import HeroSprite from '../sprites/HeroSprite';

import { Textures } from '@/services/SpriteRepository';
import { heroClassFrameMap } from '@/constants/textures/heroes';
import { TEXTURES } from '@/constants/textures/types';
import { heroOverrides } from '@/constants/textures/overrides';

interface Settings {
  x: number;
  y: number;
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

    const spriteKey = this.settings.mirror ? TEXTURES.hero_mirror : TEXTURES.hero;
    this.sprite = Textures.get<HeroSprite>(spriteKey);

    const classFrame = heroClassFrameMap[model.class];
    this.frameY = model.female ? classFrame.female : classFrame.male;
  }

  draw() {
    const { x, y } = this.settings;
    const { width, height } = heroOverrides;

    this.sprite.drawFrame(this.ctx, this.frameY, x, y, width, height);
    this.sprite.setNextFrame();
  }

  update() {
    this.draw();
  }
}

export default BattleHeroView;
