import axios from "axios";
import  AuthStore from "./stores/AuthStore";

// have to do this as a function so we always have oen with proper headers,
// it will always check the authstore for the current user

function httpClient() {
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

export default httpClient