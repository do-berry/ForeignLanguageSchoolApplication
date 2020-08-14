import React from 'react';
import {Popover} from "react-bootstrap";

export const AssignmentResultPopover = (strong_message, info_message) => {
    return (
        <Popover id="popover-positioned-left" title="Popover left">
            <strong>{strong_message}</strong>{info_message}
        </Popover>
    );
}