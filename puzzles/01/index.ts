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

function main(): void {
    // TODO: Needs to parametrize this by script
    const filePath = path.join(__dirname, 'puzzle.txt');
    const rawDepths: Array<string> = FileUtils.readFileToArray(filePath);
    let depths: Array<number> = ValuesUtils.convertToNumber<string>(rawDepths) as Array<number>;
    // Processing depths for the second part of task
    depths = processDepths(depths);
    const convertedElevation = convertElevation(depths);
    const ascendingElevations = countElevationDirection(convertedElevation, ElevationDirection.Ascending);

    console.log(`Result: ${ascendingElevations}`);
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

main();
