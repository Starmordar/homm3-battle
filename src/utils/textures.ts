import { SPRITE } from '@/constants/sprites';
import { MONSTER_SPRITES } from '@/constants/textures';
import type { MonsterTexturesMap } from '@/types';

export function slowAnimationFrames(
  textures: MonsterTexturesMap,
  factor: number
): MonsterTexturesMap {
  const texturesCopy = structuredClone(textures);

  for (const key in texturesCopy) {
    const texture = texturesCopy[key as SPRITE];
    if (!texture) continue;

    for (const spriteKey in texture.sprites) {
      const animation = texture.sprites[spriteKey as MONSTER_SPRITES];

      texture.sprites[spriteKey as MONSTER_SPRITES] = {
        y: animation.y,
        x: slowFrame(animation.x, factor),
      };
    }
  }

  return texturesCopy;
}

function slowFrame(frames: Array<number>, factor = 8) {
  return frames.flatMap((frame) => new Array(factor).fill(frame));
}
