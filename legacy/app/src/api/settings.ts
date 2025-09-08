import axios from 'axios';
import type { HeroClassesResponse, HeroesResponse } from '@/types/heroes';
import type { BattlefieldsResponse } from './types';
import config from '@/config';

export async function fetchHeroes(): Promise<HeroesResponse> {
  const response = await axios.get<HeroesResponse>(`${config.settingsPath}/heroes.json`);
  return response.data;
}

export async function fetchHeroClasses(): Promise<HeroClassesResponse> {
  const response = await axios.get<HeroClassesResponse>(`${config.settingsPath}/hero_classes.json`);
  return response.data;
}

export async function fetchBattlefields(): Promise<BattlefieldsResponse> {
  const response = await axios.get<BattlefieldsResponse>(
    `${config.settingsPath}/battlefields.json`,
  );
  return response.data;
}
