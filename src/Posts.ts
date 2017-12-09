import { Post } from "./Post";

export class Posts {
    readonly posts: Array<Post | undefined>;

    constructor(posts: Array<Post | undefined>) {
        this.posts = posts;
    }

    post(index: number) {
        return this.posts[index - 1];
    }

    range(startIndex = 1, endIndex = 1001) {
        return this.posts.slice(startIndex - 1, endIndex - 1);
    }
}
