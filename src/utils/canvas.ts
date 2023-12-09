interface IMousePosition {
  x: number;
  y: number;
}

export function getMousePosition(cavans: HTMLCanvasElement, event: MouseEvent): IMousePosition {
  const rect = cavans.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

export function isMouseInsideRect(position: IMousePosition, rect: DOMRect) {
  return (
    position.x > rect.x &&
    position.x < rect.x + rect.width &&
    position.y < rect.y + rect.height &&
    position.y > rect.y
  );
}
