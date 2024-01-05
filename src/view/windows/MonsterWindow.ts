import BattleMonster from '@/controllers/BattleMonster';

import { Observer } from '@/services/Observer';
import { battleLayout, layoutViewSize } from '@/constants/hex';
import type { Bounds } from '@/types';
import MarkupPanel from '../common/MarkupPanel';
import { monsterPopupMarkup as markup } from '@/constants/markup/monster_popup';
import { Point } from '@/models/grid';
import BattleMonsterModel from '@/models/BattleMonsterModel';

const offset = 10;

class MonsterWindow implements Observer {
  private readonly controller: BattleMonster;
  private readonly ctx: CanvasRenderingContext2D;
  private bounds: Bounds;

  constructor(controller: BattleMonster, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;

    this.bounds = {
      x: [offset, layoutViewSize.width - offset],
      y: [offset, layoutViewSize.height - offset],
    };

    this.controller = controller;
    this.controller.model.addObserver(this);
  }

  draw() {
    const markupPanel = new MarkupPanel<BattleMonsterModel>(
      this.ctx,
      markup,
      this.bounds,
      this.anchorPoint(),
      this.controller.model
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

  remove() {
    this.controller.model.removeObserver(this);
  }
}

export default MonsterWindow;
