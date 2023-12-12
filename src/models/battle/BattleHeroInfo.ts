import { heroesOptions } from '@/constants/hero';
import BattleHero from './BattleHero';

class BattleHeroInfo {
  private readonly battleHero: BattleHero;

  constructor(battleHero: BattleHero) {
    this.battleHero = battleHero;
  }

  get primarySkills() {
    return this.battleHero.details.primarySkills;
  }

  get morale() {
    return this.battleHero.details.morale;
  }

  get luck() {
    return this.battleHero.details.luck;
  }

  get mana() {
    const { manaLimit, mana } = this.battleHero.details;
    return { manaLimit: manaLimit, mana };
  }

  get options() {
    return heroesOptions[this.battleHero.details.name];
  }
}

export default BattleHeroInfo;
