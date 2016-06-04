import { EventEmitter } from "events";
import axios from "axios";

import dispatcher from "../dispatcher";


class AuthStore extends EventEmitter {
    constructor() {
        super();
        this.user = {};
        this.token = {};
    }

    login(username, password) {
        const self = this;
        axios.post('http://localhost:9000/api/auth/', {
            username,
            password
        })
        .then(function (response) {
            console.log(response);
            if (response.data.token) {
                self.token = response.data.token;
                self.user = response.data.user;
                this.emit("login");
            }
        });
    }

    // after being registered with dispatcher we'll have the opportunity to react
    // to any event that gets dispatched
    handleActions(action) {
        console.log("AuthStore received ACTION:", action);
        switch(action.type) {
            case "LOGIN_USER": {
                this.login(action.username, action.password);
                break;
            }
        }
    }
}

const authStore = new AuthStore;
dispatcher.register(authStore.handleActions.bind(authStore));
export default authStore;

console.log("AuthStore");
