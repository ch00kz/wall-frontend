import React from "react";
import moment from "moment";

import Reply from "./Reply";
import * as PostActions from "../actions/PostActions";
import AuthStore from "../stores/AuthStore";
import * as utils from "../utils";

export default class Post extends React.Component {

    constructor(){
        super();
        this.state = {
        };
    }

    handleLikeClick() {
        if (this.props.isLoggedIn) {
            const alreadyLiked = this.props.liked;
            if (alreadyLiked) {
                PostActions.UnlikePost(this.props.id);
            } else {
                PostActions.LikePost(this.props.id);
            }
        }
        else {
            alert("You need to be logged in to do that.");
        }
    }

    reply() {
        PostActions.Reply(this.props.id, this.state.replyContent);
        this.setState({replyContent: ""});
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
                                    parent={this.props.id}
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
                { this.props.isLoggedIn ?
                    <div class="reply-to">
                        <textarea id="replyContent"
                            value={this.state.replyContent}
                            onChange={utils.handleInputChange.bind(this)}
                        ></textarea>
                        <div class="controls"><button onClick={this.reply.bind(this)}>Reply</button></div>
                    </div>
                    : null }
            </div>
        );
    }
}