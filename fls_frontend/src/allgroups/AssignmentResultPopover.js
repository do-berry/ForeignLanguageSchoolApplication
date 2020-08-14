import React from 'react';
import {Alert} from "react-bootstrap";
import './Table.css';

export const AssignmentResultPopover = ({strong_message}) => {
    return (
        <div className='alert'>
            <Alert bsStyle="warning">
                <strong>{strong_message}</strong> Best check yo self, you're not looking too
                good.
            </Alert>
        </div>
    );
}