import Sprite from '@/view/sprites/Sprite';

class SpriteRepository {
  private repository: Map<string, Sprite> = new Map();

  constructor() {}

  public register(key: string, instance: Sprite) {
    if (this.repository.has(key)) return;
    this.repository.set(key, instance);
  }

  public get<T extends Sprite>(key: string): T {
    const sprite = this.repository.get(key) as T;
    if (!sprite) throw Error(`Invalid sprite key: ${key}`);

    return sprite;
  }
}

export default SpriteRepository;
