import { BoardConfig } from "../interfaces/board-data.interface";

interface Field {
    value: number,
    marked: boolean,
}

export class BingoBoard {
    private fields: Array<Array<Field>> = []
    private size: number;

    constructor(config: BoardConfig) {
        this.size = config.size;

        config.boardFields.forEach((row: Array<number>, xIndex: number) => {
            this.fields.push([]);

            row.forEach(point => this.fields[xIndex].push(this.initializeField(point)));
        });
    }

    private initializeField(value: number): Field {
        return {
            value,
            marked: false
        }
    }

    markPoint(value: number): void {
        this.fields.forEach(row => {
            const field = row.find(field => field.value === value)

            if (field) {
                field.marked = true;
            }
        });
    }

    isWinning(): boolean {
        return this.hasCompleteColumn() || this.hasCompletedRow();
    }

    hasCompletedRow(): boolean {
        return this.fields
            .map(row => row.every(field => field.marked))
            .some(marked => marked);
    }

    hasCompleteColumn(): boolean {
        let counter = 0;
        let hasCompletedColumn = false;

        while(!hasCompletedColumn && counter < this.size) {
            hasCompletedColumn = this.fields
                .map(row => row[counter].marked)
                .every(marked => marked);
            counter++;
        }

        return hasCompletedColumn;
    }

    sumUnmarkedNumbers(): number {
        const filterFn = (field: Field) => !field.marked;
        return this.sumFields(filterFn);
    }

    sumMarkedNumbers(): number {
        const filterFn = (field: Field) => field.marked;
        return this.sumFields(filterFn);
    }

    sumFields(filterFn: (field: Field) => boolean): number {
        return this.fields
            .flat()
            .filter(filterFn)
            .reduce((acc: number, curr: Field) => acc + curr.value, 0);
    }
}
