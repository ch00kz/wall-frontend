import React from "react";
import { hashHistory } from 'react-router';

import FormErrors from "./FormErrors";
import * as AuthActions from "../actions/AuthActions";
import AuthStore from "../stores/AuthStore";


import * as utils from "../utils";


export default class Login extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: "",
            password: "",
        };
    }

    componentWillMount() {
        if (AuthStore.isAuthenticated()){
            hashHistory.replace('/');
        }
        AuthStore.on("loginError", utils.getFormErrors.bind(this))
    }

    componentWillUnmount() {
        AuthStore.removeListener("loginError", utils.getFormErrors.bind(this));
    }

    handleSubmit(e) {
        e.preventDefault();
        const formKeys = ['username','password']
        for (var key of formKeys){
            if (this.state[key] == "") {
                this.setState({
                    errors: ["There seems to be a problem with the form. Are there any empty fields?."]
                });
                return;
            }
        }
        AuthActions.LoginUser(this.state.username, this.state.password);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                { this.state.errors ?
                    <FormErrors errors={ this.state.errors }></FormErrors>
                    : null
                }
                <div class="row">
                    <div class="six columns">
                        <label for="exampleEmailInput">Username</label>
                        <input class="u-full-width" type="text" id="username"
                            onChange={utils.handleInputChange.bind(this)}
                            value={this.state.username}
                         />
                    </div>
                </div>
                <div class="row">
                    <div class="six columns">
                        <label for="exampleEmailInput">Password</label>
                        <input class="u-full-width" type="password" id="password"
                            onChange={utils.handleInputChange.bind(this)}
                            value={this.state.password}
                        />
                    </div>
                </div>
                <button type="submit" class="button-primary">Login</button>
            </form>
        );
    }
}