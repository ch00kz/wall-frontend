import { EventEmitter } from "events";
import axios from "axios";
import cookie from "react-cookie";
import { hashHistory } from 'react-router';


import dispatcher from "../dispatcher";


class AuthStore extends EventEmitter {
    constructor() {
        super();
        this.user = {};
        this.token = {};
    }

    login(username, password) {
        axios.post('http://localhost:9000/api/auth/', {
            username,
            password
        })
        .then((response) => {
            if (response.data.token) {
                this.token = response.data.token;
                this.user = response.data.user;
                cookie.save('user', this.user, { path: '/' });
                cookie.save('token', this.token, { path: '/' });
                hashHistory.replace('/');
                this.emit("login");
            }
        });
    }

    getUserFromCookie() {
        const user = cookie.load('user');
        const token = cookie.load('token');
        if (user && token) {
            this.user = user;
            this.token = token;
            this.emit("login");
        }
        this.emit("logout");
    }

    logout() {
        this.token = {};
        this.user = {};
        cookie.remove('token', { path: '/' });
        cookie.remove('user', { path: '/' });
        this.emit("logout");
    }

    getUser() {
        return this.user;
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
        }
    }
}

const authStore = new AuthStore;
dispatcher.register(authStore.handleActions.bind(authStore));
export default authStore;
window.authStore = authStore
