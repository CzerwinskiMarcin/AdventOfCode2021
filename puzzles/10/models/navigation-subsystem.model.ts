import { choices } from "yargs";

interface SubsystemSelfMonitoringResult {
    target: string,
    isCorrect: boolean,
    error?: {
        found: string,
        expected: string
    },
    incompleteChunks?: Array<string>,
    completedChunks?: Array<string>
}

type Chunk = '(' | ')' | '[' | ']' | '{' | '}' | '<' | '>';

export class NavigationSubsystem {
    private readonly chunkTypeMask = 0b10000;
    private readonly chunkMask = 0b01111;
    private readonly validChunkPairMask = 0b11111;

    private readonly invalidChunkScore: {[chunk: string]: number} = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    };

    private readonly completedChunkScore: {[chunk: string]: number} = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
    }

    private readonly chunks: {[chunk: string]: number} = {
        '(': 0b11111,
        ')': 0b00000,
        '[': 0b11110,
        ']': 0b00001,
        '{': 0b11100,
        '}': 0b00011,
        '<': 0b10001,
        '>': 0b01110
    }

    public completeValidSubsystem(data: Array<string>): Array<number> {
        return this.validateSubsystem(data)
            .filter(({isCorrect}) => isCorrect)
            .map(({target}) => this.getChunksToComplete(target))
            .map(this.getCompletedChunks.bind(this))
            .map(this.calculateCompletionScore.bind(this))
    }

    private getChunksToComplete(line: string): Array<number> {
        const chunks: Array<number> = line.split('')
            .map(this.convertChunk.bind(this));

        const chunkStack: Array<number> = []

        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];

            if (chunk & this.chunkTypeMask) {
                chunkStack.push(chunk);
                continue;
            }

            // Double check if chunkStream is correct
            const openChunk = chunkStack.pop();

            if ((openChunk ^ chunk) !== this.validChunkPairMask) {
                throw new Error(`Chunks:\t${openChunk} and ${chunk}\t are not complemented`);
            }
        }

        return [...chunkStack];
    }

    private getCompletedChunks(chunks: Array<number>): Array<number> {
        const completionChunks: Array<number> = [];
        chunks.forEach(chunk => completionChunks.unshift(chunk ^ this.validChunkPairMask));
        return completionChunks;
    }

    private calculateCompletionScore(chunks: Array<number>): number {
        return chunks
            .map(this.getChunkSignByValue.bind(this))
            .map(this.getChunkCompletionScore.bind(this))
            .reduce((acc: number, curr: number) => (acc * 5) + curr, 0) as number;
    }

    public getTotalSyntaxError(data: Array<string>): number {
        return this.validateSubsystem(data)
            .filter(({isCorrect}) => !isCorrect)
            .map(({error: {found}}) => found)
            .map(chunk => this.invalidChunkScore[chunk])
            .reduce((acc: number, curr: number) => acc + curr, 0)
    }

    private validateSubsystem(lines: Array<string>): Array<SubsystemSelfMonitoringResult> {
        return lines.map(this.validateSubsystemLine.bind(this));
    }

    private validateSubsystemLine(line: string): SubsystemSelfMonitoringResult {
        const chunks: Array<number> = line
            .split('')
            .map(this.convertChunk.bind(this))

        const chunkStack: Array<number> = []

        for (let i = 0; i < chunks.length; i++) {
            const chunk  = chunks[i];

            // Checking the type of the chunk. If the most important bit eq 1 then it is opening chunk
            if (chunk & this.chunkTypeMask) {
                chunkStack.push(chunk);
                continue;
            }

            const previousChunk = chunkStack.pop();

            if (!this.areChunksValidPair(chunk, previousChunk)) {
                return {
                    target: line,
                    isCorrect: false,
                    error: {
                        expected: this.getChunkSignByValue(previousChunk ^ this.validChunkPairMask),
                        found: this.getChunkSignByValue(chunk)
                    },
                }
            }
        }

        return {
            target: line,
            isCorrect: true
        };
    }

    private convertChunk(chunk: string): number {
        return this.chunks[chunk];
    }

    private areChunksValidPair(chunk: number, chunk2: number): boolean {
        return (chunk ^ chunk2) === this.validChunkPairMask;
    }

    private getChunkSignByValue(value: number): string {
        return Object.entries(this.chunks)
            .find(([k, v]) => value === v)[0];
    }

    private getChunkCompletionScore(chunk: string): number {
        return Object.entries(this.completedChunkScore)
            .find(([k, v]) => k === chunk)[1];
    }

}
