import { EventEmitter } from "events";
import axios from "axios";

import dispatcher from "../dispatcher";
import AuthStore from "./AuthStore";


class PostStore extends EventEmitter {
    constructor() {
        super();
        this.posts = [];
    }

    fetchPosts() {
        axios.get('http://localhost:9000/api/posts/').then((response) => {
            this.posts = response.data;
            this.emit("change");
        });
    }

    addPost(content) {
        this.posts.unshift({
            id: Date.now(),
            time: Date.now(),
            user: AuthStore.getUser(),
            content,
            "like_count": 0,
        });
        this.emit("change");
    }

    // after being registered with dispatcher we'll have the opportunity to react
    // to any event that gets dispatched
    handleActions(action) {
        // console.log("PostStore received ACTION:", action);
        switch(action.type) {
            case "ADD_POST": {
                this.addPost(action.content);
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