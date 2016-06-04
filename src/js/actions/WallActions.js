import dispatcher from "../dispatcher";

export function WallLoaded() {
    dispatcher.dispatch({
        type: "WALL_LOADED",
    })
}