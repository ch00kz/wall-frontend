import { EventEmitter } from "events";
import cookie from "react-cookie";
import { hashHistory } from 'react-router';

import * as utils from "../utils";
import dispatcher from "../dispatcher";


class AuthStore extends EventEmitter {
    constructor() {
        super();
        this.user = {};
        this.token = "";
        this.authenticatedUser = false;
        this.formErrors = {}
    }

    register(formData) {
        const data = {
            username: formData.username,
            password: formData.password,
            email: formData.email,
            first_name: formData.firstName,
            last_name: formData.lastName,
        }
        utils.httpClient().post('/api/auth/user/', data).then((response) => {
            console.log(response);
            if (response.status == 201) {
                this.login(formData.username, formData.password);
            } else {
                console.log("wtf happened");
            }
        }).catch((response)=>{
            console.log(response);
            this.formErrors = response.data
            this.emit("regError");
        });
    }

    login(username, password) {
        utils.httpClient().post('/api/auth/', {
            username,
            password
        })
        .then((response) => {
            if (response.data.token) {
                this.token = response.data.token;
                this.user = response.data.user;
                this.authenticatedUser = true;
                cookie.save('user', this.user, { path: '/' });
                cookie.save('token', this.token, { path: '/' });
                this.emit("login");
                hashHistory.replace('/');
            }
        }).catch((response) => {
            this.formErrors = response.data
            this.emit("loginError");
        });
    }

    getUserFromCookie() {
        const user = cookie.load('user');
        const token = cookie.load('token');
        if (user && token) {
            this.user = user;
            this.token = token;
            this.authenticatedUser = true;
            this.emit("login");
        } else {
            this.emit("logout");
        }
    }

    logout() {
        this.token = "";
        this.user = {};
        this.authenticatedUser = false;
        cookie.remove('token', { path: '/' });
        cookie.remove('user', { path: '/' });
        this.emit("logout");
    }

    // convenience methods

    getUser() {
        return this.user;
    }

    isAuthenticated() {
        return this.authenticatedUser;
    }

    getToken() {
        return this.token;
    }

     getFormErrors() {
        return this.formErrors;
    }

    // after being registered with dispatcher we'll have the opportunity to react
    // to any event that gets dispatched
    handleActions(action) {
        // console.log("AuthStore received ACTION:", action);
        switch(action.type) {
            case "LOGIN_USER": {
                this.login(action.username, action.password);
                break;
            }
            case "LOGOUT_USER": {
                this.logout();
                break;
            }
            case "LAYOUT_LOADED": {
                this.getUserFromCookie();
                break;
            }
            case "REGISTER_USER": {
                this.register(action.formData);
                break;
            }
        }
    }
}

const authStore = new AuthStore;
dispatcher.register(authStore.handleActions.bind(authStore));
export default authStore;
window.authStore = authStore
