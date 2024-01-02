import type { MONSTER_SPRITES, TEXTURES } from '@/constants/textures';
import type { Texture, TextureMap } from '@/types';

export function slowFrames(textureMap: TextureMap, factor: number): TextureMap {
  const textureMapClone = structuredClone(textureMap);

  for (const mapKey in textureMapClone) {
    const texture = textureMapClone[mapKey as TEXTURES];
    if (!texture) continue;

    for (const textureKey in texture.textures) {
      const animation = texture.textures[textureKey as MONSTER_SPRITES];

      texture.textures[textureKey as MONSTER_SPRITES] = {
        y: animation.y,
        x: slowFrame(animation.x, factor),
      };
    }
  }

  return textureMapClone;
}

function slowFrame(frames: Array<number>, factor = 8) {
  return frames.flatMap((frame) => new Array(factor).fill(frame));
}

export function mirrorFrames(frames: Texture['textures']): Texture['textures'] {
  const maxFrameX = maxFrame(frames);
  const mirrored: Partial<Texture['textures']> = {};

  for (const [key, frame] of Object.entries(frames)) {
    const lastFrame = frame.x[frame.x.length - 1];
    const updatedFrames = frame.x.map((frameX) => frameX + (maxFrameX - lastFrame));

    mirrored[key as MONSTER_SPRITES] = { y: frame.y, x: updatedFrames.reverse() };
  }

  return mirrored as Texture['textures'];
}

function maxFrame(frames: Texture['textures']): number {
  let max = 0;

  for (const [_, frame] of Object.entries(frames)) {
    max = Math.max(max, ...frame.x);
  }

  return max;
}
