import type { BattlefieldsResponse } from '@/api/types';
import { HeroClassesResponse, HeroesResponse } from './heroes';

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

export interface Bounds {
  x: [number, number];
  y: [number, number];
}

export interface DataSettings {
  heroes: HeroesResponse;
  heroClasses: HeroClassesResponse;
  battleFields: BattlefieldsResponse;
}
