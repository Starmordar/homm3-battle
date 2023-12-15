import {
  battleGridSize,
  hexLabelColors,
  hexStyles,
  hexLabelStyles,
  activeHexStyles,
} from '../../constants/hex';

import Battle from '../battle/Battle';
import Canvas, { CanvasOptions } from './Canvas';

import { Point, Hexagon, Layout } from '../grid';
import {
  getAngle,
  getLayoutHexes,
  getReachableHexes,
  isPointInsideHexCorners,
} from '../../utils/grid';
import { EventKey, eventBus } from '@/controllers/EventBus';
import { updateCursorStyle } from '@/utils/common';

interface HexagonalCanvasOptions extends CanvasOptions {
  obstacles: Array<Hexagon>;
}

interface IReachableHexes {
  fringes: Hexagon[][];
  path: Record<string, Hexagon | null>;
}

class HexagonalCanvas extends Canvas<HexagonalCanvasOptions> {
  private readonly layout: Layout;
  private readonly battle: Battle;

  private reachableHexes: IReachableHexes = { fringes: [], path: {} };

  constructor(layout: Layout, battle: Battle, options: HexagonalCanvasOptions) {
    super(options);

    this.layout = layout;
    this.battle = battle;
  }

  public display() {
    this.setReachableHexes();

    this.drawHexagonalGrid();
    this.drawReachableHexes();
    this.drawActiveUnitHex();

    this.setHexHoverEvent();
    this.setOnClickEvent();
    this.attachEvent();
  }

  private setReachableHexes() {
    const { position } = this.battle.activeUnit;
    const obstacles = this.computeObstacles();

    // TODO: Get units initiative
    this.reachableHexes = getReachableHexes(position, obstacles, 6);
  }

  private computeObstacles(): Array<Hexagon> {
    const terrain = this.options.obstacles;
    const units = this.battle.heroes.flatMap((hero) => hero.army.map((unit) => unit.position));

    return [...terrain, ...units];
  }

  private moveNotAllowed(hex: Hexagon) {
    return !this.reachableHexes.fringes
      .flat()
      .find((reachableHex) => Hexagon.isEqual(reachableHex, hex));
  }

  private drawReachableHexes() {
    this.reachableHexes.fringes.flat().forEach((hex) => {
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
    const hexes = getLayoutHexes(battleGridSize);

    hexes.forEach((hex) => {
      const corners = this.layout.hexToCorners(hex);

      this.drawHexOutline(corners);
      this.drawHexLabel(hex);
    });
  }

  private drawHexOutline(corners: Array<Point>) {
    const startPoint = corners[corners.length - 1];

    this.ctx.beginPath();

    this.ctx.moveTo(startPoint.x, startPoint.y);
    for (let i = 0; i < corners.length; i++) {
      this.ctx.lineTo(corners[i].x, corners[i].y);
    }

    this.ctx.strokeStyle = hexStyles.strokeStyle;
    this.ctx.lineWidth = hexStyles.lineWidth;

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
    const hexes = getLayoutHexes(battleGridSize);

    const hoveredHex = hexes.find((hex) =>
      isPointInsideHexCorners(hoveredPoint, this.layout.hexToCorners(hex))
    );

    if (hoveredHex && !this.moveNotAllowed(hoveredHex)) {
      this.highlightHex(hoveredHex);
    }

    this.setMoveCursor(hoveredHex);

    if (hoveredHex && this.updateEnemyCursor(hoveredHex, hoveredPoint)) {
      // console.log('enemy hex');
      // this.highlightAttackCursor()
    }
  }

  private updateEnemyCursor(hex: Hexagon, point: Point): boolean {
    const isEnemyHex = this.battle.heroes[1].army.some((unit) =>
      Hexagon.isEqual(unit.position, hex)
    );

    if (!isEnemyHex) return false;

    const corners = this.layout.hexToCorners(hex);
    const angle = getAngle(point, corners, this.layout.hexToPixel(hex));
    console.log('angle :>> ', angle);

    const notAllowMove = this.moveNotAllowed(hex.neighbor(angle));
    if (notAllowMove) return false;

    updateCursorStyle('any', `melee_attack_${angle}`);

    return true;
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
    const moveNotAllowed = !hex || this.moveNotAllowed(hex);

    const newCursor = moveNotAllowed ? 'cursor-stop' : 'cursor-move';
    const oldCursor = moveNotAllowed ? 'cursor-move' : 'cursor-stop';

    updateCursorStyle(oldCursor, newCursor);
  }

  private setOnClickEvent() {
    eventBus.on(EventKey.clickHex, (evt: MouseEvent) => {
      const rect = (evt.target as HTMLElement).getBoundingClientRect();
      const x = evt.clientX - rect.left;
      const y = evt.clientY - rect.top;

      let lastHex = this.reachableHexes.fringes
        .flat()
        .find((reachable) =>
          isPointInsideHexCorners(new Point(x, y), this.layout.hexToCorners(reachable))
        );

      if (!lastHex) return;

      const animationPath: Array<Hexagon> = [];

      while (lastHex !== null) {
        animationPath.push(lastHex);
        lastHex = this.reachableHexes.path[lastHex?.toString()] as Hexagon;
      }

      this.animate(animationPath);
    });
  }

  private animate(path: Array<Hexagon>) {
    console.log(path);

    this.battle.moveActiveUnit(path[0]);

    this.setReachableHexes();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawHexagonalGrid();
    this.drawReachableHexes();
    this.drawActiveUnitHex();
  }

  private attachEvent() {
    eventBus.on(EventKey.refreshCanvas, () => {
      this.setReachableHexes();

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawHexagonalGrid();
      this.drawReachableHexes();
      this.drawActiveUnitHex();
    });
  }
}

export default HexagonalCanvas;
