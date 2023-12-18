import {
  hexLabelColors,
  hexOutlineStyle,
  hexLabelStyles,
  activeHexStyles,
} from '../../constants/hex';

import BattleGraph from '@/models/BattleGraph';
import { Hexagon, Layout, Point } from '@/models/grid';
import type { Renderable } from '@/types';

class BattleGrid implements Renderable {
  private readonly layout: Layout;
  private readonly graph: BattleGraph;

  constructor(layout: Layout, graph: BattleGraph) {
    this.layout = layout;
    this.graph = graph;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.drawHexes(ctx);
    this.drawReachableHexes(ctx);
  }

  public refresh(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.draw(ctx);
  }

  public drawActiveHex(ctx: CanvasRenderingContext2D, hex: Hexagon) {
    const corners = this.layout.hexToCorners(hex);
    this.buildHexagonPath(ctx, corners);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fill();
  }

  public drawHighlightedHex(ctx: CanvasRenderingContext2D, hex: Hexagon) {
    const corners = this.layout.hexToCorners(hex);
    this.buildHexagonPath(ctx, corners);

    ctx.fillStyle = activeHexStyles.fillStyle;
    ctx.fill();
  }

  private drawHexes(ctx: CanvasRenderingContext2D) {
    for (const [hex, corners] of this.graph.hexCornersMap) {
      this.drawOutline(ctx, corners);
      this.drawLabel(ctx, hex);
    }
  }

  private drawOutline(ctx: CanvasRenderingContext2D, corners: Array<Point>) {
    this.buildHexagonPath(ctx, corners);

    ctx.strokeStyle = hexOutlineStyle.strokeStyle;
    ctx.lineWidth = hexOutlineStyle.lineWidth;

    ctx.stroke();
  }

  private buildHexagonPath(ctx: CanvasRenderingContext2D, corners: Array<Point>) {
    const startPoint = corners[corners.length - 1];

    ctx.beginPath();

    ctx.moveTo(startPoint.x, startPoint.y);
    for (let i = 0; i < corners.length; i++) {
      ctx.lineTo(corners[i].x, corners[i].y);
    }
  }

  private drawLabel(ctx: CanvasRenderingContext2D, hex: Hexagon) {
    // const center = this.layout.hexToPixel(hex);

    ctx.fillStyle = this.getHexLabelColor(hex);
    ctx.font = hexLabelStyles.font;
    ctx.textAlign = hexLabelStyles.textAlign;
    ctx.textBaseline = hexLabelStyles.textBaseline;

    // ctx.fillText(`${hex.q},${hex.r},${hex.s}`, center.x, center.y);
  }

  private getHexLabelColor(hex: Hexagon): string {
    if (hex.q === 0 && hex.r === 0 && hex.s === 0) return hexLabelColors.startHex;
    else if (hex.q === 0) return hexLabelColors.zeroQ;
    else if (hex.r === 0) return hexLabelColors.zeroR;
    else if (hex.s === 0) return hexLabelColors.zeroS;

    return hexLabelColors.other;
  }

  private drawReachableHexes(ctx: CanvasRenderingContext2D) {
    this.graph.hexReachables.forEach((hex) => {
      const corners = this.layout.hexToCorners(hex);
      this.buildHexagonPath(ctx, corners);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fill();
    });
  }
}

export default BattleGrid;
