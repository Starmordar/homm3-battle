abstract class System {
  public abstract addToEngine?(): void;
  public abstract removeFromEngine?(): void;
  public abstract update(): void;
}

export { System };
