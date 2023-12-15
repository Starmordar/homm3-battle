import { Hexagon } from '../grid';
import { monsters, type Monster } from '@/constants/monsters';

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

class BattleMonster {
  monsterId: number;
  data: Monster;
  controllable: boolean;
  quantity: number;
  position: Hexagon;
  animation: Animation;

  constructor(options: Options) {
    this.monsterId = options.monsterId;
    this.data = this.monsterData(options.monsterId);

    this.position = options.position;
    this.controllable = options.controllable;
    this.quantity = options.quantity;
    this.animation = options.animation;
  }

  private monsterData(monsterId: number): Monster {
    const result = monsters.find((monster) => monster.id === monsterId);

    if (!result) throw new Error(`Monster with ${monsterId} id is not found!`);
    return result;
  }
}

export default BattleMonster;
