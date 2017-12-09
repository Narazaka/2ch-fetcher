import { Board } from "./Board";
import { Boards } from "./Boards";
import { fetch } from "./fetch";

export class BBSMenu {
    static parseContent(content: string) {
        const boards: Board[] = [];
        let category = "";
        for (const line of content.split(/\r?\n/)) {
            const categoryResult = this.categoryRe.exec(line);
            if (categoryResult) category = categoryResult[1];
            const boardLinkResult = this.boardLinkRe.exec(line);
            if (boardLinkResult) {
                boards.push(new Board(boardLinkResult[1], boardLinkResult[2], category));
            }
        }

        return boards;
    }

    private static readonly categoryRe = /<B>(.+)<\/B>/;
    private static readonly boardLinkRe = /<A\sHREF=([^>\s]+)>(.+)<\/A>/;

    readonly url: string;

    constructor(url = "http://2ch.sc/bbsmenu.html") {
        this.url = url;
    }

    async fetchBoards() {
        const boards = BBSMenu.parseContent(await fetch(this.url));

        return new Boards(boards);
    }
}
