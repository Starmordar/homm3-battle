import { Hexagon } from '../models/grid';

export const battleGridSize = { width: 15, height: 11 };
export const hexagonCount = 22;

export const hexLabelColors = {
  startHex: 'hsl(0, 50%, 0%)',
  zeroQ: 'hsl(90, 70%, 35%)',
  zeroR: 'hsl(200, 100%, 35%)',
  zeroS: 'hsl(300, 40%, 50%)',
  other: 'hsl(0, 0%, 50%)',
};

export const hexStyles = {
  strokeStyle: '#7ACE0F80',
  lineWidth: 1,
} as const;

export const hexLabelStyles = {
  font: '16px sans-serif',
  textAlign: 'center',
  textBaseline: 'middle',
} as const;

export const activeHexStyles = {
  fillStyle: 'rgba(0, 0, 0, 0.5)',
} as const;

export const hexObstacles: Array<Hexagon> = [
  new Hexagon(0, -2, 2),
  new Hexagon(-1, -1, 2),
  new Hexagon(-2, 0, 2),
  new Hexagon(0, -1, 1),
  new Hexagon(-3, 1, 2),
  new Hexagon(1, -3, 2),
];
