import React from "react";
import { Link } from "react-router";


export default class Header extends React.Component {
  render() {
    return (
      <header>
        <Link to="/"><div id="logo"></div></Link>
        <div id="logo-text">KEYBOARD WARRIORS</div>
        <nav class="header-nav">
          <Link to='notifications'>Notifications</Link>
          <Link to='login'>Login</Link>
        </nav>
      </header>
    );
  }
}
