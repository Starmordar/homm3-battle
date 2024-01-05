import { SPRITE } from '../sprites';
import { monsterBgSpriteByRace, monsterSpriteById } from '@/utils/textures';

import { Markup, MarkupType } from './types';
import type BattleMonsterModel from '@/models/BattleMonsterModel';

const monsterPopupMarkup: Markup<BattleMonsterModel> = {
  background: { sprite: SPRITE.monster_window, width: 350, height: 360 },
  textOptions: { font: '15px Crimson Pro', fillStyle: 'white', textBaseline: 'bottom' },

  children: [
    {
      type: MarkupType.text,
      options: {
        left: 175,
        top: 43,
        align: 'center',
        text: ({ data }: BattleMonsterModel) => `${data.type}`,
      },
    },
    {
      type: MarkupType.sprite,
      options: {
        left: 23,
        top: 55,
        width: 118,
        height: 152,
        sprite: ({ data }: BattleMonsterModel) => monsterBgSpriteByRace(data.race),
      },
    },
    {
      type: MarkupType.sprite,
      options: {
        left: 30,
        top: 80,
        width: 110,
        height: 120,
        sprite: ({ data }: BattleMonsterModel) => monsterSpriteById(data.id),
      },
    },
    {
      type: MarkupType.group,
      options: { left: 180, top: 72, width: 140 },
      children: [
        {
          type: MarkupType.group,
          options: { top: 72 },
          children: [
            {
              type: MarkupType.text,
              options: { align: 'left', text: 'Attack Skill' },
            },
            {
              type: MarkupType.text,
              options: {
                align: 'right',
                text: ({ data, attack }: BattleMonsterModel) => `${data.damage.attack} (${attack})`,
              },
            },
          ],
        },
        {
          type: MarkupType.group,
          options: { top: 93.5 },
          children: [
            {
              type: MarkupType.text,
              options: { align: 'left', text: 'Defense Skill' },
            },
            {
              type: MarkupType.text,
              options: {
                align: 'right',
                text: ({ data, defense }: BattleMonsterModel) =>
                  `${data.damage.defense} (${defense})`,
              },
            },
          ],
        },
        {
          type: MarkupType.group,
          options: { top: 115 },
          children: [
            {
              type: MarkupType.text,
              options: { align: 'left', text: 'Shots' },
            },
            {
              type: MarkupType.text,
              options: {
                align: 'right',
                text: ({ data }: BattleMonsterModel) => `${data.damage.shots}`,
              },
            },
          ],
        },
        {
          type: MarkupType.group,
          options: { top: 136.5 },
          children: [
            {
              type: MarkupType.text,
              options: { align: 'left', text: 'Damage' },
            },
            {
              type: MarkupType.text,
              options: {
                align: 'right',
                text: ({ data }: BattleMonsterModel) => `${data.damage.melee.join(' - ')}`,
              },
            },
          ],
        },
        {
          type: MarkupType.group,
          options: { top: 158 },
          children: [
            {
              type: MarkupType.text,
              options: { align: 'left', text: 'Health' },
            },
            {
              type: MarkupType.text,
              options: {
                align: 'right',
                text: ({ data }: BattleMonsterModel) => `${data.damage.hitPoints}`,
              },
            },
          ],
        },
        {
          type: MarkupType.group,
          options: { top: 180 },
          children: [
            {
              type: MarkupType.text,
              options: { align: 'left', text: 'Health Left' },
            },
            {
              type: MarkupType.text,
              options: {
                align: 'right',
                text: ({ lastUnitHealth }: BattleMonsterModel) => `${lastUnitHealth}`,
              },
            },
          ],
        },
        {
          type: MarkupType.group,
          options: { top: 202 },
          children: [
            {
              type: MarkupType.text,
              options: { align: 'left', text: 'Speed' },
            },
            {
              type: MarkupType.text,
              options: {
                align: 'right',
                text: ({ data }: BattleMonsterModel) => `${data.damage.speed}`,
              },
            },
          ],
        },
      ],
    },
    {
      type: MarkupType.text,
      options: {
        left: 25,
        top: 287,
        align: 'left',
        text: ({ data }: BattleMonsterModel) => `${data.abilityText}`,
      },
    },
  ],
};

export { monsterPopupMarkup };
