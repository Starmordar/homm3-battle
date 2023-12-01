type ICanvasSize = { height: number; width: number };

export function setCanvasSize(canvas: HTMLCanvasElement, { height, width }: ICanvasSize) {
  const ctx = canvas.getContext('2d')!;

  // Set display size (css pixels)
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  // Set actual size in memory (scaled to account for extra pixel density)
  canvas.width = Math.floor(width * devicePixelRatio);
  canvas.height = Math.floor(height * devicePixelRatio);

  ctx.scale(devicePixelRatio, devicePixelRatio);
}

export function fillCanvas(canvas: HTMLCanvasElement, color: string) {
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
