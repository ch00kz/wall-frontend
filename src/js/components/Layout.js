import React from "react";

import Header from './Header';

import * as LayoutActions from "../actions/LayoutActions";

export default class Layout extends React.Component {

    // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
    componentDidMount() {
        LayoutActions.LayoutLoaded();
    }

    render() {
        return (
            <div>
                <Header />
                <main class="container">
                    {this.props.children}
                </main>
            </div>
        );
    }
}