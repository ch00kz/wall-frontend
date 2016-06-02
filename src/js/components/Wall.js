import React from "react";

import Post from "./Post";
import PostStore from "../stores/PostStore";

export default class Wall extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: PostStore.getAllFromStore() // get intial state from post store
        }
    }

    // gets fired ONLY the  FIRST time component is about to be rendered.
    // good place to add event listeners
    componentWillMount() {
        PostStore.on("change", () =>{
            this.setState({
                posts: PostStore.getAllFromStore()
            });
        });
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