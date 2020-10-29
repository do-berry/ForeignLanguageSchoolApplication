import React from 'react'
import {TableRowForGroupMarks} from "./TableRowForGroupMarks";

export const TableRowForGroup = (props) => {
    function incIndex(id) {
        return ++id;
    }

    return (
        <tr>
            <td>{incIndex(props.index)}</td>
            <td>{props.item.name}</td>
            <td>{props.item.surname}</td>
            <TableRowForGroupMarks marks={props.item.marks} />
        </tr>
    );
}