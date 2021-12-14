import { Vector } from "../../shared/models";
import { EnhancedMap } from "../../shared/models/map.model";

type FoldInstruction = {
    axis: 'x' | 'y';
    position: number
}

interface ManualPoint {
    position: Vector,
    mark: string
}

export class OrigamiFolder {
    private markedPoints: Array<Vector>;
    private folds: Array<FoldInstruction>;
    private instructionMap: EnhancedMap<ManualPoint>;

    constructor(rawData: Array<string>) {
        const {points, folds} = this.convertData(rawData);
        this.markedPoints = points;
        this.folds = folds;
    }

    countPointsWithoutDuplicatesAfterNumberOfFolds(foldNumber: number): number {
        this.run(foldNumber);
        return this.countPointsWithoutDuplicates();
    }

    printAfterFolds(): void {
        this.run();
        this.prepareMap();
        this.printMap();
    }

    private run(foldsNumber?: number): void {
        this.makeFolds(foldsNumber);
    }

    private prepareMap(): void {
        const allPoints = this.generateMap();
        this.instructionMap = new EnhancedMap<ManualPoint>();
        this.instructionMap.initializeMap(allPoints);
    }

    private printMap(): void {
        this.instructionMap.printMap([], p => p.mark);
    }

    private convertData(rawData: Array<string>): { points: Array<Vector>, folds: Array<FoldInstruction> } {
        const extractedPoints = rawData
            .filter(d => /\d+,\d+/.test(d))
            .map(d => {
                    const [x, y] = d.split(',')
                        .map(v => +v)
                    return new Vector(x, y);
                }
            );

        const extractedFolds: Array<FoldInstruction> = rawData
            .filter(d => /fold along/.test(d))
            .map(d => d.replace('fold along ', ''))
            .map(d => {
                const [axis, value] = d.split('=');

                if (axis !== 'x' && axis !== 'y') {
                    throw new Error(`Unconverted axis found: ${axis}`);
                }

                return {
                    axis,
                    position: +value
                };
            });

        return {
            points: extractedPoints,
            folds: extractedFolds
        };
    }

    private getMaxX(): number {
        return Math.max(...(this.markedPoints.map(v => v.getX())));
    }

    private getMaxY(): number {
        return Math.max(...(this.markedPoints.map(v => v.getY())));
    }

    private generateMap(): Array<Array<ManualPoint>> {
        const maxX = this.getMaxX();
        const maxY = this.getMaxY();

        const points = [];

        for (let y = 0; y <= maxY; y++) {
            const row = [];

            for (let x = 0; x <= maxX; x++) {
                row.push(new Vector(x, y));
            }
            points[y] = row;
        }

        return this.prepareManualPoints(points);
    }

    private prepareManualPoints(points: Array<Array<Vector>>): Array<Array<ManualPoint>> {
        return points.map(row => row.map(p => ({position: p, mark: this.getPositionMark(p)})));
    }

    private getPositionMark(p: Vector): '.' | '#' {
        return this.markedPoints.some(mp => mp.isTheSamePosition(p)) ? '#' : '.';
    }

    private makeFolds(foldsNumber: number = this.folds.length ): void {
        while(foldsNumber) {
            const fold: FoldInstruction = this.folds.shift();
            this.fold(fold);
            foldsNumber--;
        }
    }

    private fold(fold: FoldInstruction): void {
        switch (fold.axis) {
            case 'x':
                this.foldAlongX(fold.position);
                break;
            case 'y':
                this.foldAlongY(fold.position);
                break;
        }
    }

    private foldAlongY(axisIndex: number): void {
        this.markedPoints = this.markedPoints
            .map( p => {
                if (p.getY() <= axisIndex) return p;

                const diffY = axisIndex - p.getY();
                const moveVector = new Vector(0, 2 * diffY);
                return p.add(moveVector);
            });
    }

    private foldAlongX(axisIndex: number): void {
        this.markedPoints = this.markedPoints
            .map( p => {
                if (p.getX() <= axisIndex) return p;

                const diffY = axisIndex - p.getX();
                const moveVector = new Vector(2 * diffY, 0);
                return p.add(moveVector);
            });
    }

    countPointsWithoutDuplicates(): number {
        const uniquePoints: Array<Vector> = [];
        for (let i = 0; i < this.markedPoints.length; i++) {
            const markedPoint = this.markedPoints[i];
            const pointAlreadyExists = uniquePoints.some(p => p.isTheSamePosition(markedPoint));

            if (!pointAlreadyExists) {
                uniquePoints.push(markedPoint);
            }
        }

        return uniquePoints.length;
    }
}
