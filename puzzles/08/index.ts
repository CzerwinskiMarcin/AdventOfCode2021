import { PuzzleResult } from "../shared/interfaces/puzzle-result.interface";
import { FileUtils } from "../shared/utils";
import { patternAdditionRules, SevenSegmentsDisplayDecoder } from "./models/seven-segments-display-decoder.model";

interface ConvertedData {
    uniqueSignals: Array<string>,
    displayedValues: Array<string>
}

export default function main(sourcePath: string): PuzzleResult {
    const rawInput: Array<string> = FileUtils.readFileToArray(sourcePath);
    const halfConvertedData: Array<ConvertedData> = rawInput
        .map((row: string) => row.split(' | '))
        .map(([uniqueSignalStream, displayValuesStream]) => ({uniqueSignals: uniqueSignalStream.split(' '), displayedValues: displayValuesStream.split(' ')}))

    return {
        alphaResult: countUniqueSegmentsUseNumbers(halfConvertedData),
        betaResult: getSumOfDisplays(halfConvertedData)
    }
}

function countUniqueSegmentsUseNumbers(inputData: Array<ConvertedData>): number {
    const decoder = new SevenSegmentsDisplayDecoder(patternAdditionRules);
    const decodedData = inputData.map(({uniqueSignals, displayedValues}) => decoder.decodeUniqueSignals(uniqueSignals, displayedValues))

    return decodedData.flat().filter(v => [1, 4, 7, 8].includes(v)).length
}

function getSumOfDisplays(inputData: Array<ConvertedData>): number {
    const decoder = new SevenSegmentsDisplayDecoder(patternAdditionRules);
    const decodedData = inputData.map(({uniqueSignals, displayedValues}) => decoder.decodeUniqueSignals(uniqueSignals, displayedValues))

    return decodedData
        .map(data => data.join(''))
        .map(data => +data)
        .reduce((acc: number, curr: number) => acc + curr, 0)
}
