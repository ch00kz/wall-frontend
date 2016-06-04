import dispatcher from "../dispatcher";

export function LoginUser(username, password) {
    dispatcher.dispatch({
        type: "LOGIN_USER",
        username,
        password,
    })
}