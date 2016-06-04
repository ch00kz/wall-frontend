import React from "react";

import Post from "./Post";
import TextBox from "./TextBox";
import PostStore from "../stores/PostStore";

import * as WallActions from "../actions/WallActions";

export default class Wall extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: PostStore.getAllFromStore(), // get intial state from post store
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

        WallActions.WallLoaded();
    }

    // TODO: unbind listeners from unbound components (NB: input and button listeners)
    // so that they dont fire when component has been unmounted
    // Look into :componentWillUnmount

    // For now just Adds post the store, todo: add async call

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

    // on input change we set a value
    return (
        <div>
            <TextBox />
            { postComponents }
        </div>
        );
    }
}