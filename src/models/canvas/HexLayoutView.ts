import BattleGrid from '@/view/battle/BattleGrid';
import Battle from '@/controllers/Battle';

import BattleGraph from '../BattleGraph';
import View, { ViewOptions } from './View';

import { Point, Hexagon } from '../grid';
import { EventKey, globalEvents } from '@/services/EventBus';
import { setCursorStyle } from '@/utils/common';
import { mousePointFromEvent } from '@/utils/canvas';

interface ViewOptions extends ViewOptions {
  obstacles: Array<Hexagon>;
}

class HexLayoutView extends View<ViewOptions> {
  private readonly graph: BattleGraph;
  private readonly gridView: BattleGrid;
  private readonly battle: Battle;

  constructor(battle: Battle, graph: BattleGraph, options: ViewOptions) {
    super(options);

    this.graph = graph;
    this.gridView = new BattleGrid(this.graph);
    this.battle = battle;
  }

  public draw() {
    this.computeHexReachables();

    this.refreshGridView();
    this.attachEvents();
  }

  private computeHexReachables() {
    const { enemyUnitsPosition, activeUnit } = this.battle.model;
    const { position, data } = activeUnit.model;

    this.graph.computeHexReachables(position, enemyUnitsPosition, data.damage.speed);
  }

  private refreshGridView() {
    this.gridView.clear(this.ctx, this.canvas);
    this.gridView.draw(this.ctx);

    if (!this.battle.model.animationPending) {
      const { position } = this.battle.model.activeUnit.model;
      this.gridView.drawActiveHex(this.ctx, position);
    }
  }

  private refreshIdleGridView() {
    this.graph.resetHexReachables();

    this.gridView.clear(this.ctx, this.canvas);
    this.gridView.draw(this.ctx);
  }

  private attachEvents() {
    globalEvents.on(EventKey.hoverBattleground, (evt) => this.triggerHighlightHovered(evt));
    globalEvents.on(EventKey.clickBattleground, (evt) => this.triggerActionOnClick(evt));

    globalEvents.on(EventKey.nextTurn, () => {
      this.computeHexReachables();
      this.refreshGridView();
    });
  }

  private triggerHighlightHovered(evt: MouseEvent) {
    const point = mousePointFromEvent(evt);

    this.refreshGridView();
    this.highlightHovered(point);
  }

  private highlightHovered(point: Point) {
    const hexUnderPoint = this.graph.hexUnderPoint(point);

    if (hexUnderPoint && this.graph.isPositionReachable(hexUnderPoint)) {
      this.gridView.drawHighlightedHex(this.ctx, hexUnderPoint);
    }

    this.updateCursor(hexUnderPoint, point);
  }

  private updateCursor(hex: Hexagon | undefined, point: Point) {
    if (!hex) return setCursorStyle('cursor-stop');

    const cursorAngle = this.cursorAngle(hex, point);
    if (cursorAngle !== -1) return setCursorStyle(`melee_attack_${cursorAngle}`);

    const isReachableHex = this.graph.isPositionReachable(hex);
    const cursor = isReachableHex ? 'cursor-move' : 'cursor-stop';

    setCursorStyle(cursor);
  }

  private cursorAngle(hex: Hexagon, point: Point): number {
    const isEnemyHex = this.battle.isEnemyByPosition(hex);
    if (!isEnemyHex) return -1;

    return this.graph.hexAngleUnderPoint(hex, point);
  }

  private triggerActionOnClick(evt: MouseEvent) {
    const point = mousePointFromEvent(evt);
    const hexUnderPoint = this.graph.hexUnderPoint(point);

    if (hexUnderPoint) {
      const { position } = this.battle.model.activeUnit.model;
      const cursorAngle = this.cursorAngle(hexUnderPoint, point);

      if (cursorAngle !== -1) {
        const path = this.graph.getPath(position, hexUnderPoint.neighbor(cursorAngle));
        return this.attackUnit(
          hexUnderPoint.neighbor(cursorAngle),
          hexUnderPoint,
          path,
          cursorAngle
        );
      }
    }

    let lastHex = this.graph.reachableHexUnderPoint(point);
    if (!lastHex) return;

    const { position } = this.battle.model.activeUnit.model;
    const path = this.graph.getPath(position, lastHex);

    this.animate(path);
  }

  private async attackUnit(
    attacking: Hexagon,
    attacked: Hexagon,
    path: Array<Hexagon>,
    cursorAngle: number
  ) {
    this.battle.model.animationPending = true;

    this.refreshIdleGridView();
    await this.battle.attackUnit(attacking, attacked, path, cursorAngle);

    this.battle.model.animationPending = false;
    this.computeHexReachables();
    this.refreshGridView();
  }

  private async animate(path: Array<Hexagon>) {
    this.battle.model.animationPending = true;

    this.refreshIdleGridView();
    await this.battle.moveActiveUnit(path);

    this.battle.model.animationPending = false;
    this.computeHexReachables();
    this.refreshGridView();
  }
}

export default HexLayoutView;
