import Hex from './Hex';

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
