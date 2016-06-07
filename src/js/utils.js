import axios from "axios";
import  AuthStore from "./stores/AuthStore";

// have to do this as a function so we always have oen with proper headers,
// it will always check the authstore for the current user

export function httpClient() {
    const headers = {}
    const token = AuthStore.getToken();
    console.log("building new client with token", token);
    if (token){
        headers['Authorization'] = 'Token ' + token;
    }

    const client = axios.create({
        baseURL: 'http://0.0.0.0:9000',
        headers
    });
    return client
}

// sets value in state dict with a key of (field id)
export function handleInputChange(e) {
    const field = {};
    field[e.target.id] = e.target.value;
    this.setState(field);
}