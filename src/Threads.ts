import { Thread } from "./Thread";

export class Threads {
    readonly threads: Thread[];

    constructor(threads: Thread[]) {
        this.threads = threads;
    }

    get titles() { return this.threads.map((thread) => thread.title); }

    thread(title: string) {
        return this.threads.find((thread) => thread.title === title) as Thread;
    }

    searchThreads(title: string | RegExp) {
        return this.threads.filter((thread) => thread.title && thread.title.match(title));
    }
}
