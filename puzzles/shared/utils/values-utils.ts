
export class ValuesUtils {
    static convertToString<T>(value: T | Array<T>): string | Array<string> {
        if (Array.isArray(value)) {
            return value.map((v: T) => String(v));
        }

        return String(value);
    }

    static convertToNumber<T>(value: T | Array<T>): number | Array<number> {
        if (Array.isArray(value)) {
            return value.map((v: T) => Number(v));
        }

        return Number(value);
    }
}

