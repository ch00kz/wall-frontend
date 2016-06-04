import React from "react";
import { Link } from "react-router";
import AuthStore from "../stores/AuthStore";

export default class Header extends React.Component {
    constructor() {
        super();
        this.updateUser = this.updateUser.bind(this);
        this.state = {
            user: false
        }
    }

    componentWillMount() {
        AuthStore.on("login", this.updateUser);
    }

    componentWillUnmount() {
        AuthStore.removeListener("login", this.updateUser);
    }

    updateUser() {
        console.log("update user triggered");
        const user = true;
        this.setState({user});
    }

    render() {
        return (
            <header>
                <div class="container">
                    <div id="logo-text">&gt;&gt; ./rant</div>
                    <nav class="header-nav">
                        <Link to="/">Wall</Link>
                        { this.state.user ? <Link to='notifications'>Notifications</Link> : null }
                        { this.state.user ? null : <Link to='login'>Login</Link> }
                    </nav>
                </div>
            </header>
        );
    }
}
