import { PuzzleResult } from "../shared/interfaces/puzzle-result.interface";
import { FileUtils, ValuesUtils } from "../shared/utils";
import { HeightMapSystem } from "./models/height-map-system.model";

export default function main(sourcePath: string): PuzzleResult {
    const rawData = FileUtils.readFileToArray(sourcePath)
        .map(row => row.split('').map(ValuesUtils.convertToNumber)) as Array<Array<number>>;

    const heightMapSystem = new HeightMapSystem(rawData);

    return {
        betaResult: getSumOfRiskLevels(heightMapSystem),
        alphaResult: getBasinsMultiplication(heightMapSystem)
    }
}

function getSumOfRiskLevels(heightMapSystem: HeightMapSystem): number {
    return heightMapSystem.getRiskLevels().reduce((acc: number, curr: number) => acc + curr, 0);
}

function getBasinsMultiplication(heightMapSystem: HeightMapSystem): number {
    return heightMapSystem
        .getLargestBasinsSizes(3)
        .reduce((acc: number, curr: number) => acc * curr, 1);
}
