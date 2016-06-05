import React from "react";
import moment from "moment";

import * as PostActions from "../actions/PostActions";

export default class Post extends React.Component {

    constructor(){
        super();
        this.state = {};
    }

    handleLikeClick() {
        const alreadyLiked = this.state.liked;
        const likes = this.state.likes;
        if (alreadyLiked) {
            PostActions.UnlikePost(this.props.id);
            this.setState({likes: likes - 1});
            this.setState({liked: false});
        } else {
            PostActions.LikePost(this.props.id);
            this.setState({likes: likes + 1});
            this.setState({liked: true});
        }
    }

    componentWillMount() {
        const likes = this.props.likes;
        const liked = this.props.liked;
        this.setState({likes, liked});
    }

    render() {
        const date = moment(this.props.date).fromNow();
        return (
            <article class="post">
                <div class="post-header">
                    <div class="like">
                        <button class={this.state.liked ? "liked" : ""} onClick={this.handleLikeClick.bind(this)}>
                            <i class="fa fa-heart-o"></i>
                        </button>
                    </div>
                    <div class="user">{this.props.user}</div>
                    <div class="stats">
                        <span class="likes">{this.state.likes + " Likes"}</span>
                        <i class="fa fa-minus" aria-hidden="true"></i>
                        <span class="date">{date}</span>
                    </div>
                </div>
                <div class="post-body">{this.props.content}</div>
            </article>
        );
    }
}