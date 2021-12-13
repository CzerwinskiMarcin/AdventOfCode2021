import { PuzzleResult } from "../../puzzles/shared/interfaces/puzzle-result.interface";
import { FileUtils } from "../../puzzles/shared/utils";
import { PathFinder } from "./models/path-finder.model";
import { Path } from "./models/path.model";
import { CorrectedPath } from "./models/corrected-path.model";

export default function(sourcePath: string): PuzzleResult {
    const rawData = FileUtils.readFileToArray(sourcePath);

    return {
        alphaResult: getPathsWithSmallCavesCount(rawData),
        betaResult: getPathsWithSmallCaveCountWithOneCaveDoubleEntered(rawData)
    }
}

function getPathsWithSmallCavesCount(rawData: Array<string>): number {
    const paths = new PathFinder(rawData, Path).getPaths();
    return paths.length;
}

function getPathsWithSmallCaveCountWithOneCaveDoubleEntered(rawData: Array<string>): number {
    const paths = new PathFinder(rawData, CorrectedPath).getPaths();
    return paths.length;
}
