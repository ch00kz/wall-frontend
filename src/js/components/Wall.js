import React from "react";

import Post from "./Post";
import postStore from "../stores/PostStore";

export default class Wall extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: postStore.getAll() // get intial state from post store
        }
    }

    render() {
        const posts = this.state.posts;
        // create an array of Post Components using array.map
        const postComponents = posts.map((post) => {
            return <Post
                key={post.id}
                content={post.content}
                emotion={post.emotion}
                user={post.user}></Post>;
        });

    return (
        <div>
            { postComponents }
        </div>
        );
    }
}