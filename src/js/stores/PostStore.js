import { EventEmitter } from "events";
import axios from "axios";

import dispatcher from "../dispatcher";


class PostStore extends EventEmitter {
    constructor() {
        super();
        this.posts = [];
    }

    getAllFromStore() {
        return this.posts;
    }

    fetchPosts() {
        let self = this;
        axios.get('http://localhost:9000/api/posts/')
            .then(function(response) {
                self.posts = response.data;
                self.emit("change");
            });
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
                this.addPostToStore(action.content);
                break;
            }
            case "WALL_LOADED": {
               this.fetchPosts();
               break;
            }
        }
    }
}

const postStore = new PostStore;
dispatcher.register(postStore.handleActions.bind(postStore));
export default postStore;