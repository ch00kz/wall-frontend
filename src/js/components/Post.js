import React from "react";

export default class Post extends React.Component {
  render() {
    return (
      <article class="post">
        <div class="post-title">{this.props.user} <i class="fa fa-minus"></i> <span class="emotion">{this.props.emotion}</span></div>
        <div class="post-body">{this.props.content}</div>
      </article>
    );
  }
}