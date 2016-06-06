import dispatcher from "../dispatcher";

export function LoginUser(username, password) {
    dispatcher.dispatch({
        type: "LOGIN_USER",
        username,
        password,
    })
}

export function LogoutUser() {
    dispatcher.dispatch({
        type: "LOGOUT_USER",
    })
}

export function RegisterUser(formData) {
    dispatcher.dispatch({
        type: "REGISTER_USER",
        formData
    })
}