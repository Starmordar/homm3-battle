import type { Node } from './Node';

class NodeList {
  public nodes: Node[] = [];

  public nodeAdded: (node: Node) => void;
  public nodeRemoved: (node: Node) => void;

  add(node: Node) {
    this.nodes.push(node);
    if (this.nodeAdded) this.nodeAdded(node);
  }
}

export { NodeList };
