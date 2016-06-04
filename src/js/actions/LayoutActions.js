import dispatcher from "../dispatcher";

export function LayoutLoaded() {
    dispatcher.dispatch({
        type: "LAYOUT_LOADED",
    })
}