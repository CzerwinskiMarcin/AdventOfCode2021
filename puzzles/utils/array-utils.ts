export class ArrayUtils {
    static getSubArrays<T>(arr: Array<T>, spread: number, getComplete: boolean = true): Array<Array<T | null>> {
        const arrLength: number = arr.length;
        const offsets: Array<number> = new Array(spread)
            .fill(0)
            .map((_: number, index: number) => index);

        return arr
            .map((v: T, index: number) => {
                return offsets.map((offset: number) => {
                    const newIndex = index + offset;

                    if (newIndex >= arrLength) {
                        return null;
                    }
                    return arr[newIndex];
                });
            })
            .filter((arr: Array<T | null>) => getComplete ? arr.every(v => v !== null) : true);
    }
}
