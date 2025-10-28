import { Hexagon } from './Hexagon';
import { Layout } from './Layout';
import { Point } from './Point';

interface Dimensions {
  width: number;
  height: number;
}

function calcBattleLayout({ count, width, height }: Dimensions & { count: number }): Layout {
  const pointSize = Math.min(height, width) / count;

  const originPoint = new Point((width - pointSize) / 2, height / 2 + pointSize);
  const sizePoint = new Point(pointSize, pointSize);

  return new Layout(Layout.pointyOnTop, sizePoint, originPoint);
}

function createHexArray({ width, height }: Dimensions): Hexagon[] {
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

export { calcBattleLayout, createHexArray };
