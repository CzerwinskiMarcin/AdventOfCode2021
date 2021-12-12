export class DumboOcto {
    static readonly  MIN_ENERGY_LEVEL = 0;
    static readonly MAX_ENERGY_LEVEL = 9;

    private hasFlashed = false;

    constructor(private energyLevel: number) {}

    getEnergyLevel(): number {
        return this.energyLevel;
    }

    private setEnergyLevel(energyLevel: number): void  {
        this.energyLevel = energyLevel
    }

    private setHasFlashed(state: boolean): void {
        this.hasFlashed = state;
    }

    increaseEnergy(): this {
        if (this.hasFlashed) return;
        this.energyLevel <= DumboOcto.MAX_ENERGY_LEVEL
            ? this.setEnergyLevel(this.energyLevel + 1) : this.energyLevel;

        return this;
    }

    isAboutToFlash(): boolean {
        return this.energyLevel > DumboOcto.MAX_ENERGY_LEVEL && !this.hasFlashed;
    }

    flash(): this {
        if (!this.isAboutToFlash()) return this;
        this.setEnergyLevel(DumboOcto.MIN_ENERGY_LEVEL);
        this.setHasFlashed(true);

        return this;
    }

    resetFlashedState(): void {
        this.setHasFlashed(false);
    }


}
