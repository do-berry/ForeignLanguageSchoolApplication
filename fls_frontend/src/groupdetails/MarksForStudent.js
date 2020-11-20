import React, {useEffect, useState} from 'react';
import {TableRowForStudent} from "./TableRowForStudent";
import './MarksForStudent.css';

export const MarksForStudent = (props) => {
    const [marks, setMarks] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        let myMarks = [];
        let fullName = '';

        fetch('http://127.0.0.1:8000/school/group/get_marks_by_ga', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "person": sessionStorage.getItem('userId'),
                "group": props.group
            })
        })
            .then(response => response.json())
            .then(response => {
                Object.entries(response.marks).map(([key, value]) => {
                    return myMarks.push(value);
                });
                setMarks(myMarks);
                fullName = response.name + " " + response.surname;
                setName(fullName);
            });

    }, []);

    return (
        <div>
            <h4>Oceny dla: {name}</h4>
            <table>
                <tr>
                    <th>Nr</th>
                    <th>Opis</th>
                    <th>Ocena</th>
                    <th>Data</th>
                    <th>Lekcja</th>
                    <th>Lektor</th>
                </tr>
                {marks.map((item, i) => <TableRowForStudent item={item} index={i}/>)}
            </table>
        </div>
    );
}