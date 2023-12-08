import Canvas, { CanvasOptions } from './Canvas';

interface TerrarianCanvasOptions extends CanvasOptions {
  backgroundImage: string;
}

class TerrarianCanvas extends Canvas<TerrarianCanvasOptions> {
  constructor(options: TerrarianCanvasOptions) {
    super(options);
  }

  public async setup() {
    await this.setBackgroundImage(this.options.backgroundImage);
    console.log('setup');
  }
}

export default TerrarianCanvas;
