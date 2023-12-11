import { Layout, Hexagon, Point } from '@/models/grid';
import { battleGridSize, hexagonCount } from '@/constants/hex';

interface Dimensions {
  width: number;
  height: number;
}

export function buildGridLayout({ width, height }: Dimensions): Layout {
  const pointSize = Math.min(height, width) / hexagonCount;

  const originPoint = new Point((width - pointSize) / 2, height / 2 + height / 10);
  const sizePoint = new Point(pointSize, pointSize);

  return new Layout(Layout.pointyOnTop, sizePoint, originPoint);
}

export function getLayoutHexes({ width, height }: Dimensions): Array<Hexagon> {
  const hexes: Array<Hexagon> = [];

  const rowStart = -Math.floor(width / 2);
  const rowEnd = rowStart + width;

  const columnStart = -Math.floor(height / 2);
  const columnEnd = columnStart + height;

  for (let j = columnStart; j < columnEnd; j++) {
    const offset = -Math.floor(j / 2);

    for (let i = rowStart + offset; i < rowEnd + offset; i++) {
      hexes.push(new Hexagon(i, j, -i - j));
    }
  }

  return hexes;
}

export function isPointInsideHexCorners({ x, y }: Point, corners: Array<Point>): boolean {
  let isInside = false;

  for (let i = 0, j = corners.length - 1; i < corners.length; j = i++) {
    const xi = corners[i].x;
    const yi = corners[i].y;

    const xj = corners[j].x;
    const yj = corners[j].y;

    const intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) isInside = !isInside;
  }

  return isInside;
}

function isObstacle(hex: Hexagon, obstacles: Array<Hexagon>): boolean {
  return obstacles.some((obstacle) => Hexagon.isEqual(hex, obstacle));
}

function isOutsideHexLayout(hex: Hexagon, size: { width: number; height: number }): boolean {
  const heightBorder = Math.floor(size.height / 2);

  if (hex.r < -heightBorder || hex.r > heightBorder) return true;
  if (Math.abs(hex.q) + Math.abs(hex.s) > size.width) return true;

  if (hex.r === -5 && hex.s > 9) return true;
  if (hex.r === -3 && hex.s > 8) return true;
  if (hex.r === -1 && hex.s > 7) return true;
  if (hex.r === 1 && hex.s > 6) return true;
  if (hex.r === 3 && hex.s > 5) return true;
  if (hex.r === 5 && hex.s > 4) return true;

  return false;
}

export function getReachableHexes(activeHex: Hexagon, obstacles: Array<Hexagon>, range: number) {
  const fringes: Array<Array<Hexagon>> = [];

  const costSoFar: Record<string, number> = {};
  const path: Record<string, null | Hexagon> = {};

  costSoFar[activeHex.toString()] = 0;
  path[activeHex.toString()] = null;

  fringes.push([activeHex]);

  for (let i = 1; i <= range; i++) {
    fringes.push([]);

    fringes[i - 1].forEach((hex) => {
      for (let j = 0; j < 6; j++) {
        const neighbor = hex.neighbor(j);

        if (
          isObstacle(neighbor, obstacles) ||
          isOutsideHexLayout(neighbor, battleGridSize) ||
          costSoFar[neighbor.toString()] !== undefined
        ) {
          continue;
        }

        costSoFar[neighbor.toString()] = i;
        path[neighbor.toString()] = hex;
        fringes[i].push(neighbor);
      }
    });
  }

  return { fringes, path };
}
