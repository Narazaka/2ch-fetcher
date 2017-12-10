import { Thread } from "./Thread";

export class Threads {
    private readonly threads: Thread[];

    constructor(threads: Thread[]) {
        this.threads = threads;
    }

    get titles() { return this.threads.map((thread) => thread.title); }

    all() {
        return this.threads;
    }

    title(title: string) {
        return this.threads.find((thread) => thread.title === title) as Thread;
    }

    datId(datId: string) {
        return this.threads.find((thread) => thread.datId === datId) as Thread;
    }

    datName(datName: string) {
        return this.threads.find((thread) => thread.datName === datName) as Thread;
    }

    searchByTitle(title: string | RegExp) {
        return this.threads.filter((thread) => thread.title && thread.title.match(title));
    }
}
