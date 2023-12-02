import { fillCanvas, setCanvasSize } from '.';
import {
  battleGridSize,
  hexagonCount,
  hexLabelColors,
  hexStyles,
  hexLabelStyles,
  activeHexStyles,
} from '../../constants/hex';

import { Point, Hex, Layout } from '../gridLayout';
import { getLayoutHexes, isPointInsideHexCorners } from '../gridLayout/utils';

function getGridLayout(canvasSize: { height: number; width: number }): Layout {
  const pointSize = Math.min(canvasSize.height, canvasSize.width) / hexagonCount;

  const originPoint = new Point((canvasSize.width - pointSize) / 2, canvasSize.height / 2);
  const sizePoint = new Point(pointSize, pointSize);

  return new Layout(Layout.pointy, sizePoint, originPoint);
}

export function drawHexGrid(ctx: CanvasRenderingContext2D, layout: Layout) {
  const hexes = getLayoutHexes(battleGridSize);

  hexes.forEach((hex) => {
    const corners = layout.getHexCorners(hex);

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

  ctx.strokeStyle = hexStyles.strokeStyle;
  ctx.lineWidth = hexStyles.lineWidth;

  ctx.stroke();
}

function drawHexLabel(ctx: CanvasRenderingContext2D, layout: Layout, hex: Hex) {
  const center = layout.hexToPixel(hex);

  ctx.fillStyle = getHexLabelColor(hex);
  ctx.font = hexLabelStyles.font;
  ctx.textAlign = hexLabelStyles.textAlign;
  ctx.textBaseline = hexLabelStyles.textBaseline;

  ctx.fillText(`${hex.q},${hex.r},${hex.s}`, center.x, center.y);
}

function getHexLabelColor(hex: Hex): string {
  if (hex.q === 0 && hex.r === 0 && hex.s === 0) return hexLabelColors.startHex;
  else if (hex.q === 0) return hexLabelColors.zeroQ;
  else if (hex.r === 0) return hexLabelColors.zeroR;
  else if (hex.s === 0) return hexLabelColors.zeroS;

  return hexLabelColors.other;
}

export function setHexHoverEvent(
  { canvas, ctx }: { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D },
  layout: Layout
) {
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
    isPointInsideHexCorners(mousePoint, layout.getHexCorners(hex))
  );

  if (hoverHex) {
    fillActiveHex(ctx, layout, hoverHex);
  }
}

function fillActiveHex(ctx: CanvasRenderingContext2D, layout: Layout, hex: Hex) {
  const corners = layout.getHexCorners(hex);

  ctx.beginPath();
  ctx.fillStyle = activeHexStyles.fillStyle;

  ctx.moveTo(corners[5].x, corners[5].y);
  for (let i = 0; i < 6; i++) {
    ctx.lineTo(corners[i].x, corners[i].y);
  }

  ctx.fill();
}

export function setupGridCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  const canvasSize = { width: window.innerWidth, height: window.innerHeight };

  setCanvasSize({ canvas, ctx }, canvasSize);
  fillCanvas({ canvas, ctx }, 'transparent');

  const layout = getGridLayout(canvasSize);
  drawHexGrid(ctx, layout);
  setHexHoverEvent({ canvas, ctx }, layout);
}
