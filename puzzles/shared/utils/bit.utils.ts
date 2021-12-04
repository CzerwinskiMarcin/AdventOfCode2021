export class BitUtils {

    static getLessCommonBits(data: Array<number>, comparisonLength: number): number {
        const converterFn: (counter: number) => 0 | 1 = counter => {
            return counter < data.length / 2 ? 1 : 0;
        }
        return BitUtils.getCommonBits(data, comparisonLength, converterFn);
    }

    static getMoreCommonBits(data: Array<number>, comparisonLength: number): number {
        const converterFn: (counter: number) => 0 | 1 = counter => {
            return counter >= data.length / 2 ? 1 : 0;
        }
        return BitUtils.getCommonBits(data, comparisonLength, converterFn);
    }

    private static getCommonBits(data: Array<number>, comparisonLength: number, convertFn: (value: number) => 0 | 1): number {
        const bitStream: string = BitUtils
            .countOnes(data, comparisonLength)
            .map(convertFn)
            .join('');

        return Number.parseInt(bitStream, 2);
    }

    static countZeros(data: Array<number>, comparisonLength: number): Array<number> {
        return BitUtils.countBits(data, comparisonLength, 0);
    }

    static countOnes(data: Array<number>, comparisonLength: number): Array<number> {
        return BitUtils.countBits(data, comparisonLength, 1);
    }

    private static countBits(data: Array<number>, comparisonLength: number, countingBit: 0 | 1): Array<number> {
        const bitCounts = new Array(comparisonLength).fill(0);

        data.forEach(d => {
            for (let i = 1; i <= comparisonLength; i++) {
                const mask = 1 << i - 1;
                const targetValue = countingBit << i - 1;
                bitCounts[comparisonLength - i] += (d & mask) === targetValue ? 1 : 0;
            }
        });

        return bitCounts;
    }

    static convertNumbersToBit(numbers: Array<number>, convertFn: (value: number) => number): number {
        const bits = numbers
            .map(v => convertFn(v));

        return Number.parseInt(bits.join(''), 2);
    }

    static getMaskFromArrayLength<T>(arr: Array<T>): number {
        return Number.parseInt(new Array(arr.length).fill(1).join(''), 2);
    }

    static negateBits(value: number, mask: number): number {
        return ~value & mask;
    }
}
