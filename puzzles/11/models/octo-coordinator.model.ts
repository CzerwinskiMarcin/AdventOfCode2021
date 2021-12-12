import { EnhancedMap } from "../../shared/models/map.model";
import { DumboOcto } from "./dumbo-octo.model";
import { Vector } from "../../shared/models";

export class OctoCoordinator {
    private enhancedMap: EnhancedMap<DumboOcto> = new EnhancedMap<DumboOcto>();
    private octoData: Array<Array<DumboOcto>>;

    private flashCounter = 0;
    private debug = false;

    constructor(energyLevels: Array<Array<number>>) {
        this.octoData = energyLevels.map(line => line.map(v => new DumboOcto(v)));

        this.initializeMap();
    }

    getSyncFlashes(debug: boolean = false): number {
        this.debug = debug;
        let counter = 0;
        let wasSyncFlash = false;

        do {
            counter++;
            const numberOfFlashes = this.executeStep();
            wasSyncFlash = numberOfFlashes === this.octoData.flat().length;
        } while(!wasSyncFlash)

        return counter;
    }

    getFlashesAfter(cycles: number, debug: boolean = false): number {
        this.debug = debug;
        this.flashCounter = 0;
        this.simulate(cycles)
        return this.flashCounter;
    }

    private simulate(cycles: number): void {
        let counter = 0;

        while (cycles - counter) {
            this.executeStep();
            counter++;
        }
    }

    private executeStep(): number {
        this.increaseEnergies(this.octoData.flat());

        const flashed: Array<DumboOcto> = [];
        do {
            flashed.push(...this.conductFlash());
        } while (this.areOctosAboutToFlash())


        this.endCycle();
        this.printMap(flashed);
        return flashed.length;
    }

    private areOctosAboutToFlash(): boolean {
        return !!this.getOctosToFlash().length;
    }

    private conductFlash(): Array<DumboOcto> {
        const flashedOctos:Array<DumboOcto> = [];
        this.getOctosToFlash()
            .map(octo => {
                this.flashCounter++;
                flashedOctos.push(octo);
                return octo.flash();
            })
            .map(octo => this.enhancedMap.getItemAdjacentItems(octo))
            .flat()
            .map(octo => octo.increaseEnergy());

        return flashedOctos;
    }

    private getOctosToFlash(): Array<DumboOcto> {
        return this.octoData
            .flat()
            .filter(octo => octo.isAboutToFlash());
    }

    private increaseEnergies(octos: Array<DumboOcto>): void {
        octos.map(octo => octo.increaseEnergy());
    }

    private endCycle(): void {
        this.octoData.flat().map(octo => octo.resetFlashedState());
    }

    private initializeMap(): void {
        this.enhancedMap.initializeMap(this.octoData);
        this.printMap();
    }

    private printMap(markedPoints: Array<DumboOcto> = []): void {
        if (!this.debug) return;

        const positions: Array<Vector> = markedPoints.map(octo => this.enhancedMap.getItemPosition(octo));
        this.enhancedMap.printMap(positions, (octo: DumboOcto) => octo.getEnergyLevel());
        console.log('----------------\n');
    }

}
