import dispatcher from "../dispatcher";

export function UserLogin(username, password) {
    dispatcher.dispatch({
        type: "USER_LOGIN",
        username,
        password,
    })
}