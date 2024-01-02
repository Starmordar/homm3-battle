import { MONSTER_SPRITES, TEXTURES } from '@/constants/textures';

export interface Renderable {
  /**
   * Draw UI element on the canvas
   * @param ctx the canvas 2d rendering context
   * @param canvas the canvas on which to draw UI element
   */
  draw(ctx: CanvasRenderingContext2D, canvas?: HTMLCanvasElement): void;
}

export interface Rect {
  width: number;
  height: number;

  x: number;
  y: number;
}

export interface Texture {
  url: string;
  width: number;
  height: number;

  textures: Record<MONSTER_SPRITES, { y: number; x: Array<number> }>;
}

export type TextureMap = Partial<Record<TEXTURES, Texture>>;
export type TextureFrames = Record<TEXTURES, Texture['textures']>;
