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

export function mousePosition(cavans: HTMLCanvasElement, event: MouseEvent): MousePosition {
  const rect = cavans.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

export function isMouseInsideRect(position: MousePosition, rect: Rect) {
  return (
    position.x > rect.x &&
    position.x < rect.x + rect.width &&
    position.y < rect.y + rect.height &&
    position.y > rect.y
  );
}
