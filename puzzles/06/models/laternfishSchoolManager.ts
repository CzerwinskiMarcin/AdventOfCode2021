import { Laternfish } from "./laternfish.model";

export class LaternfishSchoolManager {
    // This school will be divided by age (just theoretically) so each index of fish will be days to spawn
    private laternfishes: Array<Array<Laternfish>> = new Array<Array<Laternfish>>();

    constructor(maxLaternfishSpawnLength: number) {
        for (let i = 0; i <= maxLaternfishSpawnLength; i++) {
            this.laternfishes[i] = new Array<Laternfish>();
        }
    }

    populateSchoolWithLaternfishes(laternfishesAges: Array<number>): void {
        laternfishesAges.forEach(age => {
            this.laternfishes[age].push(new Laternfish(age))
        });
    }

    getPopulationAtDay(day: number): number {
        let counter = 1;

        while (day - counter >= 0) {
            const newLaternfishes: Array<Laternfish> = this.getNewLaternfishes();
            this.ageSchool();
            this.assignLaternfishesToSchool(newLaternfishes);

            counter++;
        }

        return this.countLaternfishes();
    }


    private getNewLaternfishes(): Array<Laternfish> {
        return this.laternfishes[0].map(laternfish => laternfish.spawnNewLaternfish());
    }

    private ageSchool(): void {
        const laternfishesAfterSpawn = this.laternfishes.shift();
        this.laternfishes[this.laternfishes.length] = [];
        this.assignLaternfishesToSchool(laternfishesAfterSpawn);
    }

    private assignLaternfishesToSchool(laternfishes: Array<Laternfish>): void {
        laternfishes.forEach(laternfish => {
            this.laternfishes[laternfish.getDaysToSpawn()].push(laternfish)
        });
    }

    private countLaternfishes(): number {
        return this.laternfishes.reduce((acc: number, curr: Array<Laternfish>) => acc + curr.length, 0);
    }
}
