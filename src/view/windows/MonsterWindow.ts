import BattleMonster from '@/controllers/BattleMonster';

import { Observer } from '@/services/Observer';
import { battleLayout, layoutViewSize } from '@/constants/hex';
import type { Bounds } from '@/types';
import MarkupPanel from '../common/MarkupPanel';
import { monsterPopupMarkup as markup } from '@/constants/markup/monster_popup';
import { Point } from '@/models/grid';
import { Monster } from '@/constants/monsters';

class MonsterWindow implements Observer {
  private readonly controller: BattleMonster;
  private readonly ctx: CanvasRenderingContext2D;

  constructor(controller: BattleMonster, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;

    this.controller = controller;
    this.controller.model.addObserver(this);
  }

  public draw() {
    const offset = 10;
    const bounds: Bounds = {
      x: [offset, layoutViewSize.width - offset],
      y: [offset, layoutViewSize.height - offset],
    };

    const markupPanel = new MarkupPanel<Monster>(
      this.ctx,
      markup,
      bounds,
      this.anchorPoint(),
      this.controller.model.data
    );

    markupPanel.draw();
  }

  private anchorPoint(): Point {
    const { position } = this.controller.model;
    return battleLayout.hexToPixel(position);
  }

  update() {
    this.draw();
  }
}

export default MonsterWindow;
