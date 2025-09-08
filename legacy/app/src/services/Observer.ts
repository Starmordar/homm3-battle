interface Observer {
  update(payload: any): void;
}

class Subject {
  public observers: Set<Observer>;

  constructor() {
    this.observers = new Set();
  }

  public addObserver(observer: Observer) {
    this.observers.add(observer);
  }

  public removeObserver(observer: Observer) {
    this.observers.delete(observer);
  }

  public notify(payload?: any) {
    for (const observer of this.observers) {
      observer.update(payload);
    }
  }
}

export type { Observer };
export default Subject;
