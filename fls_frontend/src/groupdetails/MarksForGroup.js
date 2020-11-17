import React, {useEffect, useState} from 'react';
import {TableRowForStudent} from "./TableRowForStudent";
import {TableRowForGroup} from "./TableRowForGroup";
import {AddNewMark} from "./AddNewMark";

export const MarksForGroup = (props) => {
    const [studentsMarks, setStudentsMarks] = useState([]);

    useEffect(() => {
        let tmp = [];

        fetch('http://127.0.0.1:8000/school/group/get_marks_by_group', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "group": props.group
            })
        })
            .then(response => response.json())
            .then(response => {
                Object.entries(response).map(([key, value]) => {
                    return tmp.push(value);
                });
                setStudentsMarks(tmp);
                console.log(tmp);
            });

    }, []);

    return (
        <div>
            <h4>Oceny dla grupy</h4>
            <br/>
            <AddNewMark group={props.group}/>
            <br/>
            <table>
                <tr>
                    <th>l.p.</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Ocena</th>
                </tr>
                {studentsMarks.map((item, i) => <TableRowForGroup item={item} index={i}/>)}
            </table>
        </div>
    );
}