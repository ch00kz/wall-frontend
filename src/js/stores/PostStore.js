import { EventEmitter } from "events";
import moment from "moment";

import dispatcher from "../dispatcher";
import AuthStore from "./AuthStore";
import httpClient from "../utils";


class PostStore extends EventEmitter {
    constructor() {
        super();
        this.posts = [];
    }

    fetchPosts() {
        httpClient().get('/api/posts/').then((response) => {
            this.posts = response.data;
            this.emit("change");
        });
    }

    getPosts() {
        return this.posts;
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
            "liked": false,
            "replies": [],
        });

        httpClient().post('/api/posts/',
        {
            date: moment(date),
            content,
            user: user.pk
        }).then((response) => {
            const id = response.data.id;
            // set id to be pk from created item and not the data we set it as. In case
            // of like or reply before data is pulled from server again
            for (var post of this.posts){
                if (post.id == date) {
                    post.id = id;
                    this.emit("change");
                    break;
                }
            }
        });
    }

    likePost(id, like) {
        httpClient().post(`/api/posts/${id}/like/`,
        {
           like,
        }).then((response) => {
            // update liked and like_cout in local post store
            for (var post of this.posts){
                if (post.id == id) {
                    post.liked = like;
                    like ? post.like_count ++ : post.like_count --;
                    this.emit("change");
                    break;
                }
            }
        });
    }

    // after being registered with dispatcher we'll have the opportunity to react
    // to any event that gets dispatched
    handleActions(action) {
        console.log("PostStore received ACTION:", action);
        switch(action.type) {
            case "ADD_POST": {
                this.addPost(action.content);
                break;
            }
            case "WALL_LOADED": {
               this.fetchPosts();
               break;
            }
            case "LAYOUT_LOADED": {
               this.fetchPosts();
               break;
            }
            case "LOGOUT_USER": {
               this.fetchPosts();
               break;
            }
            case "LIKE_POST": {
                this.likePost(action.id, true);
                break;
            }
            case "UNLIKE_POST": {
                this.likePost(action.id, false);
                break;
            }
        }
    }
}

const postStore = new PostStore;
dispatcher.register(postStore.handleActions.bind(postStore));
window.postStore = postStore;
export default postStore;