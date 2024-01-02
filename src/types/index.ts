import { SPRITE } from '@/constants/sprites';
import { MONSTER_SPRITES } from '@/constants/textures';

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

export interface MonsterTexture {
  url: string;
  width: number;
  height: number;

  sprites: Record<MONSTER_SPRITES, { y: number; x: Array<number> }>;
}

export type MonsterTexturesMap = Partial<Record<SPRITE, MonsterTexture>>;
