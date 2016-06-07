import React from "react";
import moment from "moment";

import Reply from "./Reply";
import * as PostActions from "../actions/PostActions";
import AuthStore from "../stores/AuthStore";

export default class Post extends React.Component {

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

    reply(id) {
        console.log("Replying to", id);
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
            <div>
                <article class="post">
                    <div class="post-header">
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
                    <div class="post-body">{this.props.content}</div>
                    { this.props.replies.length ? <div class="replies-info">Comments</div> : null }
                    <div class="replies">
                        { this.props.replies.map((reply) => {
                            return (
                                <Reply
                                    key={reply.id}
                                    id={reply.id}
                                    content={reply.content}
                                    date={reply.date}
                                    likeCount={reply.like_count}
                                    liked={reply.liked}
                                    replies={reply.replies}
                                    user={reply.user_data.first_name + " " + reply.user_data.last_name}
                                >
                                </Reply>
                            )
                        })}
                    </div>
                </article>
                <div class="reply-to">
                    <textarea></textarea>
                    <div class="controls">
                        <button onClick={this.reply.bind(this)}>Reply</button>
                    </div>
                </div>
            </div>
        );
    }
}