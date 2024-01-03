import BattleMonster from '@/controllers/BattleMonster';

import { Observer } from '@/services/Observer';
import { gridLayout } from '@/constants/hex';
import MonsterSprite from '../sprites/MonsterSprite';
import SpriteRepository from '@/services/SpriteRepository';
import { SPRITE } from '@/constants/sprites';

class MonsterWindow implements Observer {
  private readonly spriteRepository: SpriteRepository;
  private readonly controller: BattleMonster;
  private readonly ctx: CanvasRenderingContext2D;
  public sprite: MonsterSprite;

  constructor(
    controller: BattleMonster,
    ctx: CanvasRenderingContext2D,
    spriteRepository: SpriteRepository,
    sprite: MonsterSprite
  ) {
    this.ctx = ctx;
    this.sprite = sprite;

    this.spriteRepository = spriteRepository;
    this.controller = controller;
    this.controller.model.addObserver(this);
  }

  public draw() {
    this.drawWindowSprite();
    this.drawText();
  }

  private getWindowPosition() {
    const { position } = this.controller.model;

    const sprite = this.spriteRepository.get(SPRITE.monster_window);
    const { width, height } = sprite.options;

    const pixel = gridLayout.hexToPixel(position);
    const x = pixel.x - width / 2;
    const y = pixel.y - height;

    return { x, y, width, height };
  }

  private drawWindowSprite() {
    const { x, y, width, height } = this.getWindowPosition();

    const sprite = this.spriteRepository.get(SPRITE.monster_window);
    sprite.drawFrame(this.ctx, 0, 0, x, y, width, height);
  }

  private drawText() {
    console.log('draw creature text');
  }

  update() {
    this.draw();
  }
}

export default MonsterWindow;
