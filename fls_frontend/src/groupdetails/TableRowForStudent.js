import React from 'react';
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
            <td>{props.item.date}</td>
            <td>{props.item.lesson}</td>
            <td>{props.item.teacher}</td>
        </tr>
    );
}