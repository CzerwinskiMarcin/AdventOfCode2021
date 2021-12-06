import { Vector } from "./vector.model";

export class Line {
    constructor(private firstPoint: Vector, private secondPoint: Vector) {}

    getLineVector(): Vector {
        return this.firstPoint.getDifference(this.secondPoint);
    }

    getPathPoints(): Array<Vector> {
        return this.calculatePathPoints();
    }

    isHorOrVerLine(): boolean {
        const [xDiff, yDiff] = this.firstPoint.getDifference(this.secondPoint).getCoordinates();
        return !xDiff || !yDiff;
    }

    calculatePathPoints(): Array<Vector> {
        const points: Array<Vector> = [this.firstPoint];
        let lastPoint: Vector = this.firstPoint;
        let [xDiff, yDiff] = this.secondPoint.getDifference(this.firstPoint).getCoordinates();

        while (xDiff || yDiff) {
             const movement: [number, number] = [0, 0];

             if (xDiff) {
                 movement[0] = xDiff > 0 ? 1 : -1;
                 xDiff -= movement[0];
             }

             if (yDiff) {
                 movement[1] = yDiff > 0 ? 1 : -1;
                 yDiff -= movement[1];
             }

             const movementVector = new Vector(...movement);
             const newPoint = lastPoint.copy().add(movementVector);

            lastPoint = newPoint;
             points.push(newPoint);
        }

        return points;
    }


    private static getVerticalPoints(): Array<Vector> {
        return [];
    }


    private static getHorizontalPoints(): Array<Vector> {
        return [];
    }
}
