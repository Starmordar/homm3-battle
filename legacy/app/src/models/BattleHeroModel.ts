import BattleMonster from '@/controllers/BattleMonster';
import Subject from '@/services/Observer';
import type { HERO_CLASS, HeroClassSettings, HeroSettings, HeroSkill } from '@/types/heroes';

interface PrimarySkills {
  attack: number;
  defense: number;
  spellPower: number;
  knowledge: number;
}

export interface Settings extends HeroSettings {
  classSettings: HeroClassSettings;
}

class BattleHeroModel extends Subject {
  heroId: number;
  name: string;
  race: number;
  female: boolean;
  class: HERO_CLASS;
  spec: string;

  primarySkills: PrimarySkills;
  skillList: Array<HeroSkill>;

  morale: number;
  luck: number;
  manaLimit: number;
  mana: number;

  army: Array<BattleMonster>;

  constructor(settings: Settings, army: Array<BattleMonster>) {
    super();

    this.heroId = settings.id;
    this.name = settings.name;
    this.race = settings.race;
    this.female = settings.female;
    this.class = settings.class;
    this.spec = settings.spec;
    this.skillList = [settings.skill1, settings.skill2];

    this.primarySkills = this.populatePrimarySkills(settings.classSettings);
    this.mana = this.primarySkills.knowledge * 10;
    this.manaLimit = this.primarySkills.knowledge * 10;

    this.luck = 1;
    this.morale = 0;

    this.army = army;
  }

  private populatePrimarySkills(classSettings: HeroClassSettings) {
    const attack = classSettings.attack.start;
    const defense = classSettings.defence.start;
    const spellPower = classSettings.power.start;
    const knowledge = classSettings.knowledge.start;

    return { attack, defense, spellPower, knowledge };
  }

  get aliveMonsters() {
    return this.army.filter(({ model }) => !model.isDead);
  }
}

export default BattleHeroModel;
