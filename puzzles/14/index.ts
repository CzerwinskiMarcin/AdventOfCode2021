import { PuzzleResult } from "../../puzzles/shared/interfaces/puzzle-result.interface";
import { FileUtils } from "../../puzzles/shared/utils";
import { PolymerisationModule } from "./models/polymerisation-module.model";

export default function(sourcePath: string): PuzzleResult {
    const rawData = FileUtils.readFileToArray(sourcePath);
    const [polymerTemplate, ...reactions] = rawData;

    return {
        alphaResult: getMostAndLeastCommonDifferenceInQuantityOfElements(polymerTemplate, reactions, 10),
        betaResult: getMostAndLeastCommonDifferenceInQuantityOfElements(polymerTemplate, reactions, 40),
    }
}

function getMostAndLeastCommonDifferenceInQuantityOfElements(polymerTemplate: string, reactionRules: Array<string>, cycles: number): number {
    const polymerisationModule = new PolymerisationModule();
    return polymerisationModule.loadRules(reactionRules).conductPolymerisation(polymerTemplate, cycles);
}
