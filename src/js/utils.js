import axios from "axios";
import  AuthStore from "./stores/AuthStore";

// have to do this as a function so we always have oen with proper headers,
// it will always check the authstore for the current user
const baseURL = 'http://0.0.0.0:9000';

export function httpClient() {
    const headers = {}
    const token = AuthStore.getToken();
    if (token){
        headers['Authorization'] = 'Token ' + token;
    }

    const client = axios.create({
        baseURL,
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

// sets value of errors field state
export function getFormErrors() {
    const errorsDict = AuthStore.getFormErrors();
    console.log(errorsDict);
    let errors = [];
    for(var key of Object.keys(errorsDict)){
        var _errors = errorsDict[key];
        for (var _error of _errors) {
            errors.push(_error);
        }
    }
    this.setState({errors});
}