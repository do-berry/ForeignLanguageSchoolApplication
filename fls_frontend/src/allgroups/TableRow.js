import React from 'react';
import {Day, Language, LanguageLevel} from '../stores/SchoolStore';
import './Table.css';
import {Link} from "react-router-dom";

const TableRow = (props) => {
    function handleClick() {
        sessionStorage.setItem('group', props.item['id']);
        let response = false;

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
                response = res;
            });

        if (response) {
            fetch('http://127.0.0.1:8000/user/assigntogroup', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "person": {"id": sessionStorage.getItem('person')},
                    "group": {"id": sessionStorage.getItem('group')}
                })
            }).then(res => {
                if (res.ok) {
                    sessionStorage.setItem('saved', true);
                } else {
                    sessionStorage.setItem('saved', false);
                }
            });
        } else {
            sessionStorage.setItem('saved', false);
        }
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