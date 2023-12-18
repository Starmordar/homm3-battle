import {
  hexLabelColors,
  hexOutlineStyle,
  hexLabelStyles,
  activeHexStyles,
} from '../../constants/hex';

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
  private readonly layout: Layout;
  private readonly graph: BattleGraph;

  private readonly battle: Battle;

  constructor(layout: Layout, battle: Battle, options: HexagonalCanvasOptions) {
    super(options);

    this.graph = new BattleGraph(layout, options.obstacles);
    this.layout = layout;
    this.battle = battle;
  }

  public display() {
    this.computeHexReachables();

    this.drawHexagonalGrid();
    this.drawReachableHexes();
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

  private drawReachableHexes() {
    this.graph.hexReachables.forEach((hex) => {
      const corners = this.layout.hexToCorners(hex);

      this.ctx.beginPath();
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';

      this.ctx.moveTo(corners[5].x, corners[5].y);
      for (let i = 0; i < 6; i++) {
        this.ctx.lineTo(corners[i].x, corners[i].y);
      }

      this.ctx.fill();
    });
  }

  private drawActiveUnitHex() {
    const { position } = this.battle.activeUnit;

    const corners = this.layout.hexToCorners(position);

    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';

    this.ctx.moveTo(corners[5].x, corners[5].y);
    for (let i = 0; i < 6; i++) {
      this.ctx.lineTo(corners[i].x, corners[i].y);
    }

    this.ctx.fill();
  }

  private drawHexagonalGrid() {
    for (const [hex, corners] of this.graph.hexCornersMap) {
      this.drawHexOutline(corners);
      this.drawHexLabel(hex);
    }
  }

  private drawHexOutline(corners: Array<Point>) {
    const startPoint = corners[corners.length - 1];

    this.ctx.beginPath();

    this.ctx.moveTo(startPoint.x, startPoint.y);
    for (let i = 0; i < corners.length; i++) {
      this.ctx.lineTo(corners[i].x, corners[i].y);
    }

    this.ctx.strokeStyle = hexOutlineStyle.strokeStyle;
    this.ctx.lineWidth = hexOutlineStyle.lineWidth;

    this.ctx.stroke();
  }

  private drawHexLabel(hex: Hexagon) {
    // const center = this.layout.hexToPixel(hex);

    this.ctx.fillStyle = this.getHexLabelColor(hex);
    this.ctx.font = hexLabelStyles.font;
    this.ctx.textAlign = hexLabelStyles.textAlign;
    this.ctx.textBaseline = hexLabelStyles.textBaseline;

    // this.ctx.fillText(`${hex.q},${hex.r},${hex.s}`, center.x, center.y);
  }

  private getHexLabelColor(hex: Hexagon): string {
    if (hex.q === 0 && hex.r === 0 && hex.s === 0) return hexLabelColors.startHex;
    else if (hex.q === 0) return hexLabelColors.zeroQ;
    else if (hex.r === 0) return hexLabelColors.zeroR;
    else if (hex.s === 0) return hexLabelColors.zeroS;

    return hexLabelColors.other;
  }

  private setHexHoverEvent() {
    eventBus.on(EventKey.hoverHex, async (evt: MouseEvent) => {
      const rect = (evt.target as HTMLElement).getBoundingClientRect();
      const x = evt.clientX - rect.left;
      const y = evt.clientY - rect.top;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.drawHexagonalGrid();
      this.drawReachableHexes();
      this.drawActiveUnitHex();
      this.highlightHoveredHex(new Point(x, y));
    });
  }

  private highlightHoveredHex(hoveredPoint: Point) {
    const hexUnderPoint = this.graph.hexUnderPoint(hoveredPoint);

    if (hexUnderPoint && this.graph.isPositionReachable(hexUnderPoint)) {
      this.highlightHex(hexUnderPoint);
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

  private highlightHex(hex: Hexagon) {
    const corners = this.layout.hexToCorners(hex);

    this.ctx.beginPath();
    this.ctx.fillStyle = activeHexStyles.fillStyle;

    this.ctx.moveTo(corners[5].x, corners[5].y);
    for (let i = 0; i < 6; i++) {
      this.ctx.lineTo(corners[i].x, corners[i].y);
    }

    this.ctx.fill();
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

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawHexagonalGrid();
    this.drawReachableHexes();
    this.drawActiveUnitHex();
  }

  private attachEvent() {
    eventBus.on(EventKey.refreshCanvas, () => {
      this.computeHexReachables();

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawHexagonalGrid();
      this.drawReachableHexes();
      this.drawActiveUnitHex();
    });
  }
}

export default HexagonalCanvas;
