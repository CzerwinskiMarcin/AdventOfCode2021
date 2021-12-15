import { ReadFrame } from "./read-frame.model";

export class PolymerisationModule {
    rules: {[frame: string]: Array<string>} = {};
    counter: {[frame: string]: number} = {};
    elementsCounter: {[element: string]: number} = {};

    conductPolymerisation(polymer: string, cycles: number): number {
        this.initPolymerisation(polymer);
        this.synthesize(cycles);
        this.countElements(polymer);

        return this.getDiffBetweenLeastAndMostCommon();
    }

    private initPolymerisation(polymer: string): void {
        const frameItr = ReadFrame.frames(polymer);
        let frameDate = frameItr.next();

        while(!frameDate.done) {
            const frame = frameDate.value.frame;
            this.counter[frame] += 1;
            frameDate = frameItr.next();
        }
    }

    private synthesize(cycles: number): void {
        let counter = 0;

        while (cycles - counter) {
            const activePolymers = Object.entries(this.counter)
                .filter(([frame, counter]) => counter);

            this.counter = activePolymers
                .map(([frame, counter]) => this.rules[frame].map(f => ([f, counter])))
                .flat()
                .reduce((acc: {[frame: string]: number}, curr: [string, number]) => {
                    acc[curr[0]] = acc[curr[0]] ? acc[curr[0]] + curr[1] : curr[1];
                    return acc;
                }, {});
            counter++;
        }
    }

    private countElements(polymer: string): void {
        this.elementsCounter = {};
        Object.entries(this.counter)
            .map(([frame, value]) => ([frame[0], value]))
            .forEach(([element, value]: [string, number]) =>
                this.elementsCounter[element] = this.elementsCounter[element] ?
                    this.elementsCounter[element] + value : value);

        // Add last element because is ommited
        const lastElement = polymer.split('').pop();
        this.elementsCounter[lastElement] += 1;

    }

    getDiffBetweenLeastAndMostCommon(): number {
        const values = Object.values(this.elementsCounter);
        const min = Math.min(...values);
        const max = Math.max(...values);

        return max - min;
    }

    loadRules(rules: Array<string>): this {
        if (!rules.length) {
            throw new Error(`There is no polymerisation reactions passed`);
        }

        if (!/[a-zA-z]+\s->\s[a-zA-Z]+/.test(rules[0])) {
            throw new Error('Incorrect format of polymerisation reaction. Should be X+ -> Y+');
        }

        this.rules = rules
            .map(reaction => reaction.split(' -> '))
            .map(([entrancePolymer, resultPolymer]) => this.generateRules(entrancePolymer, resultPolymer))
            .reduce((acc, curr) => Object.assign(acc, curr), {})

        this.initiateCounter();
        return this;
    }

    private generateRules(frame: string, result: string): {[frame: string]: Array<string>} {
        const [A, B] = frame.split('');
        const frameA = A + result;
        const frameB = result + B;

        return {
            [frame]: [frameA, frameB]
        };
    }

    private initiateCounter(): void {
        Object.keys(this.rules)
            .forEach(rule => this.counter[rule] = 0);
    }
}
