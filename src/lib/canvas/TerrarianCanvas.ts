import Canvas, { CanvasOptions } from './Canvas';

interface TerrarianCanvasOptions extends CanvasOptions {
  backgroundImage: string;
}

class TerrarianCanvas extends Canvas {
  readonly options: TerrarianCanvasOptions;

  constructor(canvas: HTMLCanvasElement, options: TerrarianCanvasOptions) {
    super(canvas, options);

    this.options = options;
  }

  public async setup() {
    await this.setBackgroundImage(this.options.backgroundImage);
    console.log('setup');
  }
}

export default TerrarianCanvas;
