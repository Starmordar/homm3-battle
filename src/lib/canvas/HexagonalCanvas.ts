import {
  battleGridSize,
  hexagonCount,
  hexLabelColors,
  hexStyles,
  hexLabelStyles,
  activeHexStyles,
} from '../../constants/hex';

import Canvas, { CanvasOptions } from './Canvas';

import { Point, Hex, Layout } from '../gridLayout';
import { getLayoutHexes, isPointInsideHexCorners } from '../gridLayout/utils';

interface HexagonalCanvasOptions extends CanvasOptions {
  obstacles: Array<Hex>;
  backgroundImage: string;
}

class HexagonalCanvas extends Canvas {
  readonly options: HexagonalCanvasOptions;
  readonly layout: Layout;

  constructor(canvas: HTMLCanvasElement, options: HexagonalCanvasOptions) {
    super(canvas, options);

    this.options = options;
    this.layout = this.buildGridLayout();
  }

  private buildGridLayout(): Layout {
    const { width, height } = this.options.size;
    const pointSize = Math.min(height, width) / hexagonCount;

    const originPoint = new Point((width - pointSize) / 2, height / 2);
    const sizePoint = new Point(pointSize, pointSize);

    return new Layout(Layout.pointy, sizePoint, originPoint);
  }

  public setupCanvas() {
    this.drawHexagonalGrid();
    this.setHexHoverEvent();
  }

  private drawHexagonalGrid() {
    const hexes = getLayoutHexes(battleGridSize);

    hexes.forEach((hex) => {
      const corners = this.layout.getHexCorners(hex);

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

  private drawHexLabel(hex: Hex) {
    const center = this.layout.hexToPixel(hex);

    this.ctx.fillStyle = this.getHexLabelColor(hex);
    this.ctx.font = hexLabelStyles.font;
    this.ctx.textAlign = hexLabelStyles.textAlign;
    this.ctx.textBaseline = hexLabelStyles.textBaseline;

    this.ctx.fillText(`${hex.q},${hex.r},${hex.s}`, center.x, center.y);
  }

  private getHexLabelColor(hex: Hex): string {
    if (hex.q === 0 && hex.r === 0 && hex.s === 0) return hexLabelColors.startHex;
    else if (hex.q === 0) return hexLabelColors.zeroQ;
    else if (hex.r === 0) return hexLabelColors.zeroR;
    else if (hex.s === 0) return hexLabelColors.zeroS;

    return hexLabelColors.other;
  }

  private setHexHoverEvent() {
    this.canvas.addEventListener('mousemove', (evt: MouseEvent) => {
      const rect = (evt.target as HTMLElement).getBoundingClientRect();
      const x = evt.clientX - rect.left;
      const y = evt.clientY - rect.top;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.drawHexagonalGrid();
      this.highlightHoveredHex(new Point(x, y));
    });
  }

  private highlightHoveredHex(hoveredPoint: Point) {
    const hexes = getLayoutHexes(battleGridSize);

    const hoveredHex = hexes.find((hex) =>
      isPointInsideHexCorners(hoveredPoint, this.layout.getHexCorners(hex))
    );

    if (hoveredHex) {
      this.highlightHex(hoveredHex);
    }

    this.setMoveCursor(hoveredHex);
  }

  private highlightHex(hex: Hex) {
    const corners = this.layout.getHexCorners(hex);

    this.ctx.beginPath();
    this.ctx.fillStyle = activeHexStyles.fillStyle;

    this.ctx.moveTo(corners[5].x, corners[5].y);
    for (let i = 0; i < 6; i++) {
      this.ctx.lineTo(corners[i].x, corners[i].y);
    }

    this.ctx.fill();
  }

  private setMoveCursor(hex: Hex | undefined) {
    const moveNotAllowed =
      !hex || this.options.obstacles.some((obstacle) => Hex.isEqual(obstacle, hex));

    const newCursor = moveNotAllowed ? 'cursor-not-allowed' : 'cursor-move-unit';
    const oldCursor = moveNotAllowed ? 'cursor-move-unit' : 'cursor-not-allowed';

    this.canvas.classList.add(newCursor);
    this.canvas.classList.remove(oldCursor);
  }
}

export default HexagonalCanvas;
