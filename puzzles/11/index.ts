import { PuzzleResult } from "../shared/interfaces/puzzle-result.interface";
import { FileUtils } from "../shared/utils";
import { OctoCoordinator } from "./models/octo-coordinator.model";

export default function(sourcePath: string): PuzzleResult {
    const rawData = FileUtils.readFileToArray(sourcePath);
    const formattedData = rawData.map(line => line.split('').map(v => +v));

    const octoCoordinator = new OctoCoordinator(formattedData);

    return {
        alphaResult: countFlashes(formattedData, 100),
        betaResult: getSynchFlashCycle(formattedData)
    }
}

function countFlashes(data: Array<Array<number>>, numberOfCycles: number): number {
    return new OctoCoordinator(data).getFlashesAfter(numberOfCycles);
}

function getSynchFlashCycle(data: Array<Array<number>>): number {
    return new OctoCoordinator(data).getSyncFlashes(false);
}
