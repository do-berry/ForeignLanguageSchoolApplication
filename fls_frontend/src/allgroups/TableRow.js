import React, {useContext} from 'react';
import {Day, Language, LanguageLevel} from '../stores/SchoolStore';
import './Table.css';
import {Link} from "react-router-dom";
import moment from "moment";
import 'moment/locale/pl';
import {SavedAssignmentContext} from "../SavedAssignmentContext";

const TableRow = (props) => {
    const [savedAssignment, setSavedAssignment] = useContext(SavedAssignmentContext);


    function plan() {
        if (sessionStorage.getItem("group") !== null) {
            sessionStorage.removeItem("group");
        }
        sessionStorage.setItem('language', props.item.language_name);
        sessionStorage.setItem('level', props.item.language_level);
    }

    function handleClick() {
        sessionStorage.setItem('group', props.item['id']);

        fetch('http://127.0.0.1:8000/user/checkifpersonisassigned', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "person": props.person,
                "group": sessionStorage.getItem('group')
            })
        }).then(res => res.json())
            .then(res => {
                if (res === false) {
                    fetch('http://127.0.0.1:8000/user/assigntogroup', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            person: {id: props.person},
                            group: {id: sessionStorage.getItem('group')}
                        })
                    });

                    setSavedAssignment(true);
                    // sessionStorage.removeItem("person");
                    // sessionStorage.removeItem("group");
                } else {
                    setSavedAssignment(false);
                }
            });
    }

    moment().locale('pl');
    return (
        <tr>
            <td>{props.item.room}</td>
            <td>{moment(props.item.date_hour, "HH:mm:ss").format('LT')}</td>
            <td>{Day[props.item.date_day]}</td>
            <td>{Language[props.item.language_name]}</td>
            <td>{LanguageLevel[props.item.language_level]}</td>
            <td>{props.item.cost} PLN</td>
            <td>
                <Link
                    to={"/school/group/" + props.item['id']}
                    onClick={plan.bind(this)}
                    bsStyle="info">
                    Plan
                </Link>
            </td>
            {
                props.person > 0 &&
                <td>
                    <Link
                        bsStyle="info"
                        onClick={handleClick.bind(this)}>
                        Przypisz
                    </Link>
                </td>}
        </tr>
    );
}

export default TableRow;