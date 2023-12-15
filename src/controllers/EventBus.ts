type EventHandler = (payload: any) => void;
type Bus = Record<string, EventHandler[]>;

export enum EventKey {
  hoverHex = 'hoverHex',
  clickHex = 'clickHex',

  refreshCanvas = 'refreshCanvas',
  unitWait = 'unitWait',
  unitDefense = 'skipTurn',
}

class EventBus {
  private eventBus: Bus = {};

  public on(key: string, handler: EventHandler) {
    if (!this.eventBus[key]) this.eventBus[key] = [];
    this.eventBus[key].push(handler);
  }

  public once(key: string, handler: EventHandler) {
    const handleOnce = (payload: Parameters<typeof handler>) => {
      handler(payload);
      this.off(key, handleOnce);
    };

    this.on(key, handleOnce);
  }

  public off(key: string, handler: EventHandler) {
    const handlerIndex = this.eventBus[key].indexOf(handler);
    if (handlerIndex > -1) this.eventBus[key].splice(handlerIndex, 1);
  }

  public emit(key: string, payload?: any) {
    this.eventBus[key].forEach((handler) => handler(payload));
  }
}

export const eventBus = new EventBus();
export default EventBus;
