const fs = require('graceful-fs');
const { createCanvas } = require('canvas');

const { unpackDEF } = require('../lib');
const { groupToTemplate } = require('./template');
const { FRAME_WIDTH, FRAME_HEIGHT, RESULT_DIR, ANIMATION_GROUPS } = require('./config');

class SpriteGenerator {
  constructor(buffer, filename) {
    this.filename = filename;
    this.data = unpackDEF(buffer, { format: 'bitmap', padding: false });
    this.groups = ANIMATION_GROUPS.map((name) => name.toLowerCase());

    this.maxCol = Math.max(...this.groups.map((name) => this.data.groups[name]?.length ?? 0));
    this.maxRow = this.groups.length;

    const { canvas, ctx } = this.createImageFrameCanvas(this.maxCol, this.maxRow);
    this.canvas = canvas;
    this.ctx = ctx;
  }

  createImageFrameCanvas(maxCol, maxRow) {
    const canvas = createCanvas(FRAME_WIDTH * maxCol, FRAME_HEIGHT * maxRow);
    const ctx = canvas.getContext('2d');

    return { canvas, ctx };
  }

  run() {
    const imageRect = this.getImageRect();

    this.groups.forEach((groupName, index) => {
      const isActiveState = groupName.includes('_active');
      this.drawFrameGroup(imageRect, this.imagesToDraw(groupName.replace('_active', '')), index);

      if (isActiveState) {
        this.drawFrameGroup(imageRect, this.activeImagesToDraw(groupName), index);
      }
    });

    this.saveImage();
    groupToTemplate(this.data, this.groups, this.filename.split('.')[0]);
  }

  imagesToDraw(groupName) {
    const imageNames = this.data.groups[groupName] ?? [];
    return imageNames.map((imageName) => this.data.images[imageName]);
  }

  activeImagesToDraw(groupName) {
    groupName = groupName.replace('_active', '');
    const imageNames = this.data.groups[groupName] ?? [];

    return imageNames.map((imageName) => {
      const image = this.data.images[imageName];
      return { ...image, data: image.selection };
    });
  }

  drawFrameGroup(rect, images, colIndex) {
    if (!images.length) return;

    for (let rowIndex = 0; rowIndex < images.length; rowIndex++) {
      this.drawFrame(rect, images[rowIndex], rowIndex, colIndex);
    }
  }

  drawFrame(rect, image, rowIndex, colIndex) {
    const rows = this.ctx.canvas.height / this.maxRow;
    const cols = this.ctx.canvas.width / this.maxCol;

    const row = Math.floor(rows / 2 - rect.height / 2 + (image.y || 0) - rect.y) + colIndex * 180;
    const col = Math.floor(cols / 2 - rect.width / 2 + (image.x || 0) - rect.x) + rowIndex * 220;

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

  getImageRect() {
    const images = Object.values(this.data.images);

    let top = Infinity;
    let left = Infinity;
    let bottom = 0;
    let right = 0;

    const imageNames = Object.keys(images);
    for (const name of imageNames) {
      const image = images[name];

      if (image.y < top) top = image.y;
      if (image.y + image.height > bottom) bottom = image.y + image.height;
      if (image.x < left) left = image.x;
      if (image.x + image.width > right) right = image.x + image.width;
    }

    return {
      x: left,
      y: top,
      width: right - left,
      height: bottom - top,
    };
  }

  saveImage() {
    const buffer = this.canvas.toBuffer('image/png');
    const filename = this.filename.split('.')[0];

    fs.writeFileSync(`${RESULT_DIR}/${filename}.png`, buffer);
  }
}

module.exports = { SpriteGenerator };
