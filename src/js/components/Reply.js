import React from "react";
import moment from "moment";

import * as PostActions from "../actions/PostActions";
import AuthStore from "../stores/AuthStore";

export default class Reply extends React.Component {

    constructor(){
        super();
        this.state = {
        };
    }

    handleLikeClick() {
        if (AuthStore.isAuthenticated()) {
            const alreadyLiked = this.props.liked;
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
        else {
            alert("You need to be logged in to do that.");
        }
    }

    componentWillMount() {
        const likeCount = this.props.likeCount;
        const liked = this.props.liked;
        this.setState({likeCount, liked});
    }

    render() {
        const date = moment(this.props.date).fromNow();
        const likeCount = this.state.likeCount
        const liked = this.state.liked
        return (
            <article class="reply">
                <div class="reply-header">
                    <div class="like">
                        <button class={this.props.liked ? "liked" : ""} onClick={this.handleLikeClick.bind(this)}>
                            <i class="fa fa-heart-o"></i>
                        </button>
                    </div>
                    <div class="user">{this.props.user}</div>
                    <div class="stats">
                        <span class="likes">{this.props.likeCount + " Likes"}</span>
                        <i class="fa fa-minus" aria-hidden="true"></i>
                        <span class="date">{date}</span>
                    </div>
                </div>
                <div class="reply-body">{this.props.content}</div>
            </article>
        );
    }
}