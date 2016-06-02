import React from "react";

export default class Post extends React.Component {
  render() {
    return (
      <article class="post">
        <div class="post-title">{this.props.user} ({this.props.emotion})</div>
        <div class="post-body">{this.props.content}</div>
      </article>
    );
  }
}