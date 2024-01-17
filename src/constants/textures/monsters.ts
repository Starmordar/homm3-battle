import { mirrorFrames, slowFrames } from '@/utils/textures';
import { TEXTURES, TextureFrames, TextureMap } from './types';

export enum MONSTER_SPRITES {
  moving = 'moving',
  'start moving' = 'start moving',
  'stop moving' = 'stop moving',
  standing = 'standing',
  standing_active = 'standing_active',
  'mouse over' = 'mouse over',
  'mouse over_active' = 'mouse over_active',

  'getting hit' = 'getting hit',
  defend = 'defend',
  death = 'death',
  'turn left' = 'turn left',
  'turn right' = 'turn right',

  'attack up' = 'attack up',
  'attack straight' = 'attack straight',
  'attack down' = 'attack down',

  'shoot up' = 'shoot up',
  'shoot straight' = 'shoot straight',
  'shoot down' = 'shoot down',
}

const frames: Partial<TextureFrames<MONSTER_SPRITES>> = {
  [TEXTURES['CBKNIG']]: {
    [MONSTER_SPRITES['moving']]: {
      y: 0,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['start moving']]: {
      y: 1,
      x: [0, 1],
    },
    [MONSTER_SPRITES['stop moving']]: {
      y: 2,
      x: [0, 1],
    },
    [MONSTER_SPRITES['standing']]: {
      y: 3,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['standing_active']]: {
      y: 4,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['mouse over']]: {
      y: 5,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['mouse over_active']]: {
      y: 6,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['getting hit']]: {
      y: 7,
      x: [0, 1, 2, 3, 4, 5],
    },
    [MONSTER_SPRITES['defend']]: {
      y: 8,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['death']]: {
      y: 9,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['turn left']]: {
      y: 10,
      x: [0, 1, 2],
    },
    [MONSTER_SPRITES['turn right']]: {
      y: 11,
      x: [0, 1, 2],
    },
    [MONSTER_SPRITES['attack up']]: {
      y: 12,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['attack straight']]: {
      y: 13,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['attack down']]: {
      y: 14,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['shoot up']]: {
      y: 15,
      x: [],
    },
    [MONSTER_SPRITES['shoot straight']]: {
      y: 16,
      x: [],
    },
    [MONSTER_SPRITES['shoot down']]: {
      y: 17,
      x: [],
    },
  },
  [TEXTURES['CBLORD']]: {
    [MONSTER_SPRITES['moving']]: {
      y: 0,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['start moving']]: {
      y: 1,
      x: [0, 1],
    },
    [MONSTER_SPRITES['stop moving']]: {
      y: 2,
      x: [0, 1],
    },
    [MONSTER_SPRITES['standing']]: {
      y: 3,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['standing_active']]: {
      y: 4,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['mouse over']]: {
      y: 5,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['mouse over_active']]: {
      y: 6,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['getting hit']]: {
      y: 7,
      x: [0, 1, 2, 3, 4, 5],
    },
    [MONSTER_SPRITES['defend']]: {
      y: 8,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['death']]: {
      y: 9,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['turn left']]: {
      y: 10,
      x: [0, 1, 2],
    },
    [MONSTER_SPRITES['turn right']]: {
      y: 11,
      x: [0, 1, 2],
    },
    [MONSTER_SPRITES['attack up']]: {
      y: 12,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['attack straight']]: {
      y: 13,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['attack down']]: {
      y: 14,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['shoot up']]: {
      y: 15,
      x: [],
    },
    [MONSTER_SPRITES['shoot straight']]: {
      y: 16,
      x: [],
    },
    [MONSTER_SPRITES['shoot down']]: {
      y: 17,
      x: [],
    },
  },
  [TEXTURES['CHDRGN']]: {
    [MONSTER_SPRITES['moving']]: {
      y: 0,
      x: [0, 1, 2, 3, 4, 5],
    },
    [MONSTER_SPRITES['start moving']]: {
      y: 1,
      x: [0, 1, 2],
    },
    [MONSTER_SPRITES['stop moving']]: {
      y: 2,
      x: [0, 1, 2, 3],
    },
    [MONSTER_SPRITES['standing']]: {
      y: 3,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['standing_active']]: {
      y: 4,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['mouse over']]: {
      y: 5,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    },
    [MONSTER_SPRITES['mouse over_active']]: {
      y: 6,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    },
    [MONSTER_SPRITES['getting hit']]: {
      y: 7,
      x: [0, 1, 2, 3, 4, 5],
    },
    [MONSTER_SPRITES['defend']]: {
      y: 8,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['death']]: {
      y: 9,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['turn left']]: {
      y: 10,
      x: [0, 1, 2],
    },
    [MONSTER_SPRITES['turn right']]: {
      y: 11,
      x: [0, 1, 2],
    },
    [MONSTER_SPRITES['attack up']]: {
      y: 12,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['attack straight']]: {
      y: 13,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['attack down']]: {
      y: 14,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['shoot up']]: {
      y: 15,
      x: [],
    },
    [MONSTER_SPRITES['shoot straight']]: {
      y: 16,
      x: [],
    },
    [MONSTER_SPRITES['shoot down']]: {
      y: 17,
      x: [],
    },
  },
  [TEXTURES['CLICH']]: {
    [MONSTER_SPRITES['moving']]: {
      y: 0,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['start moving']]: {
      y: 1,
      x: [0, 1],
    },
    [MONSTER_SPRITES['stop moving']]: {
      y: 2,
      x: [0, 1],
    },
    [MONSTER_SPRITES['standing']]: {
      y: 3,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['standing_active']]: {
      y: 4,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['mouse over']]: {
      y: 5,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['mouse over_active']]: {
      y: 6,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['getting hit']]: {
      y: 7,
      x: [0, 1, 2, 3, 4, 5],
    },
    [MONSTER_SPRITES['defend']]: {
      y: 8,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['death']]: {
      y: 9,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['turn left']]: {
      y: 10,
      x: [0, 1],
    },
    [MONSTER_SPRITES['turn right']]: {
      y: 11,
      x: [0, 1],
    },
    [MONSTER_SPRITES['attack up']]: {
      y: 12,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['attack straight']]: {
      y: 13,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['attack down']]: {
      y: 14,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['shoot up']]: {
      y: 15,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['shoot straight']]: {
      y: 16,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['shoot down']]: {
      y: 17,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
  },
  [TEXTURES['CNDRGN']]: {
    [MONSTER_SPRITES['moving']]: {
      y: 0,
      x: [0, 1, 2, 3, 4, 5],
    },
    [MONSTER_SPRITES['start moving']]: {
      y: 1,
      x: [0, 1, 2],
    },
    [MONSTER_SPRITES['stop moving']]: {
      y: 2,
      x: [0, 1, 2, 3],
    },
    [MONSTER_SPRITES['standing']]: {
      y: 3,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['standing_active']]: {
      y: 4,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['mouse over']]: {
      y: 5,
      x: [0, 1, 2, 3, 4],
    },
    [MONSTER_SPRITES['mouse over_active']]: {
      y: 6,
      x: [0, 1, 2, 3, 4],
    },
    [MONSTER_SPRITES['getting hit']]: {
      y: 7,
      x: [0, 1, 2, 3, 4, 5],
    },
    [MONSTER_SPRITES['defend']]: {
      y: 8,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['death']]: {
      y: 9,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['turn left']]: {
      y: 10,
      x: [0, 1, 2],
    },
    [MONSTER_SPRITES['turn right']]: {
      y: 11,
      x: [0, 1, 2],
    },
    [MONSTER_SPRITES['attack up']]: {
      y: 12,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['attack straight']]: {
      y: 13,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['attack down']]: {
      y: 14,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['shoot up']]: {
      y: 15,
      x: [],
    },
    [MONSTER_SPRITES['shoot straight']]: {
      y: 16,
      x: [],
    },
    [MONSTER_SPRITES['shoot down']]: {
      y: 17,
      x: [],
    },
  },
  [TEXTURES['CNOSFE']]: {
    [MONSTER_SPRITES['moving']]: {
      y: 0,
      x: [0, 1, 2, 3, 4, 5],
    },
    [MONSTER_SPRITES['start moving']]: {
      y: 1,
      x: [0, 1, 2, 3, 4],
    },
    [MONSTER_SPRITES['stop moving']]: {
      y: 2,
      x: [0, 1, 2, 3, 4],
    },
    [MONSTER_SPRITES['standing']]: {
      y: 3,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['standing_active']]: {
      y: 4,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['mouse over']]: {
      y: 5,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    },
    [MONSTER_SPRITES['mouse over_active']]: {
      y: 6,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    },
    [MONSTER_SPRITES['getting hit']]: {
      y: 7,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['defend']]: {
      y: 8,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    },
    [MONSTER_SPRITES['death']]: {
      y: 9,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['turn left']]: {
      y: 10,
      x: [0, 1, 2],
    },
    [MONSTER_SPRITES['turn right']]: {
      y: 11,
      x: [0, 1, 2],
    },
    [MONSTER_SPRITES['attack up']]: {
      y: 12,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['attack straight']]: {
      y: 13,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['attack down']]: {
      y: 14,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['shoot up']]: {
      y: 15,
      x: [],
    },
    [MONSTER_SPRITES['shoot straight']]: {
      y: 16,
      x: [],
    },
    [MONSTER_SPRITES['shoot down']]: {
      y: 17,
      x: [],
    },
  },
  [TEXTURES['CPLICH']]: {
    [MONSTER_SPRITES['moving']]: {
      y: 0,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['start moving']]: {
      y: 1,
      x: [0, 1],
    },
    [MONSTER_SPRITES['stop moving']]: {
      y: 2,
      x: [0, 1],
    },
    [MONSTER_SPRITES['standing']]: {
      y: 3,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['standing_active']]: {
      y: 4,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['mouse over']]: {
      y: 5,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['mouse over_active']]: {
      y: 6,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['getting hit']]: {
      y: 7,
      x: [0, 1, 2, 3, 4, 5],
    },
    [MONSTER_SPRITES['defend']]: {
      y: 8,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['death']]: {
      y: 9,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['turn left']]: {
      y: 10,
      x: [0, 1],
    },
    [MONSTER_SPRITES['turn right']]: {
      y: 11,
      x: [0, 1],
    },
    [MONSTER_SPRITES['attack up']]: {
      y: 12,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['attack straight']]: {
      y: 13,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['attack down']]: {
      y: 14,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['shoot up']]: {
      y: 15,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['shoot straight']]: {
      y: 16,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    [MONSTER_SPRITES['shoot down']]: {
      y: 17,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
  },
  [TEXTURES['CVAMP']]: {
    [MONSTER_SPRITES['moving']]: {
      y: 0,
      x: [0, 1, 2, 3, 4, 5],
    },
    [MONSTER_SPRITES['start moving']]: {
      y: 1,
      x: [0, 1, 2, 3, 4],
    },
    [MONSTER_SPRITES['stop moving']]: {
      y: 2,
      x: [0, 1, 2, 3, 4],
    },
    [MONSTER_SPRITES['standing']]: {
      y: 3,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['standing_active']]: {
      y: 4,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['mouse over']]: {
      y: 5,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    },
    [MONSTER_SPRITES['mouse over_active']]: {
      y: 6,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    },
    [MONSTER_SPRITES['getting hit']]: {
      y: 7,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['defend']]: {
      y: 8,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    },
    [MONSTER_SPRITES['death']]: {
      y: 9,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['turn left']]: {
      y: 10,
      x: [0, 1, 2],
    },
    [MONSTER_SPRITES['turn right']]: {
      y: 11,
      x: [0, 1, 2],
    },
    [MONSTER_SPRITES['attack up']]: {
      y: 12,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['attack straight']]: {
      y: 13,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['attack down']]: {
      y: 14,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['shoot up']]: {
      y: 15,
      x: [],
    },
    [MONSTER_SPRITES['shoot straight']]: {
      y: 16,
      x: [],
    },
    [MONSTER_SPRITES['shoot down']]: {
      y: 17,
      x: [],
    },
  },
  [TEXTURES['CWRAIT']]: {
    [MONSTER_SPRITES['moving']]: {
      y: 0,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['start moving']]: {
      y: 1,
      x: [0],
    },
    [MONSTER_SPRITES['stop moving']]: {
      y: 2,
      x: [0],
    },
    [MONSTER_SPRITES['standing']]: {
      y: 3,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['standing_active']]: {
      y: 4,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['mouse over']]: {
      y: 5,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    [MONSTER_SPRITES['mouse over_active']]: {
      y: 6,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    [MONSTER_SPRITES['getting hit']]: {
      y: 7,
      x: [0, 1, 2, 3, 4, 5],
    },
    [MONSTER_SPRITES['defend']]: {
      y: 8,
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    [MONSTER_SPRITES['death']]: {
      y: 9,
      x: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    [MONSTER_SPRITES['turn left']]: {
      y: 10,
      x: [0, 1],
    },
    [MONSTER_SPRITES['turn right']]: {
      y: 11,
      x: [0, 1],
    },
    [MONSTER_SPRITES['attack up']]: {
      y: 12,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['attack straight']]: {
      y: 13,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['attack down']]: {
      y: 14,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['shoot up']]: {
      y: 15,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['shoot straight']]: {
      y: 16,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
    [MONSTER_SPRITES['shoot down']]: {
      y: 17,
      x: [0, 1, 2, 3, 4, 5, 6],
    },
  },
};

const monsterDir = '/src/assets/monsters';

export const monsterTextures: TextureMap<MONSTER_SPRITES> = slowFrames(
  {
    [TEXTURES.CBKNIG]: {
      url: `${monsterDir}/CNOSFE.webp`,
      width: 220,
      height: 180,
      textures: frames[TEXTURES['CBKNIG']]!,
    },

    [TEXTURES.CWRAIT]: {
      url: '/src/assets/CWRAIT.webp',
      width: 220,
      height: 180,
      textures: frames[TEXTURES['CWRAIT']]!,
    },

    [TEXTURES.wraith_mirror]: {
      url: '/src/assets/CWRAIT.webp',
      width: 110,
      height: 120,
      textures: mirrorFrames(frames[TEXTURES['CWRAIT']]!),
    },
  },
  6
);
