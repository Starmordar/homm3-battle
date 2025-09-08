import fs from 'node:fs';

import { unpackDEF } from 'homm3-unpacker';
import type { CanvasRenderingContext2D } from 'canvas';
import { createCanvas } from 'canvas';

import type { ImageData } from './validate';
import { isSourceDataValid, type SourceData } from './validate';

import {
  FRAME_WIDTH,
  FRAME_HEIGHT,
  // OUTPUT_ASSETS_PATH,
  CREATURE_ANIMATION_PHASES,
  OUTPUT_ASSETS_PATH,
} from '../config';

interface ImageRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const animationGroups = CREATURE_ANIMATION_PHASES.map((name) => name.toLowerCase());

class SpriteBuilder {
  private filename: string;
  private sourceData: SourceData;

  private maxCol: number = 0;
  private maxRow: number = 0;

  private canvas!: ReturnType<typeof createCanvas>;
  private ctx!: CanvasRenderingContext2D;

  constructor(buffer: Buffer, filename: string) {
    this.filename = filename;
    this.sourceData = unpackDEF(buffer, { format: 'bitmap', padding: false }) as SourceData;
  }

  execute() {
    if (!isSourceDataValid(this.sourceData, this.filename)) return 'error';

    this.computeCanvasSize();
    this.initializeCanvas();

    this.drawFramesToCanvas();
    this.saveSpriteImage();

    return 'success';
  }

  computeCanvasSize() {
    const colCounts = animationGroups.map((name) => this.sourceData.groups[name]?.length ?? 0);

    this.maxCol = Math.max(...colCounts);
    this.maxRow = animationGroups.length;
  }

  initializeCanvas() {
    const canvas = createCanvas(FRAME_WIDTH * this.maxCol, FRAME_HEIGHT * this.maxRow);
    const ctx = canvas.getContext('2d');

    this.canvas = canvas;
    this.ctx = ctx;
  }

  getImageRect() {
    let top = Infinity;
    let left = Infinity;
    let bottom = 0;
    let right = 0;

    Object.entries(this.sourceData.images).forEach(([, data]) => {
      if (data.y < top) top = data.y;
      if (data.y + data.height > bottom) bottom = data.y + data.height;
      if (data.x < left) left = data.x;
      if (data.x + data.width > right) right = data.x + data.width;
    });

    return {
      x: left,
      y: top,
      width: right - left,
      height: bottom - top,
    };
  }

  drawFramesToCanvas() {
    const imageRect = this.getImageRect();

    animationGroups.forEach((group, index) => {
      const isActiveGroup = group.includes('_active');
      this.drawGroupFrames(imageRect, this.getFramesToDraw(group.replace('_active', '')), index);

      if (isActiveGroup) {
        this.drawGroupFrames(imageRect, this.getActiveFramesToDraw(group), index);
      }
    });
  }

  drawGroupFrames(rect: ImageRect, images: ImageData[], colIndex: number) {
    if (!images.length) return;

    for (let rowIndex = 0; rowIndex < images.length; rowIndex++) {
      this.drawFrame(rect, images[rowIndex], rowIndex, colIndex);
    }
  }

  drawFrame(rect: ImageRect, image: ImageData, rowIndex: number, colIndex: number) {
    const rows = this.ctx.canvas.height / this.maxRow;
    const cols = this.ctx.canvas.width / this.maxCol;

    const row =
      Math.floor(rows / 2 - rect.height / 2 + (image.y || 0) - rect.y) + colIndex * FRAME_HEIGHT;
    const col =
      Math.floor(cols / 2 - rect.width / 2 + (image.x || 0) - rect.x) + rowIndex * FRAME_WIDTH;

    const view = new Uint8Array(image.data);

    let i = 0;
    while (i < view.byteLength) {
      const r = view[i++];
      const g = view[i++];
      const b = view[i++];
      const a = view[i++];
      this.ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;

      const at = i / 4 - 1;
      const x = col + (at % image.width);
      const y = row + Math.floor(at / image.width);

      this.ctx.fillRect(x, y, 1, 1);
    }
  }

  getFramesToDraw(group: string) {
    const imageNames = this.sourceData.groups[group] ?? [];
    return imageNames.map((imageName) => this.sourceData.images[imageName]);
  }

  getActiveFramesToDraw(group: string) {
    const activeGroup = group.replace('_active', '');
    const imageNames = this.sourceData.groups[activeGroup] ?? [];

    return imageNames.map((imageName) => {
      const image = this.sourceData.images[imageName];
      return { ...image, data: image.selection };
    }) as ImageData[];
  }

  saveSpriteImage() {
    const buffer = this.canvas.toBuffer('image/png');
    const filename = this.filename.split('.')[0];

    if (!fs.existsSync(OUTPUT_ASSETS_PATH)) fs.mkdirSync(OUTPUT_ASSETS_PATH, { recursive: true });
    fs.writeFileSync(`${OUTPUT_ASSETS_PATH}/${filename}.png`, buffer);
  }
}

export type { SourceData };
export { SpriteBuilder };
