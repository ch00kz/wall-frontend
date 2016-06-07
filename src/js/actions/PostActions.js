import dispatcher from "../dispatcher";

export function AddPost(content, emotion) {
    dispatcher.dispatch({
        type: "ADD_POST",
        content,
        emotion,
    })
}

export function LikePost(id, parent=null) {
    console.log(id,parent);
    dispatcher.dispatch({
        type: "LIKE_POST",
        id,
        parent,
    })
}

export function UnlikePost(id, parent=null) {
    dispatcher.dispatch({
        type: "UNLIKE_POST",
        id,
        parent,
    })
}