import { Post } from "./Post";

export class Posts {
    private readonly posts: Array<Post | undefined>;

    constructor(posts: Array<Post | undefined>) {
        this.posts = posts;
    }

    count() {
        return this.posts.length;
    }

    all(includeDeleted?: true): Array<Post | undefined>;
    all(includeDeleted: false): Post[];
    all(includeDeleted = true) {
        if (includeDeleted) {
            return this.posts;
        } else {
            return this.posts.filter((post) => post);
        }
    }

    index(index: number) {
        return this.posts[index - 1];
    }

    indexRange(startIndex?: number, endIndex?: number, includeDeleted?: true): Array<Post | undefined>;
    indexRange(startIndex: number | undefined, endIndex: number | undefined, includeDeleted: false): Post[];
    indexRange(startIndex = 1, endIndex = 1001, includeDeleted = true) {
        const selected = this.posts.slice(startIndex - 1, endIndex - 1);

        return includeDeleted ? selected : selected.filter((post) => post);
    }

    filterById(id: string) {
        return this.posts.filter((post) => post && post.id === id);
    }

    filterByTrip(trip: string) {
        return this.posts.filter((post) => post && post.trip === trip);
    }
}
