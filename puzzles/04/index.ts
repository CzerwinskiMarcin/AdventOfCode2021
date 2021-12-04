import { FileUtils, ValuesUtils } from "../shared/utils";
import { BingoSubsystem } from "./models/bingo-subsystem.model";
import { BingoBoard } from "./models/bingo-board.model";
import { deflateRaw } from "zlib";

export default function main(sourcePath: string): any {
    const bingoSubsystem: BingoSubsystem = initializeBingoSubsystem(sourcePath);
    // For first part of puzzle
    // const winningBoard: BingoBoard = conductGame(bingoSubsystem);
    // For second part of puzzle
     const winningBoard: BingoBoard = findLastWinningBoard(bingoSubsystem);
    return calculateWinningScore(bingoSubsystem, winningBoard);
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
        drawnValue = bingoSubsystem.doTurn();
        winningBoard = bingoSubsystem.findWinningBoard();

    } while(drawnValue !== null && !winningBoard)

    return winningBoard;
}

function findLastWinningBoard(bingoSubsystem: BingoSubsystem): BingoBoard {
    let winningBoard: BingoBoard;
    while (bingoSubsystem.getBoardsNumber()) {
        bingoSubsystem.doTurn();
        winningBoard = bingoSubsystem.findWinningBoard()
    }

    return winningBoard;
}

function calculateWinningScore(bingoSubsystem: BingoSubsystem, winningBoard: BingoBoard): number {
    const lastDrawnNumber: number = bingoSubsystem.getLastDrawnNumber();
    const unmarkedFieldsSum: number = winningBoard.sumUnmarkedNumbers();

    return lastDrawnNumber * unmarkedFieldsSum;
}
