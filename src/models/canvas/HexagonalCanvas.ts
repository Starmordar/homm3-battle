import BattleGrid from '@/view/battle/BattleGrid';
import BattleGraph from '../BattleGraph';
import Battle from '../battle/Battle';
import Canvas, { CanvasOptions } from './Canvas';

import { Point, Hexagon, Layout } from '../grid';
import { EventKey, eventBus } from '@/services/EventBus';
import { setCursorStyle } from '@/utils/common';
import { mousePointFromEvent } from '@/utils/canvas';

interface HexagonalCanvasOptions extends CanvasOptions {
  obstacles: Array<Hexagon>;
}

class HexagonalCanvas extends Canvas<HexagonalCanvasOptions> {
  private readonly graph: BattleGraph;
  private readonly gridView: BattleGrid;

  private readonly battle: Battle;

  constructor(layout: Layout, battle: Battle, options: HexagonalCanvasOptions) {
    super(options);

    this.graph = new BattleGraph(layout, options.obstacles);
    this.gridView = new BattleGrid(layout, this.graph);

    this.battle = battle;
  }

  public draw() {
    this.computeHexReachables();

    this.refreshGridView();
    this.attachEvents();
  }

  private computeHexReachables() {
    const { enemyUnitsPosition, activeUnit } = this.battle;
    const { position, data } = activeUnit.model;

    this.graph.computeHexReachables(position, enemyUnitsPosition, data.damage.speed);
  }

  private refreshGridView() {
    this.gridView.clear(this.ctx, this.canvas);
    this.gridView.draw(this.ctx);

    if (!this.battle.animationPending) {
      const { position } = this.battle.activeUnit.model;
      this.gridView.drawActiveHex(this.ctx, position);
    }
  }

  private refreshIdleGridView() {
    this.graph.resetHexReachables();

    this.gridView.clear(this.ctx, this.canvas);
    this.gridView.draw(this.ctx);
  }

  private attachEvents() {
    this.attachHoverEvent();
    this.attachClickEvent();
    this.attachRefreshEvent();
  }

  private attachHoverEvent() {
    eventBus.on(EventKey.hoverHex, (evt) => this.triggerHighlightHovered(evt));
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

  private attachClickEvent() {
    eventBus.on(EventKey.clickHex, (evt) => this.triggerActionOnClick(evt));
  }

  private triggerActionOnClick(evt: MouseEvent) {
    const point = mousePointFromEvent(evt);
    const hexUnderPoint = this.graph.hexUnderPoint(point);

    if (hexUnderPoint) {
      const { position } = this.battle.activeUnit.model;
      const cursorAngle = this.cursorAngle(hexUnderPoint, point);

      if (cursorAngle !== -1) {
        const path = this.graph.getPath(position, hexUnderPoint.neighbor(cursorAngle));
        return this.attackUnit(hexUnderPoint.neighbor(cursorAngle), hexUnderPoint, path);
      }
    }

    let lastHex = this.graph.reachableHexUnderPoint(point);
    if (!lastHex) return;

    const { position } = this.battle.activeUnit.model;
    const path = this.graph.getPath(position, lastHex);

    this.animate(path);
  }

  private async attackUnit(attacking: Hexagon, attacked: Hexagon, path: Array<Hexagon>) {
    this.battle.animationPending = true;

    this.refreshIdleGridView();
    await this.battle.attackUnit(attacking, attacked, path);

    this.battle.animationPending = false;
    this.computeHexReachables();
    this.refreshGridView();
  }

  private async animate(path: Array<Hexagon>) {
    this.battle.animationPending = true;

    this.refreshIdleGridView();
    await this.battle.moveActiveUnit(path);

    this.battle.animationPending = false;
    this.computeHexReachables();
    this.refreshGridView();
  }

  private attachRefreshEvent() {
    eventBus.on(EventKey.refreshCanvas, () => this.refreshGridView());
  }
}

export default HexagonalCanvas;
