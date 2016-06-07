import React from "react";

import Post from "./Post";
import TextBox from "./TextBox";

import AuthStore from "../stores/AuthStore";
import PostStore from "../stores/PostStore";

import * as WallActions from "../actions/WallActions";

export default class Wall extends React.Component {
    constructor() {
        super();
        this.getPosts = this.getPosts.bind(this);
        this.state = {
            posts: PostStore.getPosts(), // get intial state from post store
        }
    }

    getPosts() {
        this.setState({
            posts: PostStore.getPosts()
        });
    }

    // gets fired ONLY the  FIRST time component is about to be rendered.
    // good place to add event listeners
    componentWillMount() {
        PostStore.on("change", this.getPosts);
        WallActions.WallLoaded();
    }
    // remove listeners from unbound components
    // so that they dont fire after component has been unmounted
     componentWillUnmount() {
        PostStore.removeListener("change", this.getPosts);
     }

    // For now just Adds post the store, todo: add async call

    render() {
        // create an array of Post Components using array.map
        const postComponents = this.state.posts.map((post) => {
            return <Post
                key={post.id}
                id={post.id}
                content={post.content}
                date={post.date}
                likeCount={post.like_count}
                liked={post.liked}
                replies={post.replies}
                isLoggedIn={this.props.isLoggedIn}
                user={post.user_data.first_name + " " + post.user_data.last_name}></Post>;
        });

    return (
        <div>
            { this.props.isLoggedIn ? <TextBox /> : null}
            { postComponents }
        </div>
        );
    }
}