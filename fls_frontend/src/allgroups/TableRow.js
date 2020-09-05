import React, {useContext} from 'react';
import {Day, Language, LanguageLevel} from '../stores/SchoolStore';
import './Table.css';
import {Link} from "react-router-dom";
import {SavedAssignmentContext} from "../SavedAssignmentContext";

const TableRow = (props) => {
    const [savedAssignment, setSavedAssignment] = useContext(SavedAssignmentContext);

    function handleClick() {
        sessionStorage.setItem('group', props.item['id']);

        fetch('http://127.0.0.1:8000/user/checkifpersonisassigned', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "person": sessionStorage.getItem('person'),
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
                            person: {id: sessionStorage.getItem('person')},
                            group: {id: sessionStorage.getItem('group')}
                        })
                    });

                    //sessionStorage.setItem('saved', true);
                    setSavedAssignment(true);
                } else {
                    setSavedAssignment(false);
                    //sessionStorage.setItem('saved', false);
                }
            });
    }

    return (
        <tr>
            <td>{props.item.room}</td>
            <td>{props.item.date_hour}</td>
            <td>{Day[props.item.date_day]}</td>
            <td>{Language[props.item.language_name]}</td>
            <td>{LanguageLevel[props.item.language_level]}</td>
            <td>{props.item.language_cost}</td>
            <td>
                <Link
                    bsStyle="info"
                    onClick={handleClick.bind(this)}>
                    Wybierz
                </Link>
            </td>
        </tr>
    );
}

export default TableRow;