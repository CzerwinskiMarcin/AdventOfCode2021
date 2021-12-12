import { PuzzleResult } from "../../puzzles/shared/interfaces/puzzle-result.interface";
import { FileUtils } from "../../puzzles/shared/utils";

export default function(sourcePath: string): PuzzleResult {
    const rawData = FileUtils.readFileToArray(sourcePath);

    console.log(rawData);

    return {
        alphaResult: 0,
        betaResult: 0
    }
}
