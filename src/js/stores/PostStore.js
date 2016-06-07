import { EventEmitter } from "events";
import moment from "moment";

import dispatcher from "../dispatcher";
import AuthStore from "./AuthStore";
import * as utils from "../utils";


class PostStore extends EventEmitter {
    constructor() {
        super();
        this.posts = [];
    }

    fetchPosts() {
        utils.httpClient().get('/api/posts/').then((response) => {
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

        utils.httpClient().post('/api/posts/',
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

    likePost(id, parent, like) {
        utils.httpClient().post(`/api/posts/${id}/like/`,
        {
           like,
        }).then((response) => {
            // determine whether or not we are looking for post /  reply
            const updatingReply = parent ? true : false;

            for (var post of this.posts){
                const target = updatingReply ? parent : id;
                if (post.id == target) {

                    if(updatingReply){
                        // search through replies of parent
                        for(var reply of post.replies) {
                            if (reply.id == id) {
                                // update liked and like_count of reply in local store
                                reply.liked = like;
                                like ? reply.like_count ++ : reply.like_count --;
                                this.emit("change");
                                break;
                            }
                        }
                    } else {
                        // update liked and like_count of post in local store
                        post.liked = like;
                        like ? post.like_count ++ : post.like_count --;
                        this.emit("change");
                        break;
                    }
                }
            }
        });
    }

    reply(parent, content) {
        const date = Date.now();
        const user = AuthStore.getUser();

        utils.httpClient().post(`/api/posts/${parent}/reply/`,
        {
            content,
            date: moment(date),
        }).then((response) => {
            if (response.data.success) {
                console.log("good things happened");
                const id = response.data.reply_pk;
                for (var post of this.posts){
                    if(post.id == parent) {
                        post.replies.push({
                            id: id,
                            date: date,
                            user_data: user,
                            content,
                            "like_count": 0,
                            "liked": false,
                            "replies": [],
                        });
                        this.emit("change");
                        break;
                    }
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
                this.likePost(action.id, action.parent, true);
                break;
            }
            case "UNLIKE_POST": {
                this.likePost(action.id, action.parent, false);
                break;
            }
            case "REPLY": {
                this.reply(action.parent, action.content);
                break;
            }
        }
    }
}

const postStore = new PostStore;
dispatcher.register(postStore.handleActions.bind(postStore));
window.postStore = postStore;
export default postStore;