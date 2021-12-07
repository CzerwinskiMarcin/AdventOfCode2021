export class Laternfish {
    static readonly newLaternfishOffspringLength = 8;
    static readonly oldLaternfishOffspringLength = 6;

    constructor(private nextSpawnUntil: number = Laternfish.newLaternfishOffspringLength, private offspringCount: number = 0) {}

    getDaysToSpawn(): number {
        return this.nextSpawnUntil;
    }

    spawnNewLaternfish(): Laternfish {
        this.offspringCount++;
        this.setNewSpawnTime();

        return new Laternfish();
    }

    private setNewSpawnTime(): void {
        this.nextSpawnUntil = this.offspringCount > 0 ? Laternfish.oldLaternfishOffspringLength : Laternfish.newLaternfishOffspringLength;
    }

}
