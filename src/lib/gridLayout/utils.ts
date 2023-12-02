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

// export function getReachableHexes(activeHex, movement, obstackles, friendlyUnits) {
//   const fringes = [];

//   const costSoFar = {};
//   const cameFrom = {};

//   costSoFar[activeHex] = 0;
//   cameFrom[activeHex] = null;
//   fringes.push([activeHex]);

//   for (let i = 1; i <= movement; i++) {
//     fringes.push([]);

//     fringes[i - 1].forEach((hex) => {
//       for (let j = 0; j < 6; j++) {
//         const neighbor = hex.neighbor(j);
//         if (
//           !this.isObstacle(neighbor, obstackles) &&
//           !this.isObstacle(neighbor, friendlyUnits) &&
//           costSoFar[neighbor] === undefined &&
//           !this.isOutsideBorders(neighbor)
//         ) {
//           costSoFar[neighbor] = i;
//           cameFrom[neighbor] = hex;
//           fringes[i].push(neighbor);
//         }
//       }
//     });
//   }

//   return { fringes: fringes, came_from: cameFrom };
// }
