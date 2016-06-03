import React from "react";

// import just as you did an object
import * as PostActions from "../actions/PostActions";

export default class TextBox extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    createNewPost() {
        PostActions.AddPostToStore(this.state.newContent);
    }

    handleInputChange(e){
        const newContent = e.target.value;
        this.setState({newContent});
    }

    render() {
        return (
            <div class="new-post-textbox">
                <textarea placeholder="Be Respectful"
                    value={this.state.newContent}
                    onChange={this.handleInputChange.bind(this)}></textarea>
                <div class="controls">
                    <button class="button-primary" onClick={this.createNewPost.bind(this)}>Post</button>
                </div>
            </div>
        );
    }
}
