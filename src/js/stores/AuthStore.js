import { EventEmitter } from "events";
import axios from "axios";

import dispatcher from "../dispatcher";


class AuthStore extends EventEmitter {
    constructor() {
        super();
        this.posts = [];
    }

    // after being registered with dispatcher we'll have the opportunity to react
    // to any event that gets dispatched
    handleActions(action) {
        console.log("AuthStore received ACTION:", action);
        switch(action.type) {
            case "LOGIN_USER": {
                console.log(action.username, action.password)
                break;
            }
        }
    }
}

const authStore = new AuthStore;
dispatcher.register(authStore.handleActions.bind(authStore));
export default authStore;