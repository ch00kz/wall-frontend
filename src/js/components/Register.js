import React from "react";

import FormErrors from "./FormErrors";
import AuthStore from "../stores/AuthStore";
import * as AuthActions from "../actions/AuthActions";

import * as utils from "../utils";

export default class Register extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            "loading": false,
            "errors": [],
        };
    }

    componentWillMount() {
        if (AuthStore.isAuthenticated()){
            console.log("redirecting..");
            hashHistory.replace('/');
        }
        AuthStore.on("regError", utils.getFormErrors.bind(this))
    }

    componentWillUnmount() {
        AuthStore.removeListener("regError", utils.getFormErrors.bind(this));
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({errors: []});
        this.setState({loading: true});
        const formKeys = ['username','email','firstName','lastName','password','confirmPassword']
        for (var key of formKeys){
            if (this.state[key] == "") {
                this.setState({
                    errors: ["There seems to be a problem with the form. Are there any empty fields?."]
                });
                this.setState({loading: false});
                return;
            }
        }
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                errors: ["Your passwords don't match."]
            });
            this.setState({loading: false});
            return;
        }
        AuthActions.RegisterUser(this.state);
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                { this.state.errors.length ?
                    <FormErrors errors={ this.state.errors }></FormErrors>
                    : null
                }
                <div class="row">
                    <div class="six columns">
                        <label>Username</label>
                        <input class="u-full-width" type="text" id="username"
                            onChange={utils.handleInputChange.bind(this)}
                            value={this.state.username}
                         />
                    </div>
                    <div class="six columns">
                        <label>Email</label>
                        <input class="u-full-width" type="email" id="email"
                            onChange={utils.handleInputChange.bind(this)}
                            value={this.state.email}
                         />
                    </div>
                </div>
                <div class="row">
                    <div class="six columns">
                        <label>First Name</label>
                        <input class="u-full-width" type="text" id="firstName"
                            onChange={utils.handleInputChange.bind(this)}
                            value={this.state.firstName}
                         />
                    </div>
                    <div class="six columns">
                        <label>Last Name</label>
                        <input class="u-full-width" type="text" id="lastName"
                            onChange={utils.handleInputChange.bind(this)}
                            value={this.state.lastName}
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
                    <div class="six columns">
                        <label for="exampleEmailInput">Confirm Password</label>
                        <input class="u-full-width" type="password" id="confirmPassword"
                            onChange={utils.handleInputChange.bind(this)}
                            value={this.state.confirmPassword}
                        />
                    </div>
                </div>
                <button type="submit" class="button-primary">Register
                { this.state.loading && !this.state.errors.length ? <i class="fa fa-cog fa-spin fa-2x fa-fw"></i> : null }
                </button>
            </form>
        );

    }
}