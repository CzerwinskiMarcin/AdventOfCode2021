"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_utils_1 = require("../shared/utils/file-utils");
const values_utils_1 = require("../shared/utils/values-utils");
const array_utils_1 = require("../shared/utils/array-utils");
var ElevationDirection;
(function (ElevationDirection) {
    ElevationDirection[ElevationDirection["Ascending"] = 0] = "Ascending";
    ElevationDirection[ElevationDirection["Descending"] = 1] = "Descending";
    ElevationDirection[ElevationDirection["Even"] = 2] = "Even";
    ElevationDirection[ElevationDirection["Omit"] = 3] = "Omit";
})(ElevationDirection || (ElevationDirection = {}));
function main(sourcePath) {
    const rawDepths = file_utils_1.FileUtils.readFileToArray(sourcePath);
    let depths = values_utils_1.ValuesUtils.convertToNumber(rawDepths);
    const convertElevationAlpha = convertElevation(depths);
    const ascendingElevationsAlpha = countElevationDirection(convertElevationAlpha, ElevationDirection.Ascending);
    depths = processDepths(depths);
    const convertedElevationBeta = convertElevation(depths);
    const ascendingElevationsBeta = countElevationDirection(convertedElevationBeta, ElevationDirection.Ascending);
    return {
        alphaResult: ascendingElevationsAlpha,
        betaResult: ascendingElevationsBeta
    };
}
exports.default = main;
function processDepths(depths) {
    return makeSumSlides(depths, 3);
}
function makeSumSlides(measurements, spread) {
    return array_utils_1.ArrayUtils.getSubArrays(measurements, spread)
        .map((subMeasurements) => {
        return subMeasurements
            .reduce((acc, curr) => acc + curr, 0);
    });
}
function convertElevation(data) {
    return data
        .map((value, index) => {
        if (index == 0)
            return ElevationDirection.Omit;
        const previousData = data[index - 1];
        switch (true) {
            case value - previousData > 0:
                return ElevationDirection.Ascending;
            case value - previousData < 0:
                return ElevationDirection.Descending;
            case value - previousData == 0:
                return ElevationDirection.Even;
            default:
                return ElevationDirection.Omit;
        }
    });
}
function countElevationDirection(elevations, direction) {
    return elevations
        .reduce((acc, curr) => curr === direction ? ++acc : acc, 0);
}
//# sourceMappingURL=index.js.map