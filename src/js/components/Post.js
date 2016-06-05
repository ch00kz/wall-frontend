import React from "react";
import moment from "moment";

export default class Post extends React.Component {
    render() {
        const date = moment(this.props.date).fromNow()
        return (
            <article class="post">
                <div class="post-header">
                    <div class="like">
                        <button>
                            <i class="fa fa-heart-o"></i>
                        </button>
                    </div>
                    <div class="user">{this.props.user}</div>
                    <div class="stats">
                        <span class="likes">{this.props.likes + " Likes"}</span>
                        <i class="fa fa-minus" aria-hidden="true"></i>
                        <span class="date">{date}</span>
                    </div>
                </div>
                <div class="post-body">{this.props.content}</div>
            </article>
        );
    }
}