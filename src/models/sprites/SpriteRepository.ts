import Sprite from './Sprite';

class SpriteRepository {
  private repository: Map<string, Sprite> = new Map();

  constructor() {}

  public register(key: string, instance: Sprite) {
    if (this.repository.has(key)) return;
    this.repository.set(key, instance);
  }

  public get(key: string): Sprite | undefined {
    return this.repository.get(key);
  }
}

export default SpriteRepository;
