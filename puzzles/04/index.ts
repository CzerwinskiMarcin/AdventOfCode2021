import { FileUtils, ValuesUtils } from "../shared/utils";
import { BingoSubsystem } from "./models/bingo-subsystem.model";
import { BingoBoard } from "./models/bingo-board.model";

export default function main(sourcePath: string) {
    const bingoSubsystem: BingoSubsystem = initializeBingoSubsystem(sourcePath);
    const winningBoard: BingoBoard = conductGame(bingoSubsystem);
    calculateWinningScore(bingoSubsystem, winningBoard);
}

function initializeBingoSubsystem(sourcePath: string): BingoSubsystem {
    const sourceData: Array<string> = FileUtils.readFileToArray(sourcePath);
    const [rawDrawSequence, ...rawBoardsData] = sourceData;

    const drawSequence: Array<number> = ValuesUtils.convertToNumber(rawDrawSequence.split(',')) as Array<number>;
    const boardData: Array<Array<number>> = rawBoardsData
        .map(boardRow => ValuesUtils.convertToNumber(boardRow.split(/\s+/))) as Array<Array<number>>;

    const bingoSubsystem: BingoSubsystem = new BingoSubsystem();
    bingoSubsystem.initializeDrawOrder(drawSequence);
    bingoSubsystem.initializeBoards(boardData);

    return bingoSubsystem;
}

function conductGame(bingoSubsystem: BingoSubsystem): BingoBoard {
    let drawnValue: number;
    let winningBoard: BingoBoard;

    do {
        drawnValue = bingoSubsystem.draw();
        bingoSubsystem.markFields(drawnValue);
        winningBoard = bingoSubsystem.findWinningBoard();

    } while(drawnValue !== null && !winningBoard)

    return winningBoard;
}

function calculateWinningScore(bingoSubsystem: BingoSubsystem, winningBoard: BingoBoard): number {
    const lastDrawnNumber: number = bingoSubsystem.getLastDrawnNumber();
    const unmarkedFieldsSum: number = winningBoard.sumUnmarkedNumbers();

    console.log(`Last: ${lastDrawnNumber}, unmarked sum: ${unmarkedFieldsSum} result: ${lastDrawnNumber * unmarkedFieldsSum}`);

    return lastDrawnNumber * unmarkedFieldsSum;
}
