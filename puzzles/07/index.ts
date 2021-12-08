import { PuzzleResult } from "../shared/interfaces/puzzle-result.interface";
import { FileUtils, ValuesUtils } from "../shared/utils";
import { CombustionType, CrabsCommanderSubunit } from "./models/crabs-commander-subunit.model";

export default function main(sourcePath: string): PuzzleResult {
    const crabsInitialPosition: Array<number> = ValuesUtils.convertToNumber(FileUtils.readFileToArray(sourcePath)[0].split(',')) as Array<number>;


    return {
        alphaResult: getLowestFuelConsumption(crabsInitialPosition),
        betaResult: getLowestFuelConsumptionCombustionAdjusted(crabsInitialPosition)
    }
}

function getLowestFuelConsumption(crabsInitialPosition: Array<number>): number {
    return new CrabsCommanderSubunit(crabsInitialPosition).getCheapestPositionForCrabs();
}

function getLowestFuelConsumptionCombustionAdjusted(crabsInitialPosition: Array<number>): number {
    return new CrabsCommanderSubunit(crabsInitialPosition, CombustionType.Increasing).getCheapestPositionForCrabs();
}
