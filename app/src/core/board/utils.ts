import { Hexagon } from './Hexagon';
import { Layout } from './Layout';
import { Point } from './Point';

interface GenerateBattleLayoutParams {
  hexagonCount: number;

  boardWidth: number;
  boardHeight: number;

  screenWidth: number;
  screenHeight: number;
}

function generateBattleLayout(params: GenerateBattleLayoutParams): Layout {
  const pointSize = Math.min(params.boardHeight, params.boardWidth) / params.hexagonCount;

  const originPoint = new Point((params.screenWidth - pointSize) / 2, params.screenHeight / 2);
  const sizePoint = new Point(pointSize, pointSize);

  return new Layout(Layout.pointyOnTop, sizePoint, originPoint);
}

function generateHexagonList({ width, height }: { width: number; height: number }): Hexagon[] {
  const hexes: Hexagon[] = [];

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

function generateHexagonCornersMap(hexagonList: Hexagon[], layout: Layout): Map<Hexagon, Point[]> {
  const map = new Map();

  hexagonList.forEach((hex) => {
    map.set(hex, layout.hexToCorners(hex));
  });

  return map;
}

export { generateBattleLayout, generateHexagonList, generateHexagonCornersMap };
