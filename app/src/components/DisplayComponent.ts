import type { DisplayObject } from '@/types';

class DisplayComponent {
  displayObject: DisplayObject;

  constructor(displayObject: DisplayObject) {
    this.displayObject = displayObject;
  }
}

export { DisplayComponent };
