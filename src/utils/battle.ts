import Battle from '@/models/battle/Battle';

export function isWaitDisabled(battle: Battle) {
  const activeMonster = battle.activeUnit.model;
  if (!activeMonster.controllable) return true;

  return activeMonster.hadTurn;
}
