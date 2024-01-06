import { randomValueOf } from '@/utils/common';

import type { DataSettings } from '@/types';
import type { BattlefieldSettings } from '@/types/battlefields';

class GlobalSettings {
  battlefield: BattlefieldSettings | null = null;

  constructor() {}

  addBattlefield(settings: DataSettings) {
    const battlefield = randomValueOf<BattlefieldSettings>(settings.battleFields);
    this.battlefield = battlefield;
  }
}

export const globalSettings = new GlobalSettings();
export default GlobalSettings;
