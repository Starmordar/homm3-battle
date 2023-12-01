import { battleGridSize, hexLabelColors } from '../../constants/hex';
import Hex from '../gridLayout/Hex';
import Layout from '../gridLayout/Layout';
import Point from '../gridLayout/Point';
import { getLayoutHexes, isPointInsideHexCorners } from '../gridLayout/utils';

type ICanvasSize = { height: number; width: number };

export function getGridLayout(canvasSize: ICanvasSize): Layout {
  const pointSize = Math.min(canvasSize.height, canvasSize.width) / 20;

  const originPoint = new Point((canvasSize.width - pointSize) / 2, canvasSize.height / 2);
  const sizePoint = new Point(pointSize, pointSize);

  return new Layout(Layout.pointy, sizePoint, originPoint);
}

export function drawHexGrid(ctx: CanvasRenderingContext2D, layout: Layout) {
  const hexes = getLayoutHexes(battleGridSize);

  hexes.forEach((hex) => {
    const corners = layout.polygonCorners(hex);
    drawHex(ctx, corners);
    drawHexLabel(ctx, layout, hex);
  });
}

function drawHex(ctx: CanvasRenderingContext2D, corners: Array<Point>) {
  const startPoint = corners[corners.length - 1];

  ctx.beginPath();

  ctx.moveTo(startPoint.x, startPoint.y);
  for (let i = 0; i < corners.length; i++) {
    ctx.lineTo(corners[i].x, corners[i].y);
  }

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;

  ctx.closePath();
  ctx.stroke();
}

function drawHexLabel(ctx: CanvasRenderingContext2D, layout: Layout, hex: Hex) {
  const center = layout.hexToPixel(hex);

  ctx.fillStyle = getHexLabelColor(hex);
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText(`${hex.q},${hex.r},${hex.s}`, center.x, center.y);
}

function getHexLabelColor(hex: Hex): string {
  if (hex.q === 0 && hex.r === 0 && hex.s === 0) return hexLabelColors.startHex;
  else if (hex.q === 0) return hexLabelColors.zeroQ;
  else if (hex.r === 0) return hexLabelColors.zeroR;
  else if (hex.s === 0) return hexLabelColors.zeroS;

  return hexLabelColors.other;
}

export function setHexagonHoverEvent(canvas: HTMLCanvasElement, layout: Layout) {
  const ctx = canvas.getContext('2d')!;

  canvas.addEventListener('mousemove', (evt: MouseEvent) => {
    const rect = (evt.target as HTMLElement).getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawHexGrid(ctx, layout);
    drawActiveHexes(ctx, layout, new Point(x, y));
  });
}

function drawActiveHexes(ctx: CanvasRenderingContext2D, layout: Layout, mousePoint: Point) {
  const hexes = getLayoutHexes(battleGridSize);

  const hoverHex = hexes.find((hex) =>
    isPointInsideHexCorners(mousePoint, layout.polygonCorners(hex))
  );

  if (hoverHex) {
    fillActiveHex(ctx, layout, hoverHex);
  }
}

function fillActiveHex(ctx: CanvasRenderingContext2D, layout: Layout, hex: Hex) {
  const corners = layout.polygonCorners(hex);

  ctx.beginPath();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';

  ctx.moveTo(corners[5].x, corners[5].y);
  for (let i = 0; i < 6; i++) {
    ctx.lineTo(corners[i].x, corners[i].y);
  }

  ctx.fill();
}
