import React from "react";

import Post from "./Post";
import PostStore from "../stores/PostStore";
// import just as you did an object
import * as PostActions from "../actions/PostActions";

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
    }

    // For now just Adds post the store, todo: add async call
    createNewPost() {
        PostActions.AddPostToStore(this.state.newContent);
    }

    handleInputChange(e){
        const newContent = e.target.value;
        this.setState({newContent});
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

    // on input change we set a value
    return (
        <div>
            <br/>
            <input placeholder="Be Respectful"
                value={this.state.newContent}
                onChange={this.handleInputChange.bind(this)} />
            <button onClick={this.createNewPost.bind(this)}>Post</button>
            { postComponents }
        </div>
        );
    }
}