import { Vector } from "../../shared/models";

interface HeightPoint {
    position: Vector,
    height: number,
    isLowPoint: boolean
}

enum BasinMoveDirection {
    Up = 1,
    Down = -1
}

export class HeightMapSystem {
    private heightMap: Array<Array<HeightPoint>>;
    private mapSizes: Vector;

    constructor(inputData: Array<Array<number>>) {
        this.heightMap = this.convertInputData(inputData);
        this.mapSizes = new Vector(this.heightMap[0].length, this.heightMap.length);
        this.determineLowPoints();
    }

    private convertInputData(inputData: Array<Array<number>>): Array<Array<HeightPoint>> {
        return inputData.map((row: Array<number>, rowIndex: number) => {
            return row.map((height: number, colIndex: number) => {
                return {
                    position: new Vector(colIndex, rowIndex),
                    height: height,
                    isLowPoint: false
                } as HeightPoint;
            });
        });
    }

    private determineLowPoints(): void {
        this.heightMap.forEach((row: Array<HeightPoint>, rowIndex: number) => {
            row.forEach((col: HeightPoint, colIndex: number) => {
                const adjacentHeightPoints = this.getAdjacentHeightPoints(rowIndex, colIndex)

                if (this.isLowRegion(col, adjacentHeightPoints)) {
                    col.isLowPoint = true;
                }
            })
        })
    }

    private printMap(markPoints: Array<HeightPoint> = []): void {
        let striMap = '';
        this.heightMap.forEach((row: Array<HeightPoint>, rowIndex: number) => {
            row.forEach((col: HeightPoint, colIndex: number) => {
                const color = markPoints.some(p => p.position.isInPoint(colIndex, rowIndex)) ? '\x1b[1;33m' : '\x1b[0m';
                striMap += `${color}${this.heightMap[rowIndex][colIndex].height}\x1b[0m`
            })

            striMap += '\n';
        })
        console.log(striMap);
        console.log('\n');
    }

    private getAdjacentHeightPoints(row: number, col: number): Array<HeightPoint> {
        const minY = col - 1 > 0 ? col - 1 : 0;
        const maxY = col + 1 < this.mapSizes.getX() - 1 ? col + 1 : this.mapSizes.getX() - 1;
        const minX = row - 1 > 0 ? row - 1 : 0;
        const maxX = row + 1 < this.mapSizes.getY() - 1 ? row + 1 : this.mapSizes.getY() - 1;
        const xSpread = new Array(Math.abs(maxX - minX) + 1).fill(0).map((_: number, i: number) => minX + i);
        const ySpread = new Array(Math.abs(maxY - minY) + 1).fill(0).map((_: number, i: number) => minY + i);

        return ySpread.map(colIndex => {
            return xSpread
                .filter(rowIndex => {
                    const isTheSamePoint = colIndex === col && rowIndex === row
                    const isVerticalOnly = (colIndex === col && rowIndex !== row);
                    const isHorizontalOnly = (colIndex !== col && rowIndex === row);
                    return !isTheSamePoint && (isVerticalOnly || isHorizontalOnly);
                })
                .map(rowIndex => this.heightMap[rowIndex][colIndex])
        }).flat();
    }

    private isLowRegion(point: HeightPoint, adjacentPoints: Array<HeightPoint>): boolean {
        const minHeight = Math.min(...adjacentPoints.map(({height}) => height));

        return point.height < minHeight;
    }

    private getLowRegions(): Array<HeightPoint> {
        return this.heightMap.map((row: Array<HeightPoint>) => {
            return row
                .filter((point: HeightPoint) => point.isLowPoint)
        }).flat();
    }

    getRiskLevels(): Array<number> {
        return this.getLowRegions()
            .map(({height}) => height + 1);
    }

    getBasinForPoint(point: HeightPoint): Array<HeightPoint> {
        const numberOfAdjacentHigherPoints = this.getAdjacentHeightPoints(point.position.getY(), point.position.getX())
            .filter(p => p.height > point.height && p.height < 9)
            .map(p => this.getBasinForPoint(p))

        return [point, ...numberOfAdjacentHigherPoints].flat();
    }

    filterOutDuplicatedHeightPoints(points: Array<HeightPoint>): Array<HeightPoint> {
        return points.filter((point: HeightPoint, index: number, points: Array<HeightPoint>) => {
            const [xCoord, yCoord] = point.position.getCoordinates();
            return index === points.findIndex(p => {
                const [pXCoord, pYCoord] = p.position.getCoordinates();
                return xCoord === pXCoord && yCoord === pYCoord;
            });
        });
    }

    getLargestBasinsSizes(numberOfBasins: number, printMaps: boolean = false): Array<number> {
        const rawBasins: Array<Array<HeightPoint>> = this.getLowRegions()
            .map(lowRegion => this.getBasinForPoint(lowRegion))
            .sort((a: Array<HeightPoint>, b: Array<HeightPoint>) => b.length - a.length);

        const uniqueBasins: Array<Array<HeightPoint>> = rawBasins.map(basin => this.filterOutDuplicatedHeightPoints(basin))
            .sort((a: Array<HeightPoint>, b: Array<HeightPoint>) => b.length - a.length);

        if (printMaps) {
            uniqueBasins.forEach(this.printMap.bind(this));
        }

        return uniqueBasins
            .map((b: Array<HeightPoint>) => b.length)
            .filter((b: number, index: number) => index < numberOfBasins)
    }
}
