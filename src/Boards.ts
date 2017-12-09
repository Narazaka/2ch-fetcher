import { Board } from "./Board";

export class Boards {
    readonly boards: Board[];

    constructor(boards: Board[]) {
        this.boards = boards;
    }

    get names() { return this.boards.map((board) => board.name); }

    board(name: string) {
        return this.boards.find((board) => board.name === name) as Board;
    }
}
