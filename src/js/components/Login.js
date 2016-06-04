import React from "react";

import * as AuthActions from "../actions/AuthActions";
import AuthStore from "../stores/AuthStore";

import { hashHistory } from 'react-router';


export default class Login extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: "",
            password: ""
        };
    }

    componentWillMount() {
        if (AuthStore.getUser()){
            hashHistory.replace('/');
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        AuthActions.LoginUser(this.state.username, this.state.password);
    }

    // one handler to handle all the fields
    // target id needs to be the same as the key in state dict
    handleInputChange(e) {
        const field = {};
        field[e.target.id] = e.target.value;
        this.setState(field);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div class="row">
                    <div class="six columns">
                        <label for="exampleEmailInput">Username</label>
                        <input class="u-full-width" type="text" id="username"
                            onChange={this.handleInputChange.bind(this)}
                            value={this.state.username}
                         />
                    </div>
                </div>
                <div class="row">
                    <div class="six columns">
                        <label for="exampleEmailInput">Password</label>
                        <input class="u-full-width" type="password" id="password"
                            onChange={this.handleInputChange.bind(this)}
                            value={this.state.password}
                        />
                    </div>
                </div>
                <button type="submit" class="button-primary">Login</button>
            </form>
        );
    }
}