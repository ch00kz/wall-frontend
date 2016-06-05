import React from "react";
import { Link } from "react-router";

import AuthStore from "../stores/AuthStore";
import * as AuthActions from "../actions/AuthActions"


export default class Header extends React.Component {
    render() {
        console.log(this);
        return (
            <header>
                <div class="container">
                    <div id="logo-text">&gt;&gt; ./rant</div>
                    <nav class="header-nav">
                        <Link to="/">Wall</Link>
                        { this.props.isLoggedIn ? <Link to='notifications'>Notifications</Link> : null }
                        { this.props.isLoggedIn ? <a onClick={this.props.logout}>Logout</a> : null }
                        { this.props.isLoggedIn ? null : <Link to='login'>Login</Link> }
                    </nav>
                </div>
            </header>
        );
    }
}
