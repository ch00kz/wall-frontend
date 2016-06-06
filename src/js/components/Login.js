import React from "react";

import * as AuthActions from "../actions/AuthActions";
import AuthStore from "../stores/AuthStore";

import { hashHistory } from 'react-router';


export default class Login extends React.Component {
    constructor() {
        super();
        this.getFormErrors = this.getFormErrors.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: "",
            password: "",
        };
    }

    componentWillMount() {
        if (AuthStore.isAuthenticated()){
            console.log("redirecting..");
            hashHistory.replace('/');
        }
        AuthStore.on("loginError", this.getFormErrors)
    }

    componentWillUnmount() {
        AuthStore.removeListener("loginError", this.getFormErrors);
    }

    handleSubmit(e) {
        e.preventDefault();
        const formKeys = ['username','password']
        for (var key of formKeys){
            if (this.state[key] == "") {
                this.setState({
                    errors: "There seems to be a problem with the form. Are there any empty fields?."
                });
                return;
            }
        }
        AuthActions.LoginUser(this.state.username, this.state.password);
    }

    // one handler to handle all the fields
    // target id needs to be the same as the key in state dict
    handleInputChange(e) {
        const field = {};
        field[e.target.id] = e.target.value;
        this.setState(field);
    }

    getFormErrors() {
        const errorsDict = AuthStore.getFormErrors();
        console.log(errorsDict);
        let errors = [];
        for(var key of Object.keys(errorsDict)){
            var _errors = errorsDict[key];
            console.log(_errors);
            errors = _errors.map((_error) => {
                console.log(_error);
                return <li>{_error}</li>
            });
        }
        this.setState({errors});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                { this.state.errors ? <div class="row"><ul id="form-error" class="twelve columns">{ this.state.errors }</ul></div> : null }
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