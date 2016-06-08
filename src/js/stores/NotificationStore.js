import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

import * as utils from "../utils";
import AuthStore from "./AuthStore";


class NotificationStore extends EventEmitter {
    constructor() {
        super();
        this.notifications = [];
    }

    fetchNotifications(initial=false) {
        utils.httpClient().get('/api/notifications/').then((response) => {
            if (this.notifications.length != response.data.length) {
                this.notifications = response.data;
                if(!initial) {
                    this.emit("change");
                }
            }
        }).catch((response) => {
            console.log(response);
        });
    }

    getNotifications() {
        return this.notifications;
    }

    handleActions(action) {
        switch(action.type) {
            case "LAYOUT_LOADED": {
                setTimeout(()=> {
                    if (AuthStore.isAuthenticated()){
                        // give time to fetch user from cookie
                        this.fetchNotifications()
                    }
                }, 100);
                setInterval(()=> {
                    if (AuthStore.isAuthenticated()){
                        console.log("polling for notifications");
                        this.fetchNotifications()
                    }
                }, 60000);
                break;
            }
        }
    }
}

const notificationStore = new NotificationStore;
dispatcher.register(notificationStore.handleActions.bind(notificationStore));
export default notificationStore;
