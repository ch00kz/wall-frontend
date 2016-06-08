import React from "react";

import NotificationStore from "../stores/NotificationStore";

export default class Notification extends React.Component {
    constructor() {
        super();
        this.getNotifications = this.getNotifications.bind(this)
        this.state = {
            notifications: []
        }
    }

    componentWillMount() {
        this.getNotifications();
        NotificationStore.on("change", this.getNotifications);
    }

    componentWillUnmount() {
        NotificationStore.removeListener("change", this.getNotifications);
    }

    getNotifications() {
        this.setState({notifications: NotificationStore.getNotifications()});
    }

    render() {
        window.hey = this.state;
        return (
            <div class="notifications">
                { this.state.notifications.map((notification) => {
                    return <div key={ notification.pk } class="notification"> { notification.method } { notification.trigger }</div>
                })}
            </div>
        );
    }
}