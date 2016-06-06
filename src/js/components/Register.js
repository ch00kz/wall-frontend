import React from "react";
import AuthStore from "../stores/AuthStore";
import * as AuthActions from "../actions/AuthActions";


export default class Register extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getFormErrors = this.getFormErrors.bind(this);
        this.state = {
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
        };
    }

    componentWillMount() {
        if (AuthStore.isAuthenticated()){
            console.log("redirecting..");
            hashHistory.replace('/');
        }
        AuthStore.on("regError", this.getFormErrors)
    }

    componentWillUnmount() {
        AuthStore.removeListener("regError", this.getFormErrors);
    }

    handleSubmit(e) {
        e.preventDefault();
        // console.log(this.state);
        const formKeys = ['username','email','firstName','lastName','password','confirmPassword']
        for (var key of formKeys){
            if (this.state[key] == "") {
                this.setState({
                    errors: "There seems to be a problem with the form. Are there any empty fields?."
                });
                return;
            }
        }
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                errors: "Your passwords don't match."
            });
            return;
        }
        AuthActions.RegisterUser(this.state);
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

    render(){
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                { this.state.errors ? <div class="row"><ul id="form-error" class="twelve columns">{ this.state.errors }</ul></div> : null }
                <div class="row">
                    <div class="six columns">
                        <label>Username</label>
                        <input class="u-full-width" type="text" id="username"
                            onChange={this.handleInputChange.bind(this)}
                            value={this.state.username}
                         />
                    </div>
                    <div class="six columns">
                        <label>Email</label>
                        <input class="u-full-width" type="email" id="email"
                            onChange={this.handleInputChange.bind(this)}
                            value={this.state.email}
                         />
                    </div>
                </div>
                <div class="row">
                    <div class="six columns">
                        <label>First Name</label>
                        <input class="u-full-width" type="text" id="firstName"
                            onChange={this.handleInputChange.bind(this)}
                            value={this.state.firstName}
                         />
                    </div>
                    <div class="six columns">
                        <label>Last Name</label>
                        <input class="u-full-width" type="text" id="lastName"
                            onChange={this.handleInputChange.bind(this)}
                            value={this.state.lastName}
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
                    <div class="six columns">
                        <label for="exampleEmailInput">Confirm Password</label>
                        <input class="u-full-width" type="password" id="confirmPassword"
                            onChange={this.handleInputChange.bind(this)}
                            value={this.state.confirmPassword}
                        />
                    </div>
                </div>
                <button type="submit" class="button-primary">Register</button>
            </form>
        );

    }
}