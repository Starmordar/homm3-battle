export interface Renderable {
  /**
   * Draw the UI element on the canvas
   * @param ctx the canvas 2d rendering context
   * @param canvas the canvas on which to draw UI element
   */
  draw(ctx: CanvasRenderingContext2D, canvas?: HTMLCanvasElement): void;
}
