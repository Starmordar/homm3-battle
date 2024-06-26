interface HeroStacks {
  low: string;
  high: string;
  type: string;
}

interface Skill {
  level: number;
  name: string;
}

interface HeroResponse {
  id: number;
  name: string;
  race: number;
  stacks: Array<HeroStacks>;
  class: string;
  spec: string;
  skill1: Skill;
  skill2: Skill;
}

export type HeroesResponse = Record<string, HeroResponse>;

interface BattlefieldResponse {
  graphics: string;
}

export type BattlefieldsResponse = Record<string, BattlefieldResponse>;
