import { battleGridSize } from '@/constants/hex';
import { Hexagon, Layout, Point } from './grid';
import { getAngle, getHexReachables, getLayoutHexes, isPointInsideHex } from '@/utils/grid';

class BattleGraph {
  private readonly layout: Layout;
  private readonly terrainObstacles: Array<Hexagon>;

  public hexes: Array<Hexagon>;
  public hexCornersMap: Map<Hexagon, Array<Point>>;
  public hexReachables: Array<Hexagon> = [];

  constructor(layout: Layout, obstacles: Array<Hexagon>) {
    this.layout = layout;
    this.hexes = getLayoutHexes(battleGridSize);
    this.hexCornersMap = this.getHexCornersMap();

    this.terrainObstacles = obstacles;
  }

  public computeHexReachables(position: Hexagon, unitObstacles: Array<Hexagon>, range: number) {
    const obstacles = [...this.terrainObstacles, ...unitObstacles];
    this.hexReachables = getHexReachables(position, obstacles, range);
  }

  public isPositionReachable(position: Hexagon): boolean {
    return this.hexReachables.some((hex) => Hexagon.isEqual(position, hex));
  }

  public hexAngleUnderPoint(hexagon: Hexagon, point: Point): number {
    const corners = this.layout.hexToCorners(hexagon);
    const angle = getAngle(point, corners, this.layout.hexToPixel(hexagon));

    const neighbor = hexagon.neighbor(angle);
    return this.isPositionReachable(neighbor) ? angle : -1;
  }

  public hexUnderPoint(point: Point): Hexagon | undefined {
    return this.hexes.find((hex) => isPointInsideHex(point, this.layout.hexToCorners(hex)));
  }

  public reachableHexUnderPoint(point: Point): Hexagon | undefined {
    return this.hexReachables.find((hex) => isPointInsideHex(point, this.layout.hexToCorners(hex)));
  }

  private getHexCornersMap(): Map<Hexagon, Array<Point>> {
    const map = new Map();

    this.hexes.forEach((hex) => {
      map.set(hex, this.layout.hexToCorners(hex));
    });

    return map;
  }
}

export default BattleGraph;
