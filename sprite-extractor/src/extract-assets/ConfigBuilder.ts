import fs from 'node:fs';

import { ANIMATION_GROUPS, OUTPUT_CONFIG_PATH } from '../config';

import type { SourceData } from './validate';

class ConfigBuilder {
  private sourceData: SourceData;
  private filename: string;

  constructor(sourceData: SourceData, filename: string) {
    this.filename = filename;
    this.sourceData = sourceData;
  }

  execute() {
    const config = this.getConfig();
    this.saveConfig(config);
  }

  getConfig() {
    const frameTemplates: string[] = [];

    ANIMATION_GROUPS.forEach((phaseName, index) => {
      const frameCount = (this.sourceData.groups[phaseName.replace('_active', '')] ?? []).length;
      frameTemplates.push(this.getGroupConfig(phaseName, frameCount, index));
    });

    return this.getSpriteConfig(this.filename, frameTemplates);
  }

  getGroupConfig(name: string, x: number, y: number) {
    return `[MONSTER_SPRITES['${name}']]: { y: ${y}, x: ${
      x === null ? 'null' : `[${this.getFrameSteps(x).toString()}]`
    } },`;
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

  getSpriteConfig(name: string, frames: string[]) {
    return `[TEXTURES['${name}']]: {${frames.join('')}},`;
  }

  saveConfig(content: string) {
    if (!fs.existsSync(OUTPUT_CONFIG_PATH)) fs.mkdirSync(OUTPUT_CONFIG_PATH, { recursive: true });

    const configPath = `${OUTPUT_CONFIG_PATH}/config.txt`;
    fs.appendFileSync(configPath, content);
  }
}

export { ConfigBuilder };
