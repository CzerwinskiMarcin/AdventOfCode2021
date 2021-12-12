import { Vector } from "./vector.model";
import { Coordinates } from "../interfaces/coordinates.interface";

type MapEntity<T> = {
    position: Vector,
    item: T
}

export class EnhancedMap<T> {
    private map: Array<Array<MapEntity<T>>>;
    private sizes: Vector;

    initializeMap(data: Array<Array<T>>, convertFn: (t: T, row: number, col: number) => MapEntity<T> = this.defaultInputInitializationFn): void {
        const rowSize = data.length;
        let columnSize = 0;

        this.map = data.map((row: Array<T>, rowIndex: number) => {
            if (rowIndex === 0) {
                columnSize = row.length;
            }

            return row.map((cell: T, colIndex: number) => {
                return convertFn(cell, rowIndex, colIndex);
            });
        });

        this.sizes = new Vector(columnSize, rowSize);
    }

    getItemAdjacentItems(item: T, includeDiagonal: boolean = true): Array<T> {
        const [col, row] = this.getItemPosition(item).getCoordinates();
        return this.getAdjacentElements(row, col, includeDiagonal)
            .map(entity => entity.item);
    }

    getItemPosition(item: T): Vector {
        const foundItem = this.map.flat().find(e => e.item === item);

        if (!foundItem) {
            throw new Error(`There is no item as ${item}`);
        }

        return foundItem.position;
    }

    private getAdjacentElements(row: number, col: number, includeDiagonal: boolean = true): Array<MapEntity<T>> {
        const validatedVector = this.validCoordinates(row, col);
        const adjacentVectors = this.getAdjacentCoordinates(validatedVector, includeDiagonal);

        return adjacentVectors.map(v => this.getItemAtPosition(v))
    }

    private getAdjacentCoordinates(target: Vector, includeDiagonal: boolean = true): Array<Vector> {
        const [row, col] = target.getCoordinates();
        const minY = col - 1 > 0 ? col - 1 : 0;
        const maxY = col + 1 < this.sizes.getX() - 1 ? col + 1 : this.sizes.getX() - 1;
        const minX = row - 1 > 0 ? row - 1 : 0;
        const maxX = row + 1 < this.sizes.getY() - 1 ? row + 1 : this.sizes.getY() - 1;
        const xSpread = new Array(Math.abs(maxX - minX) + 1).fill(0).map((_: number, i: number) => minX + i);
        const ySpread = new Array(Math.abs(maxY - minY) + 1).fill(0).map((_: number, i: number) => minY + i);

        return ySpread.map(rowIndex => {
            return xSpread
                .map(colIndex => new Vector(colIndex, rowIndex))
                .filter(v => !target.isTheSamePosition(v))
                .filter(v => includeDiagonal ? true : !this.isPointDiagonalTo(target, v))
        }).flat();
    }

    private isPointDiagonalTo(source: Vector, target: Vector): boolean {

        return source.isVerticallyAligned(target) || source.isHorizontallyAligned(target);
    }

    getItemAtPosition(position: Vector): MapEntity<T> {
        const [col, row] = position.getCoordinates();
        this.validCoordinates(row, col);
        return this.map[row][col];
    }



    printMap(markPoints: Array<Vector> = [], extractFn: (t: T) => string | number = this.defaultExtractDataFn): void {
            let striMap = '';
            this.map.forEach((row: Array<MapEntity<T>>, rowIndex: number) => {
                row.forEach((col: MapEntity<T>, colIndex: number) => {
                    const color = markPoints.some(p => p.isInPoint(colIndex, rowIndex)) ? '\x1b[1;33m' : '\x1b[0m';
                    striMap += `${color}${extractFn(this.map[rowIndex][colIndex].item)}\x1b[0m`
                })

                striMap += '\n';
            })
            console.log(striMap);
    }

    private validCoordinates(row: number, col: number): Vector {
        if (!this.map[row]) {
            throw new Error(`Cannot get element from row ${row}. Max row: ${this.map.length - 1}`);
        }

        if (!this.map[row][col]) {
            throw new Error(`Cannot get element from col ${col}. Max col: ${this.map[row].length - 1}`);
        }

        return new Vector(col, row);
    }

    private defaultInputInitializationFn(t: T, row: number, col: number): MapEntity<T>{
        return {
            position: new Vector(col, row),
            item: t
        }
    }

    private defaultExtractDataFn(t: T): string | number {
        return JSON.stringify(t);
    }
}
