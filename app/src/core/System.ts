import type { Engine } from './Engine';

abstract class System {
  public abstract addToEngine(engine: Engine): void;
  public abstract removeFromEngine(engine: Engine): void;
  public abstract update(): void;
}

export { System };
