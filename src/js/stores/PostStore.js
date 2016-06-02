import { EventEmitter } from "events";

class PostStore extends EventEmitter {
    constructor() {
        super();
        this.posts = [
            {
                id: 1,
                content: "This really is a shit post.",
                user: "Angry Person",
                emotion: "Triggered",
            },
            {
                id: 2,
                content: "React is kinda cool ...",
                user: "Angry Person",
                emotion: "Happy",
            },
            {
                id: 3,
                content: "Is this working",
                user: "Angry Person",
                emotion: "Confused",
            },
        ];
    }

    getAll() {
        return this.posts;
    }
}

const postStore = new PostStore;

export default postStore;