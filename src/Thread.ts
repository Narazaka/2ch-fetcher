import * as moment from "moment-timezone";
import { fetch } from "./fetch";
import { Post } from "./Post";
import { Posts } from "./Posts";

export class Thread {
    readonly datUrl: string;
    readonly title?: string;
    readonly count?: number;

    constructor(datUrl: string, title?: string, count?: number) {
        this.datUrl = datUrl;
        this.title = title;
        this.count = count;
    }

    // tslint:disable-next-line no-non-null-assertion
    get datName() { return /([^\/]+)$/.exec(this.datUrl)![1]; }

    // tslint:disable-next-line no-non-null-assertion
    get datId() { return /([^\/]+)\.dat$/.exec(this.datUrl)![1]; }

    async fetchPosts() {
        const posts = this.parseContent(await fetch(this.datUrl));

        return new Posts(posts);
    }

    parseContent(content: string) {
        const lines = content.split(/\r?\n/);
        const posts = [];
        for (let index = 0; index < lines.length; ++index) {
            posts.push(this.parseLine(index + 1, lines[index]));
        }
        if (!posts[posts.length - 1]) posts.pop(); // 最終行処理

        return posts;
    }

    parseLine(index: number, line: string) { // tslint:disable-line prefer-function-over-method
        const [name, email, dateAndIdStr, body] = line.split(/<>/);
        if (!dateAndIdStr || !/\d/.test(dateAndIdStr)) return undefined;
        const result = Thread.dateAndIdStrRe.exec(dateAndIdStr);
        if (!result) return undefined;
        const date = moment.tz(
            [
                Number(result[1]),
                Number(result[2]) - 1,
                Number(result[3]),
                Number(result[4]),
                Number(result[5]),
                Number(result[6]),
                Number(result[7]) * 10,
            ],
            "Asia/Tokyo",
        )
            .toDate();
        const id = result[8] && result[8].length ? result[8] : undefined;

        return new Post({index, name, email, date, id, body});
    }

    private static readonly dateAndIdStrRe = /^(\d+)\D+(\d+)\D+(\d+)\D+(\d+)\D+(\d+)\D+(\d+)\D+(\d+)(?:\s+ID:(.+)$)?/;
}
