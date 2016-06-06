import React from "react";
import AuthStore from "../stores/AuthStore";


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
            error: false,
        };
    }

    componentWillMount() {
        if (AuthStore.getUser()['pk']){
            console.log("redirecting..");
            hashHistory.replace('/');
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        // console.log(this.state);
        for (var key of Object.keys(this.state)){
            if (this.state[key] == "") {
                this.setState({
                    error: "There seem to be some problems with the form. Are there any empty fields? Perhaps the passwords don't match."
                });
                return
            }
        }
        console.log("looks like we're all good");
        // AuthActions.LoginUser(this.state.username, this.state.password);
    }

    // one handler to handle all the fields
    // target id needs to be the same as the key in state dict
    handleInputChange(e) {
        const field = {};
        field[e.target.id] = e.target.value;
        this.setState(field);
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                { this.state.error ? <div class="row"><div id="form-error" class="twelve columns">{ this.state.error }</div></div> : null }
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