import React, {useEffect, useState} from 'react';
import './LessonList.css';
import {TableRow} from "../lessondetails/TableRow";

export const LessonListTable = (props) => {
    const [lessonCounter, setLessonCounter] = useState(0);
    const [dates, setDates] = useState([]);

    function handleClick(id) {
        sessionStorage.setItem('lesson', id);
    }

    useEffect(() => {
        fetch('http://127.0.0.1:8000/school/alllessons', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "group": props.item
            })
        })
            .then(response => response.json())
            .then(data => {
                data.map(item => {
                    dates.push(item)
                });
                setLessonCounter(data.length);
            });
    }, []);

    return (
        <div id='lessonListTable'>
            {lessonCounter === 0 &&
            <div><h5>Nie wprowadzono zadnych dat.</h5></div>}
            <table id='listTable'>
                <tr>
                    <th>Nr</th>
                    <th>Data</th>
                    <th>Szczegóły lekcji</th>
                </tr>
                {lessonCounter > 0 &&
                dates.map((value, index) => {
                    return <TableRow value={value} index={index}/>
                })
                }
            </table>
        </div>
    );
}
