import React from "react";
import {Link} from "react-router-dom";
import {getUserType} from "../header/Header";

const TableRow = (props) => {
    function handleClick() {
        sessionStorage.setItem('person', props.item['id']);
    }

    return (
        <tr>
            <td>{props.item.name}</td>
            <td>{props.item.surname}</td>
            <td>{getUserType(props.item.type)}</td>
            <td>
                <Link
                    bsStyle="info"
                    onClick={handleClick.bind(this)}
                    to="/school/allgroups">
                    Grupy
                </Link>
            </td>
            <td>
                <Link
                    bsStyle="info"
                    onClick={handleClick.bind(this)}
                    to={'/user/' + props.item['id'] + '/payments/'}>
                    Płatności
                </Link>
            </td>
        </tr>
    );
}

export default TableRow;