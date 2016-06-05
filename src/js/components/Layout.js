import React from "react";

import Header from './Header';

import * as AuthActions from "../actions/AuthActions"
import * as LayoutActions from "../actions/LayoutActions";

import AuthStore from "../stores/AuthStore";


export default class Layout extends React.Component {

    constructor() {
        super();
        this.updateLoginStatus = this.updateLoginStatus.bind(this);
        this.state = {
            isLoggedIn: false
        }
    }

    componentWillMount() {
        AuthStore.on("login", this.updateLoginStatus);
        AuthStore.on("logout", this.updateLoginStatus);
    }

    componentWillUnmount() {
        AuthStore.removeListener("login", this.updateLoginStatus);
        AuthStore.removeListener("logout", this.updateLoginStatus);
    }

    updateLoginStatus() {
        const isLoggedIn = true ? AuthStore.getUser()['pk'] : false;
        this.setState({isLoggedIn});
    }

    logout() {
        AuthActions.LogoutUser();
    }

    // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
    componentDidMount() {
        LayoutActions.LayoutLoaded();
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                isLoggedIn: this.state.isLoggedIn
            })
        );

        return (
            <div>
                <Header isLoggedIn={this.state.isLoggedIn} logout={this.logout} />
                <main class="container">
                    { childrenWithProps }
                </main>
            </div>
        );
    }
}