import React from 'react';
import {Day, Language, LanguageLevel} from "../stores/SchoolStore";
import {Link} from "react-router-dom";

export const AssignedGroupsTableRow = (props) => {
    return (
        <tr>
            <td>{props.item.room}</td>
            <td>{props.item.date_hour}</td>
            <td>{Day[props.item.date_day]}</td>
            <td>{Language[props.item.language_name]}</td>
            <td>{LanguageLevel[props.item.language_level]}</td>
            <td>
                <Link
                    bsStyle="info"
                    to="/school/allgroups">
                    Wybierz
                </Link>
            </td>
        </tr>
    );
}