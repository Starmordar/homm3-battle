import { Observer } from '@/services/Observer';
import AnimatedSprite from '../sprites/AnimatedSprite';
import BattleHero from '@/controllers/BattleHero';

class BattleHeroView implements Observer {
  private readonly controller: BattleHero;
  private readonly ctx: CanvasRenderingContext2D;
  public sprite: AnimatedSprite;

  constructor(controller: BattleHero, ctx: CanvasRenderingContext2D, sprite: AnimatedSprite) {
    this.ctx = ctx;
    this.sprite = sprite;

    this.controller = controller;
    this.controller.model.addObserver(this);
  }

  public draw() {
    console.log('draw', this.ctx);
  }

  update() {
    this.draw();
  }
}

export default BattleHeroView;
