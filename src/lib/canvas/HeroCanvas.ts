import { loadImage } from '../common/loadImage';
import Canvas, { CanvasOptions } from './Canvas';

interface TerrarianCanvasOptions extends CanvasOptions {
  backgroundImage: string;
}

class HeroCanvas extends Canvas {
  readonly options: TerrarianCanvasOptions;
  //   readonly cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 9, 3, 2, 1];
  readonly cycleLoop = [0, 1, 2, 3, 2, 1];

  private currentLoopIndex = 0;
  private frameCount = 0;

  //   window.requestAnimationFrame(step);

  constructor(canvas: HTMLCanvasElement, options: TerrarianCanvasOptions) {
    super(canvas, options);

    this.options = options;
  }

  private drawFrame(
    image: HTMLImageElement,
    width: number,
    height: number,
    frameX: number,
    frameY: number,
    canvasX: number,
    canvasY: number
  ) {
    this.ctx.drawImage(
      image,
      frameX * width,
      frameY * height,
      width,
      height,
      canvasX,
      canvasY,
      width,
      height
    );
  }

  private step(image: HTMLImageElement, width: number, height: number, image2: HTMLImageElement) {
    this.frameCount++;

    if (this.frameCount < 20) {
      requestAnimationFrame(() => this.step(image, width, height, image2));
      return;
    }

    this.frameCount = 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    console.log(this.canvas.width);
    this.drawFrame(image, width, height, this.cycleLoop[this.currentLoopIndex], 0, 0, 0);
    this.drawFrame(
      image2,
      width,
      height,
      19 - this.cycleLoop[this.currentLoopIndex],
      0,
      parseInt(this.canvas.style.width, 10) - 150,
      0
    );

    this.currentLoopIndex++;
    if (this.currentLoopIndex >= this.cycleLoop.length) {
      this.currentLoopIndex = 0;
      //   Timeout requestAnimationFrame
    }

    requestAnimationFrame(() => this.step(image, width, height, image2));
  }

  public async setup() {
    const image = await loadImage('/src/assets/heroes/undead.png');
    const image2 = await loadImage('/src/assets/heroes/undead-mirror.png');

    requestAnimationFrame(() => this.step(image, 150, 180, image2));
    // requestAnimationFrame(() => this.step(image2, 150, 370));

    // this.drawFrame(image, width, height, 0, 0, 0, 0);
    // this.drawFrame(image, width, height, 1, 0, width, 0);
    // this.drawFrame(image, width, height, 2, 0, width * 2, 0);
    // this.drawFrame(image, width, height, 3, 0, width * 3, 0);

    // drawFrame(1, 0, scaledWidth, 0);
    // drawFrame(0, 0, scaledWidth * 2, 0);
    // drawFrame(2, 0, scaledWidth * 3, 0);

    // this.ctx.drawImage(image, 0, 0, width, height, 0, 0, width, height);
    // this.ctx.drawImage(image, width, 0, width, height, width, 0, width, height);
    // this.ctx.drawImage(image, width * 2, 0, width, height, width * 2, 0, width, height);

    console.log('setup');
  }
}

export default HeroCanvas;
