import React from "react";
import {Link} from "react-router-dom";

const TableRow = (props) => {
    function handleClick() {
        sessionStorage.setItem('person', props.item['pk']);
    }

    return (
        <tr>
            <td>{props.item.name}</td>
            <td>{props.item.surname}</td>
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
                    to={'/user/' + props.item['pk'] + '/payments/'}>
                    Płatności
                </Link>
            </td>
        </tr>
    );
}

export default TableRow;