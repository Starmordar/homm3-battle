import { StaticTexture } from '@/constants/textures/types';
import Sprite from '@/view/sprites/Sprite';

class SpriteRepository {
  private repository: Map<string, Sprite<StaticTexture>> = new Map();

  constructor() {}

  public register(key: string, instance: Sprite<StaticTexture>) {
    if (this.repository.has(key)) return;
    this.repository.set(key, instance);
  }

  public get<T extends Sprite<StaticTexture>>(key: string): T {
    const sprite = this.repository.get(key) as T;
    if (!sprite) throw Error(`Invalid sprite key: ${key}`);

    return sprite;
  }
}

export const Textures = new SpriteRepository();
export default SpriteRepository;
