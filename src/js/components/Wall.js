import React from "react";

import Post from "./Post";
import TextBox from "./TextBox";
import PostStore from "../stores/PostStore";

import * as WallActions from "../actions/WallActions";

export default class Wall extends React.Component {
    constructor() {
        super();
        this.getPosts = this.getPosts.bind(this);
        this.state = {
            posts: PostStore.getAllFromStore(), // get intial state from post store
        }
    }

     getPosts() {
        this.setState({
            posts: PostStore.getAllFromStore()
        });
    }

    // gets fired ONLY the  FIRST time component is about to be rendered.
    // good place to add event listeners
    componentWillMount() {
        PostStore.on("change", this.getPosts);
        console.log(PostStore.listenerCount("change"));
        WallActions.WallLoaded();
    }
    // remove listeners from unbound components
    // so that they dont fire after component has been unmounted
     componentWillUnmount() {
        PostStore.removeListener("change", this.getPosts);
     }

    // For now just Adds post the store, todo: add async call

    render() {
        const posts = this.state.posts;
        // create an array of Post Components using array.map
        const postComponents = posts.map((post) => {
            return <Post
                key={post.id}
                content={post.content}
                emotion={post.emotion}
                user={post.user.first_name + " " + post.user.last_name}></Post>;
        });

    // on input change we set a value
    return (
        <div>
            <TextBox />
            { postComponents }
        </div>
        );
    }
}