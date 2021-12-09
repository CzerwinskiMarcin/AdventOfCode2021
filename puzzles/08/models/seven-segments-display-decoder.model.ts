interface PatternAdditionRule {
    usedSegments: number,
    // This is the number of the segments after addition of the base number
    additionRules: {
        '1': number,
        '4': number,
        '7': number
    }
}

interface PatternsRules {
    [target: number]: PatternAdditionRule
}

export const patternAdditionRules: PatternsRules = {
    '2': {
        usedSegments: 5,
        additionRules: {
            '1': 6,
            '4': 7,
            '7': 6
        }
    },
    '3': {
        usedSegments: 5,
        additionRules: {
            '1': 5,
            '4': 6,
            '7': 5
        }
    },
    '5': {
        usedSegments: 5,
        additionRules: {
            '1': 6,
            '4': 6,
            '7': 6
        }
    },
    '6': {
        usedSegments: 6,
        additionRules: {
            '1': 7,
            '4': 7,
            '7': 7
        }
    },
    '9': {
        usedSegments: 6,
        additionRules: {
            '1': 6,
            '4': 6,
            '7': 6
        }
    },
    '0': {
        usedSegments: 6,
        additionRules: {
            '1': 6,
            '4': 7,
            '7': 6
        }
    }
}

export class SevenSegmentsDisplayDecoder {
    private uniqueSignalPatterns: Array<string>;
    private decodedPatters: {[pattern: string]: number} = {};

    constructor(private patternsRules: PatternsRules) {}

    decodeUniqueSignals(uniqueSignalPatterns: Array<string>, valuesToDecode: Array<string>): Array<number> {
        if (uniqueSignalPatterns.length !== 10) {
            throw new Error(`Cannot decode value without full unique signal patters. Provided number of unique signals: ${uniqueSignalPatterns.length}`);
        }

        this.decodedPatters = {};

        this.uniqueSignalPatterns = SevenSegmentsDisplayDecoder.sortSegmentsInPatterns(uniqueSignalPatterns);

        this.decodeBaseNumbers();
        this.decodeRestNumbers();

        const sortedValuesToDecode = SevenSegmentsDisplayDecoder.sortSegmentsInPatterns(valuesToDecode);
        return this.decodeValues(sortedValuesToDecode);
    }

    private static sortSegmentsInPatterns(patterns: Array<string>): Array<string> {
        return patterns
            .map(pattern => pattern
                .split('')
                .sort()
                .join('')
            )
    }

    private decodeBaseNumbers(): void {
        this.decodeOne();
        this.decodeFour();
        this.decodeSeven();
        this.decodeEight();
    }

    private decodeOne(): void {
        this.decodeNumber(1, this.findByLength(2));
    }

    private decodeFour(): void {
        this.decodeNumber(4, this.findByLength(4));
    }

    private decodeSeven(): void {
        this.decodeNumber(7, this.findByLength(3));
    }

    private decodeEight(): void {
        this.decodeNumber(8, this.findByLength(7));
    }

    private findByLength(length: number): (patterns: Array<string>) => string {
        return (patterns: Array<string>) => patterns.find(p => p.length === length);
    }

    private decodeNumber(num: number, findFn: (uniquePatterns: Array<string>) => string): void {
        const pattern = findFn(this.uniqueSignalPatterns);

        if (!pattern) {
            throw new Error(`Cannot find pattern for number: ${num}`);
        }

        this.codeNumberToPattern(pattern, num);
    }

    private decodeRestNumbers(): void {
        [...this.uniqueSignalPatterns]
            .map((pattern: string) => ({pattern, num: this.findByRule(pattern)}))
            .map(({pattern, num}: {pattern: string, num: number}) => this.codeNumberToPattern(pattern, num))
    }

    private findByRule(pattern: string): number {
        const foundNumbers = Object.entries(this.patternsRules)
            .filter(([_, rule]: [string, PatternAdditionRule]) => rule.usedSegments === pattern.length)
            .filter(([_, rule]: [string, PatternAdditionRule]) => this.isValidForRule(pattern, rule))
            .map(([key, _]: [string, PatternAdditionRule]) => +key)

        if (foundNumbers.length !== 1) {
            throw new Error(`Cannot determine value of the pattern: ${pattern}. Results: ${foundNumbers}`);
        }

        return foundNumbers[0];
    }

    private isValidForRule(pattern: string, rule: PatternAdditionRule): boolean {
        return Object.entries(rule.additionRules)
            .every(([num, additionResult]: [string, number]) => {
                const numPattern = this.getPatterForNumber(+num);
                return SevenSegmentsDisplayDecoder.addPatterns(pattern, numPattern).length === additionResult;
            })
    }

    private static addPatterns(pattern1: string, pattern2: string): string {
        const mergedSignals = [...pattern1.split(''), ...pattern2.split('')];
        return Array.from(new Set(mergedSignals)).join('');
    }

    private arePatternsTheSame(pattern1: string, pattern2: string): boolean {
        if (pattern1.length !== pattern2.length) {
            return false;
        }

        return pattern1
            .split('')
            .every(segment => pattern2.includes(segment));
    }

    private getPatterForNumber(num: number): string {
        const [pattern] = Object.entries(this.decodedPatters).find(([pattern, value]) => value === num);

        if (!pattern) {
            throw new Error(`There is no decoded pattern for number ${num}`);
        }

        return pattern;
    }

    private codeNumberToPattern(pattern: string, num: number): void {
        this.decodedPatters[pattern] = num;
        this.removeDecodedPatternFromInput(pattern);
    }

    private removeDecodedPatternFromInput(decodedPattern: string): void {
        this.uniqueSignalPatterns = this.uniqueSignalPatterns.filter(pattern => pattern !== decodedPattern);
    }

    private decodeValues(valuesToDecode: Array<string>): Array<number> {
        const decodedValues = valuesToDecode.map(value => this.decodedPatters[value]);
        return decodedValues;
    }
}
