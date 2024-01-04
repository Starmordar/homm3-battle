import { SPRITE } from '../sprites';

export enum MarkupType {
  text = 'text',
  sprite = 'sprite',
  group = 'group',
}

export type MarkupOptions = { left?: number; top?: number; width?: number; height?: number };

export type TextMarkup<T> = {
  type: MarkupType.text;
  options: MarkupOptions & { align: CanvasTextAlign; text: string | ((data: T) => string) };
};

export type SpriteMarkup<T> = {
  type: MarkupType.sprite;
  options: MarkupOptions & { sprite: SPRITE | ((data: T) => SPRITE) };
};

export type GroupMarkup<T> = {
  type: MarkupType.group;
  options: MarkupOptions;
  children: Array<MarkupChild<T>>;
};

export type MarkupChild<T> = TextMarkup<T> | SpriteMarkup<T> | GroupMarkup<T>;

export interface Markup<T> {
  background: { sprite: SPRITE; width: number; height: number };
  textOptions: { font: string; fillStyle: string; textBaseline: CanvasTextBaseline };
  children: Array<MarkupChild<T>>;
}
