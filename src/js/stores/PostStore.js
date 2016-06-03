import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

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

    getAllFromStore() {
        return this.posts;
    }

    addPostToStore(content) {
        this.posts.unshift({
            id: Date.now(),
            user: "Angry Person",
            emotion: "Excited",
            content
        });
        this.emit("change");
    }

    // after being registered with dispatcher we'll have the opportunity to react
    // to any event that gets dispatched
    handleActions(action) {
        console.log("PostStore received ACTION:", action);
        switch(action.type) {
            case "ADD_POST_TO_STORE": {
                this.addPostToStore(action.content)
            }
        }
    }
}

const postStore = new PostStore;
dispatcher.register(postStore.handleActions.bind(postStore));
window.dispatcher = dispatcher;
export default postStore;