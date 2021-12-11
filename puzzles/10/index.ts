import { PuzzleResult } from "../shared/interfaces/puzzle-result.interface";
import { FileUtils } from "../shared/utils";
import { NavigationSubsystem } from "./models/navigation-subsystem.model";

export default function(sourcePath: string): PuzzleResult {
    const rawData = FileUtils.readFileToArray(sourcePath);

    const navigationSubsystem = new NavigationSubsystem();

    return {
        alphaResult: getTotalErrorSyntaxCode(navigationSubsystem, rawData),
        betaResult: getMiddleCompleteSyntaxCode(navigationSubsystem, rawData)
    }
}

function getTotalErrorSyntaxCode(navigationSubsystem: NavigationSubsystem, rawData: Array<string>): number {
    return navigationSubsystem.getTotalSyntaxError(rawData);
}

function getMiddleCompleteSyntaxCode(navigationSubsystem: NavigationSubsystem, rawData: Array<string>): number {
    const result = navigationSubsystem.completeValidSubsystem(rawData)
        .sort((a, b) => a - b);
    return result[Math.floor(result.length / 2)];
}
