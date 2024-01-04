import { SPRITE } from '../sprites';
import type { Monster } from '../monsters';
import { Markup, MarkupType } from './types';
import { monsterBgSpriteByRace, monsterSpriteById } from '@/utils/textures';

const monsterPopupMarkup: Markup<Monster> = {
  background: { sprite: SPRITE.monster_window, width: 350, height: 360 },
  textOptions: { font: '15px Crimson Pro', fillStyle: 'white', textBaseline: 'bottom' },

  children: [
    {
      type: MarkupType.text,
      options: {
        left: 175,
        top: 43,
        align: 'center',
        text: (data: Monster) => `${data.type}`,
      },
    },
    {
      type: MarkupType.sprite,
      options: {
        left: 23,
        top: 55,
        width: 118,
        height: 152,
        sprite: (data: Monster) => monsterBgSpriteByRace(data.race),
      },
    },
    {
      type: MarkupType.sprite,
      options: {
        left: 30,
        top: 80,
        width: 110,
        height: 120,
        sprite: (data: Monster) => monsterSpriteById(data.id),
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
              options: { align: 'right', text: (data: Monster) => `${data.damage.attack}` },
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
              options: { align: 'right', text: (data: Monster) => `${data.damage.defense}` },
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
              options: { align: 'right', text: (data: Monster) => `${data.damage.shots}` },
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
                text: (data: Monster) => `${data.damage.melee.join(' - ')}`,
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
              options: { align: 'right', text: (data: Monster) => `${data.damage.hitPoints}` },
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
              options: { align: 'right', text: (data: Monster) => `${data.damage.hitPoints}` },
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
              options: { align: 'right', text: (data: Monster) => `${data.damage.speed}` },
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
        text: (data: Monster) => `${data.abilityText}`,
      },
    },
  ],
};

export { monsterPopupMarkup };
