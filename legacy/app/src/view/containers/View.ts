import Sprite from '../sprites/Sprite';
import type { StaticTexture } from '@/constants/textures/types';

export interface ViewOptions {
  classNames: Array<string>;
  size: { height: number; width: number };
  offset?: { x?: number; y?: number };
}

class View<Options extends ViewOptions> {
  protected readonly options: Options;
  protected readonly canvas: HTMLCanvasElement;
  protected readonly ctx: CanvasRenderingContext2D;

  constructor(options: Options) {
    this.options = options;

    this.canvas = this.createView();
    this.ctx = this.canvas.getContext('2d')!;

    this.setViewSize();
  }

  private createView(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.classList.add(...this.options.classNames);
    this.setCanvasOffset(canvas);

    const root = document.getElementById('root')!;
    root.appendChild(canvas);

    return canvas;
  }

  private setCanvasOffset(canvas: HTMLCanvasElement) {
    const { offset } = this.options;
    if (offset?.x) canvas.style.top = `${offset.x}px`;
    if (offset?.y) canvas.style.left = `${offset.y}px`;
  }

  protected setViewSize() {
    const { width, height } = this.options.size;

    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';

    this.canvas.width = Math.floor(width * devicePixelRatio);
    this.canvas.height = Math.floor(height * devicePixelRatio);

    this.ctx.scale(devicePixelRatio, devicePixelRatio);
  }

  protected createViewPattern(sprite: Sprite<StaticTexture>) {
    const { width, height } = this.options.size;
    const pattern = this.ctx.createPattern(sprite.image, 'repeat')!;

    this.ctx.fillStyle = pattern;
    this.ctx.fillRect(0, 0, width, height);
  }
}

export default View;
