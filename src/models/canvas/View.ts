import Sprite from '../../view/sprites/Sprite';
import type { StaticTexture } from '@/constants/textures/types';

export interface ViewOptions {
  classNames: Array<string>;
  size: { height: number; width: number };
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

    const root = document.getElementById('root')!;
    root.appendChild(canvas);

    return canvas;
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
