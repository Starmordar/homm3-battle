import type { StaticTexture } from '@/constants/textures/types';

class Sprite<Options extends StaticTexture> {
  public readonly options: Options;

  public image: HTMLImageElement = new Image();
  public load: Promise<this>;

  constructor(options: Options) {
    this.options = options;
    this.load = this.loadImage(options.url);
  }

  private loadImage(url: string): Promise<this> {
    return new Promise((resolve, reject) => {
      this.image = new Image();

      this.image.onload = () => {
        resolve(this);
      };

      this.image.onerror = (reason) => {
        console.log('reason', reason);
        reject();
      };
      this.image.src = url;
    });
  }
}

export default Sprite;
