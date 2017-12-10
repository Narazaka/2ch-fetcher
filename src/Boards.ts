import { Board } from "./Board";

export class Boards {
    private readonly boards: Board[];

    constructor(boards: Board[]) {
        this.boards = boards;
    }

    get names() { return this.boards.map((board) => board.name); }

    all() {
        return this.boards;
    }

    name(name: string) {
        return this.boards.find((board) => board.name === name) as Board;
    }

    id(id: string) {
        return this.boards.find((board) => board.id === id) as Board;
    }
}
