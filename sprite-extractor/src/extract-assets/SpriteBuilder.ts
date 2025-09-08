// import fs from 'node:fs';
// import { createCanvas } from 'canvas';

import { unpackDEF } from 'homm3-unpacker';
import type { SourceData } from './validate';

import { 
  // FRAME_WIDTH,
  // FRAME_HEIGHT,
  // OUTPUT_ASSETS_PATH,
  CREATURE_ANIMATION_PHASES,
} from '../config';

class SpriteBuilder {
  private filename: string;
  private sourceData: SourceData;

  private animationPhases: string[];
  private maxCol: number;
  private maxRow: number;

  constructor(buffer: Buffer, filename: string) {
    this.filename = filename;
    this.sourceData = unpackDEF<SourceData>(buffer, { format: 'bitmap', padding: false });
    console.log('sourceData :>> ', this.sourceData);

    this.animationPhases = CREATURE_ANIMATION_PHASES.map((name) => name.toLowerCase());

    this.maxCol = Math.max(
      ...this.animationPhases.map((name) => this.sourceData.groups[name]?.length ?? 0),
    );
    this.maxRow = this.animationPhases.length;

    // const { canvas, ctx } = this.createImageFrameCanvas(this.maxCol, this.maxRow);
    // this.canvas = canvas;
    // this.ctx = ctx;
  }

  validateSourceData(data: unknown): data is SourceData {
    return (
      typeof data === 'object' &&
      data !== null &&
      typeof (data as SourceData).type === 'string' &&
      typeof (data as SourceData).fullWidth === 'number' &&
      typeof (data as SourceData).fullHeight === 'number' &&
      Array.isArray((data as SourceData).palette)
    );
  }

  //   createImageFrameCanvas(maxCol, maxRow) {
  //     const canvas = createCanvas(FRAME_WIDTH * maxCol, FRAME_HEIGHT * maxRow);
  //     const ctx = canvas.getContext('2d');

  //     return { canvas, ctx };
  //   }

  //   build() {
  //     const imageRect = this.getImageRect();

  //     this.animationPhases.forEach((phaseName, index) => {
  //       const isActivePhase = phaseName.includes('_active');
  //       this.drawAnimationPhase(
  //         imageRect,
  //         this.framesToDraw(phaseName.replace('_active', '')),
  //         index,
  //       );

  //       if (isActivePhase) {
  //         this.drawAnimationPhase(imageRect, this.activeFramesToDraw(phaseName), index);
  //       }
  //     });

  //     this.saveImage();
  //   }

  //   framesToDraw(phaseName) {
  //     const imageNames = this.sourceData.groups[phaseName] ?? [];
  //     return imageNames.map((imageName) => this.sourceData.images[imageName]);
  //   }

  //   activeFramesToDraw(phaseName) {
  //     phaseName = phaseName.replace('_active', '');
  //     const imageNames = this.sourceData.groups[phaseName] ?? [];

  //     return imageNames.map((imageName) => {
  //       const image = this.sourceData.images[imageName];
  //       return { ...image, data: image.selection };
  //     });
  //   }

  //   drawAnimationPhase(rect, images, colIndex) {
  //     if (!images.length) return;

  //     for (let rowIndex = 0; rowIndex < images.length; rowIndex++) {
  //       this.drawFrame(rect, images[rowIndex], rowIndex, colIndex);
  //     }
  //   }

  //   drawFrame(rect, image, rowIndex, colIndex) {
  //     const rows = this.ctx.canvas.height / this.maxRow;
  //     const cols = this.ctx.canvas.width / this.maxCol;

  //     const row =
  //       Math.floor(rows / 2 - rect.height / 2 + (image.y || 0) - rect.y) + colIndex * FRAME_HEIGHT;
  //     const col =
  //       Math.floor(cols / 2 - rect.width / 2 + (image.x || 0) - rect.x) + rowIndex * FRAME_WIDTH;

  //     const view = new Uint8Array(image.data);

  //     let i = 0;
  //     while (i < view.byteLength) {
  //       const r = view[i++];
  //       const g = view[i++];
  //       const b = view[i++];
  //       const a = view[i++];
  //       this.ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;

  //       const at = i / 4 - 1;
  //       const x = col + (at % image.width);
  //       const y = row + Math.floor(at / image.width);

  //       this.ctx.fillRect(x, y, 1, 1);
  //     }
  //   }

  //   getImageRect() {
  //     const images = Object.values(this.sourceData.images);

  //     let top = Infinity;
  //     let left = Infinity;
  //     let bottom = 0;
  //     let right = 0;

  //     const imageNames = Object.keys(images);
  //     for (const name of imageNames) {
  //       const image = images[name];

  //       if (image.y < top) top = image.y;
  //       if (image.y + image.height > bottom) bottom = image.y + image.height;
  //       if (image.x < left) left = image.x;
  //       if (image.x + image.width > right) right = image.x + image.width;
  //     }

  //     return {
  //       x: left,
  //       y: top,
  //       width: right - left,
  //       height: bottom - top,
  //     };
  //   }

  //   saveImage() {
  //     const buffer = this.canvas.toBuffer('image/png');
  //     const filename = this.filename.split('.')[0];

  //     if (!fs.existsSync(OUTPUT_ASSETS_PATH)) fs.mkdirSync(OUTPUT_ASSETS_PATH, { recursive: true });
  //     fs.writeFileSync(`${OUTPUT_ASSETS_PATH}/${filename}.png`, buffer);
  //   }
}

export type { SourceData };
export { SpriteBuilder };
