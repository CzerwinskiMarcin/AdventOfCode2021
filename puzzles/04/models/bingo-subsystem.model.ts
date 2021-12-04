import { BingoBoard } from "./bingo-board.model";
import { BoardConfig } from "../interfaces/board-data.interface";


export class BingoSubsystem {
    private boards: Array<BingoBoard> = [];
    private drawSystemData: {
        queued: Array<number>,
        current: number,
        drawn: Array<number>,
        winningBoards: Array<BingoBoard>
    } = {
        queued: [],
        current: null,
        drawn: [],
        winningBoards: []
    }

    initializeDrawOrder(drawOrder: Array<number>): void {
        this.drawSystemData.queued.push(...drawOrder);
    }

    initializeBoards(boardsData: Array<Array<number>>): void {
        this.validateBoardData(boardsData);

        this.boards = [];
        const boardSize: number = this.getBoardSize(boardsData[0])

        for (let i = 0; i < boardsData.length; i = i + boardSize) {
            const boardConfig: BoardConfig = this.getBoardConfig(boardSize, i, boardsData);
            this.boards.push(new BingoBoard(boardConfig));
        }
    }

    private validateBoardData(boardData: Array<Array<number>>): void {
        if (!boardData.length) {
            throw new Error('There is no data provided');
        }

        const boardWidth: number = boardData[0].length;

        if (boardData.length % boardWidth) {
            throw new Error('Data for board is not complete');
        }
    }

    private getBoardSize(boardRow: Array<number>): number {
        return boardRow.length;
    }

    private getBoardConfig(size: number, index: number, boardsData: Array<Array<number>>): BoardConfig {
        const boardFields: Array<Array<number>> = boardsData.slice(index, index + size);

        return {
            size: size,
            boardFields
        }
    }

    draw(): number {
        if (this.drawSystemData.current) {
            this.drawSystemData.drawn.push(this.drawSystemData.current);
        }

        if (!this.drawSystemData.queued.length) {
            return null;
        }

        this.drawSystemData.current = this.drawSystemData.queued.shift();
        return this.drawSystemData.current;
    }

    getLastDrawnNumber(): number {
        return this.drawSystemData.current;
    }

    markFields(value: number): void {
        this.boards.forEach(board => {
            board.markPoint(value);
        });
    }

    doTurn(): number {
        this.draw();
        this.markFields(this.drawSystemData.current);
        return this.drawSystemData.current;
    }

    findWinningBoard(): BingoBoard {
        const winningBoard = this.boards.find(board => board.isWinning());
        if (winningBoard) {
            this.drawSystemData.winningBoards.push(winningBoard);
        }
        this.filterOutWinningBoard();
        return winningBoard;
    }

    filterOutWinningBoard(): void {
        this.boards = this.boards.filter(board => !board.isWinning());
    }

    getBoardsNumber(): number {
        return this.boards.length;
    }

    getBoards(): Array<BingoBoard> {
        return [...this.boards];
    }

}
