# 2ch-fetcher

[![Greenkeeper badge](https://badges.greenkeeper.io/Narazaka/2ch-fetcher.svg)](https://greenkeeper.io/)

2ch fetcher

## Install

```bash
npm install 2ch-fetcher
```

## Usage

```typescript
import { BBSMenu, Thread } from "./";

async function hierarchal() {
    const menu = new BBSMenu(); // default url is bbsmenu of 2ch.sc
    const boards = await menu.fetchBoards();
    console.log(boards.names);
    const threads = await boards.board("河川・ダム等").fetchThreads();
    console.log(threads.titles);
    console.log(threads.searchThreads(/なんとか/).map((thread) => thread.title));
    const posts = await threads.thread("なんとかスレ").fetchPosts();
    const post = posts.post(1); // 1 origin
    if (post) { // あぼーん post is undefined
        console.log(post.name);
    }
    console.log(posts.range(1, 2));
}

async function single() {
    const thread = new Thread("http://example.com/foobar/dat/123456789.dat", "title", 42);
    const posts = await thread.fetchPosts();
    console.log(posts.post(1));
}

hierarchal().then(single);
```

## License

This is released under [MIT License](https://narazaka.net/license/MIT?2017)
