import type { AnimatedSprite } from 'pixi.js';

class AnimationComponent {
  animatedSprite: AnimatedSprite;

  constructor(animatedSprite: AnimatedSprite) {
    this.animatedSprite = animatedSprite;
  }
}

export { AnimationComponent };
