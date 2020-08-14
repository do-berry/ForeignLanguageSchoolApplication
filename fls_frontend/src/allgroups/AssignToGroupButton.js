import React from 'react';
import {AssignmentResultPopover} from "./AssignmentResultPopover";


class AssignToGroupButton extends React.Component {
    handleChange = () => {
        return (
            <AssignmentResultPopover strong_message="aaaa" info_message="bb"/>
        );
    }

    render() {
        return (
            <a onClick={this.handleChange}>Zapisz</a>
        );
    }
}

export default AssignToGroupButton;