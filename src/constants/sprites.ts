export const hero1SpriteOptions: IAnimatedSpriteOptions = {
  url: '/src/assets/heroes/undead.png',
  width: 150,
  height: 175,
  animations: {
    idle: [0, 1, 2, 3, 2, 1],
    active: [0, 1, 2, 3, 8, 9, 10, 11, 11, 10, 9, 8],
  },
};

export const hero2SpriteOptions: IAnimatedSpriteOptions = {
  url: '/src/assets/heroes/undead-mirror.png',
  width: 150,
  height: 175,
  animations: {
    idle: [19, 18, 17, 16, 17, 18],
    active: [19, 18, 17, 16, 11, 10, 9, 8, 8, 9, 10, 11],
  },
};

export const wrathSprite: IAnimatedSpriteOptions = {
  url: '/src/assets/wraith.png',
  width: 155,
  height: 138,
  animations: {
    idle: [0, 1, 2, 3],
    // idle: [1, 2, 3, 4, 3, 2, 1],
  },
};

export interface ISpriteOptions {
  url: string;
  width: number;
  height: number;

  animations?: ISpriteAnimation;
}

export interface ISpriteAnimation {
  idle: Array<number>;
  active?: Array<number>;
  attack?: Array<number>;
}

export interface IAnimatedSpriteOptions extends ISpriteOptions {
  animations: ISpriteAnimation;
}

export enum SPRITE {
  hero_avatar_sm = 'hero_avatar_sm',
  hero_avatar_lg = 'hero_avatar_lg',

  corner_gems = 'corner_gems',
  edge_pattern = 'edge_pattern',
  panel_bg = 'panel_bg',
  battle_bg_01 = 'battle_bg_01',
}

export const uiSprites = {
  [SPRITE.hero_avatar_sm]: {
    url: '/src/assets/portraits/heroes/sm.png',
    width: 32,
    height: 32,
  },
  [SPRITE.hero_avatar_lg]: {
    url: '/src/assets/portraits/heroes/lg.png',
    width: 58,
    height: 64,
  },

  [SPRITE.corner_gems]: {
    url: '/src/assets/ui/cornergems.png',
    width: 46,
    height: 45,
  },
  [SPRITE.panel_bg]: {
    url: '/src/assets/ui/panelbg.jpg',
    width: 80,
    height: 200,
  },
  [SPRITE.edge_pattern]: {
    url: 'src/assets/edge_pattern.png',
    width: 128,
    height: 128,
  },
  [SPRITE.battle_bg_01]: {
    url: 'src/assets/battlefields/1_0.jpg',
    width: 800,
    height: 556,
  },
};
