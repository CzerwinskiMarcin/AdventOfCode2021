"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayUtils = void 0;
class ArrayUtils {
    static getSubArrays(arr, spread, getComplete = true) {
        const arrLength = arr.length;
        const offsets = new Array(spread)
            .fill(0)
            .map((_, index) => index);
        return arr
            .map((v, index) => {
            return offsets.map((offset) => {
                const newIndex = index + offset;
                if (newIndex >= arrLength) {
                    return null;
                }
                return arr[newIndex];
            });
        })
            .filter((arr) => getComplete ? arr.every(v => v !== null) : true);
    }
}
exports.ArrayUtils = ArrayUtils;
//# sourceMappingURL=array-utils.js.map