import { EventEmitter } from "events";
import axios from "axios";

import dispatcher from "../dispatcher";
import AuthStore from "./AuthStore";

import moment from "moment";

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
        const date = Date.now();
        const user = AuthStore.getUser();

        this.posts.unshift({
            id: Date.now(),
            date: date,
            user_data: user,
            content,
            "like_count": 0,
        });

        axios({
            url: 'http://localhost:9000/api/posts/',
            method: 'post',
            data: {
                date: moment(date),
                content,
                user: user.pk
            },
            headers: {'Authorization': 'Token ' + AuthStore.getToken()}
        }).then((response) => {
            const id = response.data.id;
            // set id to be pk from created item and not the data we set it as. In case
            // of like or reply before data is pulled from server again
            for (var post of this.posts){
                if (post.id == date) {
                    post.id = id;
                    break;
                }
            }
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