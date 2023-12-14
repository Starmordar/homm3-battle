import {
  battleGridSize,
  hexLabelColors,
  hexStyles,
  hexLabelStyles,
  activeHexStyles,
} from '../../constants/hex';

import Canvas, { CanvasOptions } from './Canvas';

import { Point, Hexagon, Layout } from '../grid';
import { getLayoutHexes, getReachableHexes, isPointInsideHexCorners } from '../../utils/grid';
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
  readonly layout: Layout;
  private activeHex = new Hexagon(-7, 0, 7);
  private reachableHexes: IReachableHexes = { fringes: [], path: {} };

  constructor(layout: Layout, options: HexagonalCanvasOptions) {
    super(options);

    this.layout = layout;
  }

  public display() {
    this.computeReachableHexes();

    this.drawHexagonalGrid();
    this.drawReachableHexes();
    this.setHexHoverEvent();
    this.setOnClickEvent();
  }

  private moveNotAllowed(hex: Hexagon) {
    return !this.reachableHexes.fringes
      .flat()
      .find((reachableHex) => Hexagon.isEqual(reachableHex, hex));
  }

  private computeReachableHexes() {
    this.reachableHexes = getReachableHexes(this.activeHex, this.options.obstacles, 4);
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
    this.canvas.addEventListener('click', (evt: MouseEvent) => {
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
  }
}

export default HexagonalCanvas;
