"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValuesUtils = void 0;
class ValuesUtils {
    static convertToString(value) {
        if (Array.isArray(value)) {
            return value.map((v) => String(v));
        }
        return String(value);
    }
    static convertToNumber(value) {
        if (Array.isArray(value)) {
            return value.map((v) => Number(v));
        }
        return Number(value);
    }
}
exports.ValuesUtils = ValuesUtils;
//# sourceMappingURL=values-utils.js.map