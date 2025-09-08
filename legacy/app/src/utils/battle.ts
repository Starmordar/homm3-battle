import Battle from '@/controllers/Battle';

export function isWaitDisabled(battle: Battle) {
  const activeMonster = battle.model.activeUnit.model;
  if (!activeMonster.controllable) return true;

  return activeMonster.hadTurn;
}
