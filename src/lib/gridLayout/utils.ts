import Hex from './Hex';
import Point from './Point';

export function getLayoutHexes({ width, height }: { width: number; height: number }): Array<Hex> {
  const hexes: Array<Hex> = [];

  const rowStart = -Math.floor(width / 2);
  const rowEnd = rowStart + width;

  const columnStart = -Math.floor(height / 2);
  const columnEnd = columnStart + height;

  for (let j = columnStart; j < columnEnd; j++) {
    const offset = -Math.floor(j / 2);

    for (let i = rowStart + offset; i < rowEnd + offset; i++) {
      hexes.push(new Hex(i, j, -i - j));
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

function isObstacle(hex: Hex, obstacles: Array<Hex>): boolean {
  for (const obstackle of obstacles) {
    if (hex.toString() === obstackle.toString()) return true;
  }

  return false;
}

function isOutsideBorders(hex: Hex): boolean {
  if (hex.r < -5 || hex.r > 5) return true;
  if (Math.abs(hex.q) + Math.abs(hex.s) > 15) return true;

  switch (hex.r) {
    case -5:
      if (hex.s > 9) return true;
      return false;
    case -3:
      if (hex.s > 8) return true;
      return false;
    case -1:
      if (hex.s > 7) return true;
      return false;
    case 1:
      if (hex.s > 6) return true;
      return false;
    case 3:
      if (hex.s > 5) return true;
      return false;
    case 5:
      if (hex.s > 4) return true;
      return false;
    default:
      return false;
  }
}
export function getReachableHexes(activeHex: Hex, obstacles: Array<Hex>, range: number) {
  const fringes: Array<Array<Hex>> = [];

  const costSoFar: Record<string, number> = {};
  const path: Record<string, null | Hex> = {};

  costSoFar[activeHex.toString()] = 0;
  path[activeHex.toString()] = null;

  console.log('costSoFar, path :>> ', costSoFar, path);
  fringes.push([activeHex]);

  for (let i = 1; i <= range; i++) {
    fringes.push([]);

    fringes[i - 1].forEach((hex) => {
      for (let j = 0; j < 6; j++) {
        const neighbor = hex.neighbor(j);
        if (
          !isObstacle(neighbor, obstacles) &&
          costSoFar[neighbor.toString()] === undefined &&
          !isOutsideBorders(neighbor)
        ) {
          costSoFar[neighbor.toString()] = i;
          path[neighbor.toString()] = hex;
          fringes[i].push(neighbor);
        }
      }
    });
  }

  return { fringes, path };
}
