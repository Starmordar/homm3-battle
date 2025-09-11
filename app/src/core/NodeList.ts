import type { Entity } from './Entity';
import type { Node } from './Node';

class NodeList<NodeType extends Node> {
  public nodes: NodeType[] = [];

  public nodeAdded: (node: NodeType) => void;
  public nodeRemoved: (node: NodeType) => void;

  add(node: NodeType) {
    this.nodes.push(node);
    this.nodeAdded?.(node);
  }

  removeByEntity(entity: Entity) {
    let deletedNode: NodeType | null = null;

    const nodes = this.nodes.filter((node) => {
      const isEqual = node.entity === entity;
      if (isEqual) deletedNode = node;
      return !isEqual;
    });

    this.nodes = nodes;
    this.nodeRemoved?.(deletedNode!);
  }
}

export { NodeList };
