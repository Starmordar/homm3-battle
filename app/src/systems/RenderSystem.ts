import { AnimatedPositionNode } from '@/nodes/AnimatedPositionNode';

import type { System } from '../core/System';
import type { Engine } from '@/core/Engine';
import type { Entity } from '@/core/Entity';
import type { Container } from 'pixi.js';

class RenderSystem implements System {
  container: Container;
  entities: Entity[] = [];

  private nodes: AnimatedPositionNode[] = [];

  constructor(container: Container) {
    this.container = container;
  }

  public addToEngine(engine: Engine): void {
    const nodeList = engine.getNodeList(AnimatedPositionNode);

    for (const node of nodeList.nodes) {
      this.addToDisplay(node as AnimatedPositionNode);
    }

    nodeList.nodeAdded = this.addToDisplay.bind(this);
    this.nodes = nodeList.nodes;
  }

  public update() {
    for (const node of this.nodes) {
      console.log('node :>> ', node);
      const position = node.position;
      const animation = node.animation;

      // console.log('position, animation :>> ', position, animation);

      if (!position || !animation) continue;

      animation.animatedSprite.x = position.position.x;
      animation.animatedSprite.y = position.position.y;
      animation.animatedSprite.animationSpeed = 0.1;

      if (animation.animatedSprite.playing) continue;
      animation.animatedSprite.play();
    }
  }

  public removeFromEngine(): void {
    this.nodes = [];
  }

  private addToDisplay(node: AnimatedPositionNode) {
    const animation = node.animation;
    if (!animation) return;

    console.log('added');

    this.container.addChild(animation.animatedSprite);
  }
}

export { RenderSystem };
