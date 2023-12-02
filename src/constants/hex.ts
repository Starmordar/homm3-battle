export const battleGridSize = { width: 15, height: 11 };
export const hexagonCount = Math.max(...Object.values(battleGridSize)) + 5;

export const hexLabelColors = {
  startHex: 'hsl(0, 50%, 0%)',
  zeroQ: 'hsl(90, 70%, 35%)',
  zeroR: 'hsl(200, 100%, 35%)',
  zeroS: 'hsl(300, 40%, 50%)',
  other: 'hsl(0, 0%, 50%)',
};

export const hexStyles = {
  strokeStyle: 'black',
  lineWidth: 1,
} as const;

export const hexLabelStyles = {
  font: '16px sans-serif',
  textAlign: 'center',
  textBaseline: 'middle',
} as const;

export const activeHexStyles = {
  fillStyle: 'rgba(0, 0, 0, 0.4)',
} as const;
