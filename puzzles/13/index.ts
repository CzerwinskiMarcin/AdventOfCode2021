import { PuzzleResult } from "../../puzzles/shared/interfaces/puzzle-result.interface";
import { FileUtils } from "../../puzzles/shared/utils";
import { OrigamiFolder } from "./models/origami-folder.model";

export default function(sourcePath: string): PuzzleResult {
    const rawData = FileUtils.readFileToArray(sourcePath);

    return {
        alphaResult: getNumberOfDostAfterFolds(rawData),
        betaResult: displayFoldsResults(rawData)
    }
}

function getNumberOfDostAfterFolds(rawData: Array<string>): number {
    return new OrigamiFolder(rawData).countPointsWithoutDuplicatesAfterNumberOfFolds(1);
}

function displayFoldsResults(rawData: Array<string>): number {
    new OrigamiFolder(rawData).printAfterFolds();
    return 0;
}
