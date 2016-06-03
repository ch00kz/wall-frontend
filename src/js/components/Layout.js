import React from "react";

import Footer from './Footer';
import Header from './Header';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <main class="container"> {this.props.children} </main>
        <Footer />
      </div>
    );
  }
}