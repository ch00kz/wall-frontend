import React from "react";
import { Link } from "react-router";


export default class Header extends React.Component {
    render() {
        return (
            <header>
                <div class="container">
                    <div id="logo-text">&gt;&gt; ./rant</div>
                    <nav class="header-nav">
                        <Link to="/">Wall</Link>
                        <Link to='notifications'>Notifications</Link>
                        <Link to='login'>Login</Link>
                    </nav>
                </div>
            </header>
        );
    }
}
