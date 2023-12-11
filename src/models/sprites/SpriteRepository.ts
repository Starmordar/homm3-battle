import Sprite from './Sprite';

class SpriteRepository {
  private repository: Map<string, Sprite> = new Map();

  constructor() {}

  public register(key: string, instance: Sprite) {
    if (this.repository.has(key)) return;
    this.repository.set(key, instance);
  }

  public get<T extends Sprite>(key: string): T {
    return this.repository.get(key) as T;
  }
}

export default SpriteRepository;
