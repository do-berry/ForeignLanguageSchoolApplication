import React, {useContext, useEffect, useState} from 'react';
import {TableRowForStudent} from "./TableRowForStudent";
import './MarksForStudent.css';
import {AllDatesContext} from "../lessonlist/AllDatesContext";

export const MarksForStudent = (props) => {
    const [marks, setMarks] = useState([]);
    const [name, setName] = useState('');
    const [lesson, setLesson] = useState(0);
    const [dates, setDates] = useContext(AllDatesContext);
    const [filteredDates, setFilteredDates] = useState([]);
    const [date, setDate] = useState('');

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

        setFilteredDates(marks);
    }, []);

    function selectDate(val) {
        setDate(val);
        let tmp = marks.filter(item => {
            if (item.date === date) {
                return item;
            }
        });
        setFilteredDates(tmp);
        console.log(date);
        console.log(tmp);
    }

    return (
        <div>
            <h4>Oceny dla: {name}</h4>
            <div id='date'>
                <select className="form-control"
                        id='date'
                        value={date}
                        onChange={e => selectDate(e.target.value)}>
                    {Object.keys(dates).map(item =>
                        <option value={dates[item].date}>{dates[item].date}</option>
                    )}
                </select>
            </div>
            <table>
                <tr>
                    <th>Nr</th>
                    <th>Opis</th>
                    <th>Ocena</th>
                    <th>Data</th>
                    <th>Lekcja</th>
                    <th>Lektor</th>
                </tr>
                {filteredDates.map((item, i) => <TableRowForStudent item={item} index={i}/>)}
            </table>
        </div>
    );
}