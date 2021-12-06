import { MapPoint } from "../map-point.interface";

export class Map {
    private points: Array<Array<MapPoint>>;

    constructor() {
        this.points = []
    }

    getMap(): Array<Array<MapPoint>> {
        return this.points;
    }

    markPoint(coordinates: [number, number]): void {
        this.getOrCreateMapPoint(coordinates).count += 1;
    }

    getPointsCountsMoreThan(countsTarget: number): Array<MapPoint> {
        return this.points
            .flat()
            .filter(({count}) => count > countsTarget);
    }

    private getOrCreateMapPoint([x, y]: [number, number]): MapPoint {
        const mapRow = this.getOrCreateMapRow(x);

        if (!mapRow[y]) {
            mapRow[y] = {count: 0};
        }

        return mapRow[y];
    }

    private getOrCreateMapRow(row: number): Array<MapPoint> {
        const mapRow = this.points[row];

        if (!mapRow) {
            this.points[row] = [];
        }
        return this.points[row];
    }

}
