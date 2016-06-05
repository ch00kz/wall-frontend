import dispatcher from "../dispatcher";

export function AddPost(content, emotion) {
    dispatcher.dispatch({
        type: "ADD_POST",
        content,
        emotion,
    })
}