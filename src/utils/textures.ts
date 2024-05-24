import BattleMonster from '@/controllers/BattleMonster';
import { MONSTER_SPRITES } from '@/constants/textures/monsters';
import { Frame, TEXTURES, Texture, TextureMap } from '@/constants/textures/types';

export function slowFrames<T extends string>(
  textureMap: TextureMap<T>,
  factor: number
): TextureMap<T> {
  const textureMapClone = structuredClone(textureMap);

  for (const mapKey in textureMapClone) {
    const texture = textureMapClone[mapKey as TEXTURES];
    if (!texture) continue;

    for (const textureKey in texture.textures) {
      const animation = texture.textures[textureKey as T];

      texture.textures[textureKey as T] = {
        y: animation.y,
        x: slowFrame(animation.x, factor),
      };
    }
  }

  return textureMapClone;
}

function slowFrame(frames: Array<number> | null, factor = 8) {
  if (frames === null) return null;
  return frames.flatMap((frame) => new Array(factor).fill(frame));
}

export function mirrorFrames<T extends string>(
  frames: Texture<T>['textures'],
  max?: number
): Texture<T>['textures'] {
  const maxFrameX = max ?? maxFrame(frames);
  const mirrored: Partial<Texture<T>['textures']> = {};

  for (const [key, frame] of Object.entries<Frame>(frames)) {
    const mirroredFrames = frame.x?.map((frameX) => Math.abs(maxFrameX - frameX)) ?? null;
    mirrored[key as T] = { y: frame.y, x: mirroredFrames };
  }

  return mirrored as Texture<T>['textures'];
}

function maxFrame<T extends string>(frames: Texture<T>['textures']): number {
  let max = 0;

  for (const [_, frame] of Object.entries<Frame>(frames)) {
    max = Math.max(max, ...(frame.x ?? [0]));
  }

  return max;
}

export function attackAnimationByAngle({ angle, response }: { angle: number; response: boolean }) {
  if ([0, 3].includes(angle)) return MONSTER_SPRITES['attack straight'];

  const downAngles = response ? [4, 5] : [1, 2];
  if (downAngles.includes(angle)) return MONSTER_SPRITES['attack down'];

  return MONSTER_SPRITES['attack up'];
}

export function attackedAnimation(attacking: BattleMonster, attacked: BattleMonster) {
  if (attacked.model.isDeadAfterHit(attacking.model)) return MONSTER_SPRITES.death;

  // TODO: Shield animation
  return MONSTER_SPRITES['getting hit'];
}

export function monsterBgSpriteByRace(race: number) {
  // TODO: Add all races
  return TEXTURES.necropolis_monster_bg;
}

export function monsterSpriteById(id: number) {
  // TODO: Add all ids
  return TEXTURES.wraith_static;
}

export function frameByIndex(index: number, maxFrame: number): { x: number; y: number } {
  if (index === 0) return { x: 0, y: 0 };
  return { x: index % maxFrame, y: Math.floor(index / maxFrame) };
}
