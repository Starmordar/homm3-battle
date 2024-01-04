import BattleMonster from '@/controllers/BattleMonster';

import { Observer } from '@/services/Observer';
import { battleLayout } from '@/constants/hex';
import MonsterSprite from '../sprites/MonsterSprite';
import { Textures } from '@/services/SpriteRepository';
import { SPRITE } from '@/constants/sprites';

const battleWidth = 950;
const battleHeight = 650;

class MonsterWindow implements Observer {
  private readonly controller: BattleMonster;
  private readonly ctx: CanvasRenderingContext2D;
  public sprite: MonsterSprite;

  private x: number = 0;
  private y: number = 0;

  constructor(controller: BattleMonster, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.sprite = Textures.get<MonsterSprite>(controller.model.uuid);

    this.controller = controller;
    this.controller.model.addObserver(this);
  }

  public draw() {
    this.drawWindowSprite();

    this.drawSprite();
    this.drawMonsterSprite();

    this.drawText();
  }

  private getWindowPosition() {
    const { position } = this.controller.model;

    const sprite = Textures.get(SPRITE.monster_window);
    const { width, height } = sprite.options;

    const pixel = battleLayout.hexToPixel(position);
    this.x = this.xPosition(pixel.x - width / 2, width);
    this.y = this.yPosition(pixel.y - height / 2, height);

    return { x: this.x, y: this.y, width, height };
  }

  private xPosition(x: number, max: number) {
    if (x < 0) return 0;
    if (x + max > battleHeight) return battleWidth - max;
    return x;
  }

  private yPosition(y: number, max: number) {
    if (y < 0) return 0;
    if (y + max > battleHeight - 90) return battleHeight - max - 90;
    return y;
  }

  private drawWindowSprite() {
    const { x, y, width, height } = this.getWindowPosition();

    const sprite = Textures.get(SPRITE.monster_window);
    sprite.drawFrame(this.ctx, 0, 0, x, y, width, height);
  }

  private setTextStyles() {
    this.ctx.font = '13px sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.textBaseline = 'bottom';
  }

  private drawSprite() {
    const sprite = Textures.get(SPRITE.necropolis_monster_bg);
    sprite.drawFrame(this.ctx, 0, 0, this.x + 20, this.y + 47, 101, 131);
  }

  private drawText() {
    const { data } = this.controller.model;

    const left = this.x + 155;
    const top = this.y + 45;
    const right = left + 120;

    this.setTextStyles();

    this.ctx.textAlign = 'start';
    this.ctx.fillText('Attack Skill', left, top + 19);
    this.ctx.fillText('Defense Skill', left, top + 19 * 2);
    this.ctx.fillText('Shots', left, top + 19 * 3);
    this.ctx.fillText('Damage', left, top + 19 * 4);
    this.ctx.fillText('Health', left, top + 19 * 5);
    this.ctx.fillText('Health Left', left, top + 19 * 6);
    this.ctx.fillText('Speed', left, top + 19 * 7);

    this.ctx.textAlign = 'right';
    this.ctx.fillText(`${data.damage.attack}`, right, top + 19);
    this.ctx.fillText(`${data.damage.defense}`, right, top + 19 * 2);
    this.ctx.fillText(`${data.damage.shots ?? 0}`, right, top + 19 * 3);
    this.ctx.fillText(`${data.damage.melee.join(' - ')}`, right, top + 19 * 4);
    this.ctx.fillText(`${data.damage.hitPoints}`, right, top + 19 * 5);
    this.ctx.fillText(`${12}`, right, top + 19 * 6);
    this.ctx.fillText(`${data.damage.speed}`, right, top + 19 * 7);

    this.ctx.textAlign = 'center';
    this.ctx.fillText(`${data.type}`, this.x + 150, this.y + 40);

    this.ctx.textAlign = 'start';
    this.ctx.fillText(data.abilityText, this.x + 20, top + 202);
  }

  private drawMonsterSprite() {
    const { animation } = this.controller.model;
    const { width, height } = animation.size;

    this.sprite.drawFrame(this.ctx, this.x + 10, this.y + 47, width, height);
    this.sprite.setNextFrame();
  }

  update() {
    this.draw();
  }
}

export default MonsterWindow;
