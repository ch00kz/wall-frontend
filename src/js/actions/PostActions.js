import dispatcher from "../dispatcher";

export function AddPostToStore(content) {
    dispatcher.dispatch({
        type: "ADD_POST_TO_STORE",
        content,
    })
}