import { v4 as uuidv4 } from 'uuid';
import { gridLayout } from '@/constants/hex';
import { monsters, type Monster } from '@/constants/monsters';
import { Hexagon, Point } from '@/models/grid';
import Subject from '@/services/Observer';
import { TEXTURES } from '@/constants/textures';

interface Animation {
  sprite: TEXTURES;
  size: { width: number; height: number; offsetY: number };
}

interface Options {
  monsterId: number;
  animation: Animation;

  controllable: boolean;
  position: Hexagon;
  quantity: number;
}

class BattleMonsterModel extends Subject {
  uuid: string;
  monsterId: number;
  data: Monster;
  controllable: boolean;
  quantity: number;

  position: Hexagon;
  animationBreakpoints: Array<Hexagon> | null;
  animationPath: Array<Point> | null;
  animation: Animation;

  activeAnimation: string | null;

  hadTurn: boolean;
  hasResponse: boolean;
  isDead: boolean;

  constructor(options: Options) {
    super();

    this.uuid = uuidv4();
    this.monsterId = options.monsterId;
    this.data = this.monsterData(options.monsterId);

    this.activeAnimation = null;
    this.animation = options.animation;
    this.animationBreakpoints = null;
    this.animationPath = null;

    this.position = options.position;
    this.controllable = options.controllable;
    this.quantity = options.quantity;

    this.hadTurn = false;
    this.hasResponse = true;
    this.isDead = false;
  }

  private monsterData(monsterId: number): Monster {
    const result = monsters.find((monster) => monster.id === monsterId);

    if (!result) throw new Error(`Monster with ${monsterId} id is not found!`);
    return result;
  }

  setActiveAnimation(animation: string | null) {
    this.activeAnimation = animation;
  }

  setAnimationBreakpoints(breakpoints: Array<Hexagon> | null) {
    if (breakpoints === null) {
      this.animationBreakpoints = null;
      this.animationPath = null;
      return;
    }

    this.animationBreakpoints = breakpoints;
    this.setAnimationPath(breakpoints);
  }

  private setAnimationPath(breakpoints: Array<Hexagon>) {
    const animationPath = [];

    for (let index = 0; index < breakpoints.length - 1; index++) {
      const startPixel = gridLayout.hexToPixel(breakpoints[index]);
      const endPixel = gridLayout.hexToPixel(breakpoints[index + 1]);

      const diff = { x: endPixel.x - startPixel.x, y: endPixel.y - startPixel.y };

      // TODO: Update split count based on animation frames
      const splitCount = 6;
      for (let splitIndex = 0; splitIndex < splitCount; splitIndex++) {
        animationPath.push({
          x: startPixel.x + (diff.x * splitIndex) / splitCount,
          y: startPixel.y + (diff.y * splitIndex) / splitCount,
        });
      }
    }

    this.animationPath = animationPath;
  }
}

export default BattleMonsterModel;
