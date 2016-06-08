import React from "react";

import * as utils from "../utils";

export default class FormErrors extends React.Component {

    constructor(){
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div class="row form-errors">
                { this.props.errors.map((error) => {
                    return <div key={Date.now()} class="error">{ error }</div>
                })}
            </div>
        );
    }
}