import fs from 'node:fs';

import { FRAME_PADDING, ANIMATION_GROUPS, OUTPUT_CONFIG_PATH } from '../config';

import type { SourceData } from './validate';

interface FrameData {
  frame: { x: number; y: number; w: number; h: number };
  spriteSourceSize: { x: number; y: number; w: number; h: number };
  sourceSize: { w: number; h: number };
  anchor: { x: number; y: number };
}

interface Config {
  frames: Record<string, FrameData>;
  animations: Record<string, string[]>;
  meta: {
    image: string;
    format: string;
    size: { w: number; h: number };
    scale: string;
  };
}

class ConfigBuilder {
  private sourceData: SourceData;
  private filename: string;
  private config: Config = { frames: {}, animations: {}, meta: {} } as Config;

  private maxCol: number = 0;
  private maxRow: number = 0;
  private frameWidth: number = 0;
  private frameHeight: number = 0;

  constructor(sourceData: SourceData, filename: string) {
    this.filename = filename;
    this.sourceData = sourceData;
  }

  execute() {
    this.computeFrameSize();

    this.generateAnimationConfig();
    this.generateMetaConfig();
    this.saveConfig();
  }

  computeFrameSize() {
    const colCounts = ANIMATION_GROUPS.map((name) => this.sourceData.groups[name]?.length ?? 0);
    const imagesData = Object.values(this.sourceData.images);

    this.frameWidth = Math.max(...imagesData.map((img) => img.width)) + FRAME_PADDING;
    this.frameHeight = Math.max(...imagesData.map((img) => img.height)) + FRAME_PADDING;

    this.maxCol = Math.max(...colCounts);
    this.maxRow = ANIMATION_GROUPS.length;
  }

  generateAnimationConfig() {
    ANIMATION_GROUPS.forEach((groupName, index) => {
      const frameCount = (this.sourceData.groups[groupName.replace('_active', '')] ?? []).length;
      this.getAnimationGroupConfig(groupName, frameCount, index);
    });
  }

  getAnimationGroupConfig(name: string, xFrame: number, yFrame: number) {
    this.config.animations[name] = this.getFrameSteps(xFrame).map((f) => `${name}_${f}`);

    xFrame--;

    while (xFrame >= 0) {
      const dimensions = { w: this.frameWidth, h: this.frameHeight };
      const frameData: FrameData = {
        frame: { x: this.frameWidth * xFrame, y: this.frameHeight * yFrame, ...dimensions },
        spriteSourceSize: { x: 0, y: 0, ...dimensions },
        sourceSize: { ...dimensions },
        anchor: { x: 0.5, y: 0.5 },
      };

      this.config.frames[`${name}_${xFrame}`] = frameData;
      xFrame--;
    }
  }

  getFrameSteps(frame: number) {
    const frames = [];
    frame--;

    while (frame >= 0) {
      frames.push(frame);
      frame--;
    }

    return frames.reverse();
  }

  generateMetaConfig() {
    this.config.meta = {
      image: `../assets/${this.filename}.webp`,
      format: 'webp',
      size: { w: this.frameWidth * this.maxCol, h: this.frameHeight * this.maxRow },
      scale: '1',
    };
  }

  saveConfig() {
    if (!fs.existsSync(OUTPUT_CONFIG_PATH)) fs.mkdirSync(OUTPUT_CONFIG_PATH, { recursive: true });

    const configPath = `${OUTPUT_CONFIG_PATH}/${this.filename}.json`;
    fs.writeFileSync(configPath, JSON.stringify(this.config, null), 'utf-8');
  }
}

export { ConfigBuilder };
