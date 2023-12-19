import { Point } from '@/models/grid';

interface MousePosition {
  x: number;
  y: number;
}

interface Rect {
  height: number;
  width: number;
  x: number;
  y: number;
}

export function mousePosition(cavans: HTMLCanvasElement, evt: MouseEvent): MousePosition {
  const rect = cavans.getBoundingClientRect();
  return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
}

export function isMouseInsideRect(position: MousePosition, rect: Rect): boolean {
  return (
    position.x > rect.x &&
    position.x < rect.x + rect.width &&
    position.y < rect.y + rect.height &&
    position.y > rect.y
  );
}

export function mousePointFromEvent(evt: MouseEvent): Point {
  const rect = (evt.target as HTMLElement).getBoundingClientRect();
  const x = evt.clientX - rect.left;
  const y = evt.clientY - rect.top;

  return new Point(x, y);
}
