import React from 'react';
import {Day, Language, LanguageLevel} from "../stores/SchoolStore";
import {Link} from "react-router-dom";
import moment from "moment";
import 'moment/locale/pl';

export const AssignedGroupsTableRow = (props) => {
    let url = "/school/group/" + props.item.id;

    moment().locale('pl');

    return (
        <tr>
            <td>{props.item.room}</td>
            <td>{moment(props.item.date_hour, "HH:mm:ss").format('LT')}</td>
            <td>{Day[props.item.date_day]}</td>
            <td>{Language[props.item.language_name]}</td>
            <td>{LanguageLevel[props.item.language_level]}</td>
            <td><Link
                bsStyle="info"
                to={url}>
                Szczegóły
            </Link></td>
        </tr>
    );
}