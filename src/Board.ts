import { fetch } from "./fetch";
import { Thread } from "./Thread";
import { Threads } from "./Threads";

export class Board {
    readonly url: string;
    readonly name?: string;
    readonly category?: string;

    constructor(url: string, name?: string, category?: string) {
        this.url = url;
        this.name = name;
        this.category = category;
    }

    // tslint:disable-next-line no-non-null-assertion
    get id() { return /([^\/]+)\/?$/.exec(this.url)![1]; }

    get subjectTxtUrl() { return `${this.url}subject.txt`; }

    threadDatUrl(dat: string) { return `${this.url}dat/${dat}`; }

    async fetchThreads() {
        const threads = this.parseContent(await fetch(this.subjectTxtUrl));

        return new Threads(threads);
    }

    parseContent(content: string) {
        return content
            .split(/\r?\n/)
            .filter((line) => line.length)
            .map((line) => line.split(/<>/))
            .map(([dat, titleAndCount]) => {
                const result = Board.titleAndCountRe.exec(titleAndCount);
                if (result) {
                    return new Thread(this.threadDatUrl(dat), result[1], Number(result[2]));
                } else {
                    return new Thread(this.threadDatUrl(dat), titleAndCount);
                }
            });
    }

    private static readonly titleAndCountRe = /^(.+)\s+\((\d+)\)$/;
}
