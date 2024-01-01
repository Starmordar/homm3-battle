import { gridLayout } from '@/constants/hex';
import { monsters, type Monster } from '@/constants/monsters';
import { Hexagon, Point } from '@/models/grid';
import Subject from '@/services/Observer';

interface Animation {
  sprite: string;
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
  monsterId: number;
  data: Monster;
  controllable: boolean;
  quantity: number;

  position: Hexagon;
  animationBreakpoints: Array<Hexagon> | null;
  animationPath: Array<Point> | null;
  animation: Animation;

  hadTurn: boolean;
  hasResponse: boolean;

  constructor(options: Options) {
    super();

    this.monsterId = options.monsterId;
    this.data = this.monsterData(options.monsterId);

    this.animation = options.animation;
    this.animationBreakpoints = null;
    this.animationPath = null;

    this.position = options.position;
    this.controllable = options.controllable;
    this.quantity = options.quantity;

    this.hadTurn = false;
    this.hasResponse = true;
  }

  private monsterData(monsterId: number): Monster {
    const result = monsters.find((monster) => monster.id === monsterId);

    if (!result) throw new Error(`Monster with ${monsterId} id is not found!`);
    return result;
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
