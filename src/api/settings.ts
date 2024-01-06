import axios from 'axios';
import type { HeroClassesResponse, HeroesResponse } from '@/types/heroes';

export async function fetchHeroes(): Promise<HeroesResponse> {
  const response = await axios.get<HeroesResponse>('/public/settings/heroes.json');
  return response.data;
}

export async function fetchHeroClasses(): Promise<HeroClassesResponse> {
  const response = await axios.get<HeroClassesResponse>('/public/settings/hero_classes.json');
  return response.data;
}

export async function fetchBattlefields(): Promise<BattlefieldsResponse> {
  const response = await axios.get<BattlefieldsResponse>('/public/settings/battlefields.json');
  return response.data;
}
