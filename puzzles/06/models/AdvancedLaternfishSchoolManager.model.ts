import { Laternfish } from "./laternfish.model";

export class AdvancedLaternfishSchoolManager {
    private grownLaternfishPopulations: Array<number>;
    private youngLaternfishPopulations: Array<number>;

    constructor(initialPopulation: Array<number>) {
        this.grownLaternfishPopulations = new Array(Laternfish.oldLaternfishOffspringLength + 1).fill(0);
        this.youngLaternfishPopulations = new Array(Laternfish.newLaternfishOffspringLength + 1).fill(0);
        this.populateSchoolWithLaternfishes(initialPopulation);
    }

    private populateSchoolWithLaternfishes(laternfishesAges: Array<number>): void {
        laternfishesAges.forEach(age => this.grownLaternfishPopulations[age] += 1);
    }

    getPopulationAtDay(day: number): number {
        let dayCounter = 1
        let grownFishCycleCounter = 1;
        let youngFishCycleCounter = 1;
        let previousGrownFishCycleCounter = 0;
        let previousYoungFishCycleCounter = 0;

        while (day - dayCounter > 0) {
            const newFish = this.grownLaternfishPopulations[grownFishCycleCounter];
            const grownFish = this.youngLaternfishPopulations[youngFishCycleCounter];

            previousGrownFishCycleCounter = grownFishCycleCounter;
            previousYoungFishCycleCounter = youngFishCycleCounter;

            grownFishCycleCounter = this.getCounterAfterClicks(grownFishCycleCounter, Laternfish.oldLaternfishOffspringLength, 1);
            youngFishCycleCounter = this.getCounterAfterClicks(youngFishCycleCounter, Laternfish.newLaternfishOffspringLength, 1);
            dayCounter++;

            this.grownLaternfishPopulations[previousGrownFishCycleCounter] += grownFish;
            this.youngLaternfishPopulations[previousYoungFishCycleCounter] += newFish;
        }

        return this.getPopulationsCount();
    }

    private getPopulationsCount(): number {
        return [this.grownLaternfishPopulations, this.youngLaternfishPopulations]
            .map(population => population.reduce((acc: number, curr: number) => acc + curr, 0))
            .reduce((acc, curr) => acc + curr ,0);
    }

    private getCounterAfterClicks(currentCounter: number, maxCounter: number, clicks: number = maxCounter): number {
        let clicksDone = 0;
        while(clicks - clicksDone) {
            if (currentCounter + 1 > maxCounter) {
                currentCounter = 0;
            } else {
                currentCounter++;
            }
            clicksDone++;
        }
        return currentCounter;
    }
}
