import type { Entity } from './Entity';

class Node {
  public entity: Entity;
}

type NodeType = Node & Record<string, unknown>;

export type { NodeType };
export { Node };
