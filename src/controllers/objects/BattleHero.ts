import BattleHeroModel from '@/models/objects/BattleHeroModel';

class BattleHero {
  public readonly model: BattleHeroModel;

  constructor(model: BattleHeroModel) {
    this.model = model;
  }
}

export default BattleHero;
