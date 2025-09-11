import type { Node } from './Node';

class NodeList<NodeType extends Node> {
  public nodes: NodeType[] = [];

  public nodeAdded: (node: NodeType) => void;
  public nodeRemoved: (node: NodeType) => void;

  add(node: NodeType) {
    this.nodes.push(node);
    if (this.nodeAdded) this.nodeAdded(node);
  }
}

export { NodeList };
