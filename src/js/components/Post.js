import React from "react";

export default class Post extends React.Component {
    render() {
        return (
            <article class="post">
                <div class="post-header">
                    <div class="likes">
                        <button>
                            <i class="fa fa-heart-o"></i>
                        </button>
                    </div>
                    <div class="user">{this.props.user}</div>
                    <div class="emotion">
                        {this.props.emotion}
                        {this.props.likes}
                    </div>
                </div>
                <div class="post-body">{this.props.content}</div>
            </article>
        );
    }
}