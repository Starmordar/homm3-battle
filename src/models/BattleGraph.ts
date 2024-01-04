import { battleGridSize, battleLayout } from '@/constants/hex';
import { Hexagon, Layout, Point } from './grid';
import { getAngle, getHexReachables, getLayoutHexes, isPointInsideHex } from '@/utils/grid';

class BattleGraph {
  private readonly layout: Layout;
  private readonly terrainObstacles: Array<Hexagon>;

  public hexes: Array<Hexagon>;
  public hexCornersMap: Map<Hexagon, Array<Point>>;

  public hexReachables: Array<Hexagon> = [];
  public hexPathMap: Map<string, Hexagon | null> = new Map();

  constructor(obstacles: Array<Hexagon>) {
    this.layout = battleLayout;
    this.hexes = getLayoutHexes(battleGridSize);
    this.hexCornersMap = this.getHexCornersMap();

    this.terrainObstacles = obstacles;
  }

  public computeHexReachables(position: Hexagon, unitObstacles: Array<Hexagon>, range: number) {
    const obstacles = [...this.terrainObstacles, ...unitObstacles];
    const { fringes, path } = getHexReachables(position, obstacles, range);

    this.hexReachables = fringes;
    this.hexPathMap = path;
  }

  public resetHexReachables() {
    this.hexReachables = [];
    this.hexPathMap = new Map();
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

  public getPath(startPosition: Hexagon, endPosition: Hexagon) {
    const path = [endPosition];
    let tempPosition = endPosition;

    while (!Hexagon.isEqual(tempPosition, startPosition)) {
      tempPosition = this.hexPathMap.get(tempPosition.toString())!;
      path.push(tempPosition);
    }

    return path.reverse();
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
