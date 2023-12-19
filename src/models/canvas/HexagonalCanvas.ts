import BattleGrid from '@/view/battle/BattleGrid';
import BattleGraph from '../BattleGraph';
import Battle from '../battle/Battle';
import Canvas, { CanvasOptions } from './Canvas';

import { Point, Hexagon, Layout } from '../grid';
import { EventKey, eventBus } from '@/controllers/EventBus';
import { setCursorStyle } from '@/utils/common';

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
    const { position } = this.battle.activeUnit.model;
    const unitObstacles = this.battle.heroes.flatMap((hero) =>
      hero.army.map((unit) => unit.model.position)
    );

    this.graph.computeHexReachables(position, unitObstacles, 6);
  }

  private drawActiveUnitHex() {
    const { position } = this.battle.activeUnit.model;
    this.gridView.drawActiveHex(this.ctx, position);
  }

  private setHexHoverEvent() {
    eventBus.on(EventKey.hoverHex, async (evt: MouseEvent) => {
      const point = this.mouseEventPoint(evt);

      this.gridView.refresh(this.ctx, this.canvas);
      this.drawActiveUnitHex();

      this.highlightHoveredHex(point);
    });
  }

  private highlightHoveredHex(point: Point) {
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
    const newCursor = isReachableHex ? 'cursor-move' : 'cursor-stop';

    setCursorStyle(newCursor);
  }

  private cursorAngle(hex: Hexagon, point: Point): number {
    const isEnemyHex = this.battle.heroes[1].army.some((unit) =>
      Hexagon.isEqual(unit.model.position, hex)
    );

    if (!isEnemyHex) return -1;

    return this.graph.hexAngleUnderPoint(hex, point);
  }

  private setOnClickEvent() {
    eventBus.on(EventKey.clickHex, (evt: MouseEvent) => {
      const point = this.mouseEventPoint(evt);
      const hexUnderPoint = this.graph.hexUnderPoint(point);

      if (hexUnderPoint) {
        const cursorAngle = this.cursorAngle(hexUnderPoint, point);
        if (cursorAngle !== -1) {
          this.battle.attackUnit(hexUnderPoint, hexUnderPoint.neighbor(cursorAngle));
          return this.animate(hexUnderPoint.neighbor(cursorAngle));
        }
      }

      let lastHex = this.graph.reachableHexUnderPoint(point);

      if (!lastHex) return;
      this.animate(lastHex);
    });
  }

  private animate(lastHex: Hexagon) {
    this.battle.moveActiveUnit(lastHex);
    this.refreshCanvas();
  }

  private attachEvent() {
    eventBus.on(EventKey.refreshCanvas, this.refreshCanvas.bind(this));
  }

  private refreshCanvas() {
    this.computeHexReachables();

    this.gridView.refresh(this.ctx, this.canvas);
    this.drawActiveUnitHex();
  }

  private mouseEventPoint(evt: MouseEvent): Point {
    const rect = (evt.target as HTMLElement).getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;

    return new Point(x, y);
  }
}

export default HexagonalCanvas;
