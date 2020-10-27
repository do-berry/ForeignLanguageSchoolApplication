import React, {useEffect} from 'react';
import './MarksForStudent.css';

export const TableRowForStudent = (props) => {
    function incIndex(id) {
        return ++id;
    }

    return (
        <tr>
            <td>{incIndex(props.index)}</td>
            <td>{props.item.description}</td>
            <td>{props.item.value}</td>
        </tr>
    );
}