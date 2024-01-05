import { v4 as uuidv4 } from 'uuid';
import { battleLayout } from '@/constants/hex';
import { monsters, type Monster } from '@/constants/monsters';
import { Hexagon, Point } from '@/models/grid';
import Subject from '@/services/Observer';
import { TEXTURES } from '@/constants/textures';
import BattleHero from '@/controllers/BattleHero';

interface Animation {
  sprite: TEXTURES;
  size: { width: number; height: number; offsetY: number };
}

interface Options {
  monsterId: number;
  animation: Animation;
  owner: BattleHero | null;

  controllable: boolean;
  position: Hexagon;
  quantity: number;
}

class BattleMonsterModel extends Subject {
  uuid: string;
  monsterId: number;
  data: Monster;
  controllable: boolean;
  lastUnitHealth: number;
  quantity: number;
  owner: BattleHero | null;

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
    this.owner = options.owner;

    this.activeAnimation = null;
    this.animation = options.animation;
    this.animationBreakpoints = null;
    this.animationPath = null;

    this.position = options.position;
    this.controllable = options.controllable;

    this.lastUnitHealth = this.data.damage.hitPoints;
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
      const startPixel = battleLayout.hexToPixel(breakpoints[index]);
      const endPixel = battleLayout.hexToPixel(breakpoints[index + 1]);

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

  get attack(): number {
    const baseAttack = this.data.damage.attack;

    if (this.owner === null) return baseAttack;
    return baseAttack + this.owner.model.primarySkills.attack;
  }

  get defense(): number {
    const baseDefense = this.data.damage.defense;

    if (this.owner === null) return baseDefense;
    return baseDefense + this.owner.model.primarySkills.defense;
  }

  getDefenseValue(): number {
    if (this.owner === null) return this.data.damage.defense;
    return this.data.damage.defense + this.owner.model.primarySkills.defense;
  }

  getAttackValue(): number {
    if (this.owner === null) return this.data.damage.attack;
    return this.data.damage.attack + this.owner.model.primarySkills.attack;
  }

  meleeHitFrom(from: BattleMonsterModel) {
    const value = this.getHitValue(from, false);
    this.decreaseHitPoints(value);
  }

  getHitValue(from: BattleMonsterModel, isShooting = false): number {
    const [hitFrom, hitTo] = from.data.damage.melee;

    // TODO: Make use of hitTo
    const baseHit = hitFrom * from.quantity;

    const hitFactor = this.getHitFactor(from, baseHit);
    const attackFactor = this.getAttackFactor(from, baseHit, isShooting);

    const luckFactor = 0.01; // this.getLuckFactor(from, baseHit, hitFactor);
    const defenseFactor = this.getDefenseFactor(from);
    const result = (baseHit + hitFactor + attackFactor + luckFactor) * (1 - defenseFactor);

    return Math.floor(result);
  }

  getHitFactor(from: BattleMonsterModel, baseHitValue: number): number {
    const attack = from.getAttackValue();
    const defense = this.getDefenseValue();

    const factor = attack > defense ? 0.05 : 0.025;
    const result = (attack - defense) * factor * baseHitValue;

    return Math.floor(result);
  }

  private getAttackFactor(from: BattleMonsterModel, hitValue: number, isShooting: boolean): number {
    let result = 0;
    const attack = from.getAttackValue();
    const defense = this.getDefenseValue();

    if (from.owner === null) return Math.floor(result);

    let specialityFactor = 0;

    if (isShooting) {
      specialityFactor = this.getSpecialityFactor(from.owner, 'ARCHERY', 0.1);
    } else {
      specialityFactor = this.getSpecialityFactor(from.owner, 'OFFENSE', 0.1);
    }

    if (attack > defense) {
      result = specialityFactor * hitValue;
    } else {
      let baseHitFactor = this.getHitFactor(from, hitValue);
      result = specialityFactor * (hitValue + baseHitFactor);
    }

    return Math.floor(result);
  }

  private getSpecialityFactor(
    owner: BattleHero,
    specialityName: string,
    specialityMultiplier: number
  ): number {
    let result = 0;
    let secondaryLevel = 0;
    let specialityFactor = 0;
    // const heroLevel = 10; // owner.properties.getValue('level');
    secondaryLevel = 3; //owner.secondary.get(specialityName) || 0;

    // if (owner.getSpeciality() === specialityName) {
    //   specialityFactor = 1 + 0.05 * heroLevel;
    // }

    if (secondaryLevel) {
      result = secondaryLevel * specialityMultiplier;
    }

    if (specialityFactor) {
      result *= specialityFactor;
    }

    return Math.floor(result);
  }

  private getDefenseFactor(from: BattleMonsterModel): number {
    if (from.owner === null) return 0;
    return this.getSpecialityFactor(from.owner, 'ARMORER', 0.05);
  }

  private decreaseHitPoints(hitPoints: number) {
    if (this.lastUnitHealth <= hitPoints) {
      hitPoints -= this.lastUnitHealth;
      const decreasedQuantity = Math.ceil(hitPoints / this.data.damage.hitPoints);
      hitPoints -= (decreasedQuantity - 1) * this.data.damage.hitPoints;
      this.quantity -= decreasedQuantity;

      if (this.quantity > 0) {
        this.lastUnitHealth = this.data.damage.hitPoints;
      }

      if (hitPoints < 0) {
        hitPoints = 0;
      }
    }

    this.lastUnitHealth -= hitPoints;

    if (this.quantity <= 0 || (this.quantity === 1 && this.lastUnitHealth === 0)) {
      this.isDead = true;
      this.quantity = 0;
      this.lastUnitHealth = 0;
    }
  }

  isDeadAfterHit(from: BattleMonsterModel) {
    let hitPoints = this.getHitValue(from, false);
    let quantity = this.quantity;
    let lastUnitHealth = this.lastUnitHealth;

    if (lastUnitHealth <= hitPoints) {
      hitPoints -= lastUnitHealth;
      const decreasedQuantity = Math.ceil(hitPoints / this.data.damage.hitPoints);
      hitPoints -= (decreasedQuantity - 1) * this.data.damage.hitPoints;
      quantity -= decreasedQuantity;

      if (quantity > 0) {
        lastUnitHealth = this.data.damage.hitPoints;
      }

      if (hitPoints < 0) {
        hitPoints = 0;
      }
    }

    lastUnitHealth -= hitPoints;
    console.log('quantity, lastUnitHealth', quantity, lastUnitHealth);

    return quantity <= 0 || (quantity === 1 && lastUnitHealth === 0);
  }
}

export default BattleMonsterModel;
