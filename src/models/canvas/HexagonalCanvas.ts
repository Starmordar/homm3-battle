import BattleGrid from '@/view/battle/BattleGrid';
import BattleGraph from '../BattleGraph';
import Battle from '../battle/Battle';
import Canvas, { CanvasOptions } from './Canvas';

import { Point, Hexagon, Layout } from '../grid';
import { EventKey, eventBus } from '@/controllers/EventBus';
import { updateCursorStyle } from '@/utils/common';

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

  public display() {
    this.computeHexReachables();

    this.gridView.draw(this.ctx);
    this.drawActiveUnitHex();

    this.setHexHoverEvent();
    this.setOnClickEvent();
    this.attachEvent();
  }

  private computeHexReachables() {
    const { position } = this.battle.activeUnit;
    const unitObstacles = this.battle.heroes.flatMap((hero) =>
      hero.army.map((unit) => unit.position)
    );

    this.graph.computeHexReachables(position, unitObstacles, 6);
  }

  private drawActiveUnitHex() {
    const { position } = this.battle.activeUnit;
    this.gridView.drawActiveHex(this.ctx, position);
  }

  private setHexHoverEvent() {
    eventBus.on(EventKey.hoverHex, async (evt: MouseEvent) => {
      const rect = (evt.target as HTMLElement).getBoundingClientRect();
      const x = evt.clientX - rect.left;
      const y = evt.clientY - rect.top;

      this.gridView.refresh(this.ctx, this.canvas);
      this.drawActiveUnitHex();

      this.highlightHoveredHex(new Point(x, y));
    });
  }

  private highlightHoveredHex(hoveredPoint: Point) {
    const hexUnderPoint = this.graph.hexUnderPoint(hoveredPoint);

    if (hexUnderPoint && this.graph.isPositionReachable(hexUnderPoint)) {
      this.gridView.drawHighlightedHex(this.ctx, hexUnderPoint);
    }

    this.setMoveCursor(hexUnderPoint);

    if (hexUnderPoint) {
      const cursorAngle = this.cursorAngle(hexUnderPoint, hoveredPoint);
      if (cursorAngle !== -1) this.updateEnemyCursor(cursorAngle);
    }
  }

  private cursorAngle(hex: Hexagon, point: Point): number {
    const isEnemyHex = this.battle.heroes[1].army.some((unit) =>
      Hexagon.isEqual(unit.position, hex)
    );

    if (!isEnemyHex) return -1;

    return this.graph.hexAngleUnderPoint(hex, point);
  }

  private updateEnemyCursor(angle: number) {
    updateCursorStyle('any', `melee_attack_${angle}`);
  }

  private setMoveCursor(hex: Hexagon | undefined) {
    const moveNotAllowed = !hex || !this.graph.isPositionReachable(hex);

    const newCursor = moveNotAllowed ? 'cursor-stop' : 'cursor-move';
    const oldCursor = moveNotAllowed ? 'cursor-move' : 'cursor-stop';

    updateCursorStyle(oldCursor, newCursor);
  }

  private setOnClickEvent() {
    eventBus.on(EventKey.clickHex, (evt: MouseEvent) => {
      const rect = (evt.target as HTMLElement).getBoundingClientRect();
      const x = evt.clientX - rect.left;
      const y = evt.clientY - rect.top;

      const clickedHex = this.graph.hexUnderPoint(new Point(x, y));

      if (clickedHex) {
        const cursorAngle = this.cursorAngle(clickedHex, new Point(x, y));
        if (cursorAngle !== -1) return this.animate(clickedHex.neighbor(cursorAngle));
      }

      let lastHex = this.graph.reachableHexUnderPoint(new Point(x, y));

      if (!lastHex) return;
      this.animate(lastHex);
    });
  }

  private animate(lastHex: Hexagon) {
    this.battle.moveActiveUnit(lastHex);

    this.computeHexReachables();

    this.gridView.refresh(this.ctx, this.canvas);
    this.drawActiveUnitHex();
  }

  private attachEvent() {
    eventBus.on(EventKey.refreshCanvas, () => {
      this.computeHexReachables();

      this.gridView.refresh(this.ctx, this.canvas);
      this.drawActiveUnitHex();
    });
  }
}

export default HexagonalCanvas;
