export function setCanvasSize(
  { canvas, ctx }: { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D },
  { height, width }: { height: number; width: number }
) {
  // Set display size (css pixels)
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  // Set actual size in memory (scaled to account for extra pixel density)
  canvas.width = Math.floor(width * devicePixelRatio);
  canvas.height = Math.floor(height * devicePixelRatio);

  ctx.scale(devicePixelRatio, devicePixelRatio);
}

export function fillCanvas(
  { canvas, ctx }: { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D },
  color: string
) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
