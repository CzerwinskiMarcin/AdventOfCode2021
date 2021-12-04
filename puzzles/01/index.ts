import { FileUtils } from "../shared/utils/file-utils";
import { ValuesUtils } from "../shared/utils/values-utils";
import * as path from 'path';
import { ArrayUtils } from "../shared/utils/array-utils";

enum ElevationDirection {
    Ascending,
    Descending,
    Even,
    Omit
}

export default function main(sourcePath: string): {alphaResult: number, betaResult: number} {
    // TODO: Needs to parametrize this by script
    const rawDepths: Array<string> = FileUtils.readFileToArray(sourcePath);
    let depths: Array<number> = ValuesUtils.convertToNumber<string>(rawDepths) as Array<number>;

    // First puzzles part
    const convertElevationAlpha = convertElevation(depths);
    const ascendingElevationsAlpha = countElevationDirection(convertElevationAlpha, ElevationDirection.Ascending);


    // Processing depths for the second part of task
    depths = processDepths(depths);
    const convertedElevationBeta = convertElevation(depths);
    const ascendingElevationsBeta = countElevationDirection(convertedElevationBeta, ElevationDirection.Ascending);

    return {
        alphaResult: ascendingElevationsAlpha,
        betaResult: ascendingElevationsBeta
    }
}

function processDepths(depths: Array<number>): Array<number> {
    return makeSumSlides(depths, 3);
}

function makeSumSlides(measurements: Array<number>, spread: number): Array<number> {
    return ArrayUtils.getSubArrays<number>(measurements, spread)
        .map(
            (subMeasurements: Array<number>) => {
                return subMeasurements
                    .reduce((acc: number, curr: number) => acc + curr, 0);
            })

}

function convertElevation(data: Array<number>): Array<ElevationDirection> {
    return data
        .map((value: number, index: number) => {
            if (index == 0) return ElevationDirection.Omit;

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

function countElevationDirection(elevations: Array<ElevationDirection>, direction: ElevationDirection): number {
    return elevations
        .reduce((acc: number, curr: ElevationDirection) => curr === direction ? ++acc : acc, 0);
}
