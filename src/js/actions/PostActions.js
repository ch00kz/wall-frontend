import dispatcher from "../dispatcher";

export function AddPost(content, emotion) {
    dispatcher.dispatch({
        type: "ADD_POST",
        content,
        emotion,
    })
}

export function LikePost(id) {
    dispatcher.dispatch({
        type: "LIKE_POST",
        id,
    })
}

export function UnlikePost(id) {
    dispatcher.dispatch({
        type: "UNLIKE_POST",
        id,
    })
}