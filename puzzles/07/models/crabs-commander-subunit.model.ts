export enum CombustionType {
    Linear,
    Increasing
}

export class CrabsCommanderSubunit {
    private crabsPositions: Array<number>;

    constructor(initialPosition: Array<number>, private combustionType: CombustionType = CombustionType.Linear) {
        this.crabsPositions = [...initialPosition]
            .sort((a, b) => a - b);
    }

    getCheapestPositionForCrabs(): number {
        return this.calculateCheapestFuelConsumption();
    }

    private calculateCheapestFuelConsumption(start: number = 0, end: number = Math.max(...this.crabsPositions), counter: number = 50): number {
        const width = Math.abs(end - start);
        const middlePosition = Math.floor((start + end) / 2);
        const leftPosition = start;
        const rightPosition = end;

        // console.log(`Width: ${width}\tCounter: ${counter}\t CONSUMPTION MODE: ${this.combustionType === CombustionType.Linear ? 'Linear' : 'Increasing'}`);

        const leftConsumption = this.calculateFuelConsumptionForPosition(leftPosition);
        const rightConsumption = this.calculateFuelConsumptionForPosition(rightPosition);

        // console.log('Position\tIndex\tConsumption\tLowest');
        // console.log(`Left\t\t${leftPosition}\t${leftConsumption}\t\tNAN`);
        // console.log(`Right\t\t${rightPosition}\t${rightConsumption}\t\tNAN`);


        if (!counter) {
            // console.log('Error')
            return;
        } else if (width <= 1) {
            // console.log('Ending');
            // console.log('---------------\n');
            return Math.min(leftConsumption, rightConsumption);
        } else if (leftConsumption < rightConsumption) {
            // console.log('Going left');
            // console.log('---------------\n');
            return this.calculateCheapestFuelConsumption(start, middlePosition, --counter);
        } else {
            // console.log('Going right');
            // console.log('---------------\n');
            return this.calculateCheapestFuelConsumption(middlePosition+1, end, --counter);
        }
    }

    private calculateFuelConsumptionForPosition(position: number): number {
        switch (this.combustionType) {
            case CombustionType.Linear:
                return this.calculateLinearFuelConsumptionForPosition(position);
            case CombustionType.Increasing:
                return this.calculateIncreasingFuelConsumptionForPosition(position);
            default:
                throw new Error(`Cannot calculate consumption for given CombustionType: ${this.combustionType}`);
        }
    }

    private calculateLinearFuelConsumptionForPosition(position: number): number {
        return this.crabsPositions
            .map(p => Math.abs(p - position))
            .reduce((acc: number, curr: number) => acc + curr, 0);
    }

    private calculateIncreasingFuelConsumptionForPosition(position: number): number {
        const fuelConsumption: number = this.crabsPositions
            .map(p => Math.abs(p - position))
            .map(this.getFuelConsumption)
            .reduce((acc: number, curr: number) => acc + curr , 0);

        // console.log(`For position:\t${position}\tTotal fuel consumption:\t${fuelConsumption}`);
        // console.log('---------------')

        return fuelConsumption;
    }

    private getFuelConsumption(distance: number): number {
        return (1 + distance) / 2 * distance;
    }

}
