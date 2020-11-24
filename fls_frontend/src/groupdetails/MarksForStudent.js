import React, {useContext, useEffect, useState} from 'react';
import {TableRowForStudent} from "./TableRowForStudent";
import './MarksForStudent.css';
import {AllDatesContext} from "../lessonlist/AllDatesContext";
import {Button} from "react-bootstrap";

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
                setFilteredDates(myMarks);
                fullName = response.name + " " + response.surname;
                setName(fullName);
            });
    }, []);

    function selectDate(val) {
        setDate(val);
        setFilter(val);
    }

    function setFilter(val) {
        let arr = marks.filter(mark => {
            if (mark.)
        });
    }

    return (
        <div>
            <h4>Oceny dla: {name}</h4>
            <div id='date' className='form-inline'>
                <select className="form-control"
                        id='date'
                        value={lesson}
                        onChange={e => setLesson(e.target.value)}>
                    <option selected>Wybierz numer lekcji</option>
                    {Object.keys(dates).map((item, index) => {
                        var i = ++index;
                        return <option value={i}>{i}</option>;
                    })}
                </select>{'   '}
                <Button id='filter' bsStyle="info" onClick={setFilter}>Filtruj</Button>
            </div>
            <table>
                <tr>
                    <th>Nr</th>
                    <th>Opis</th>
                    <th>Ocena</th>
                    <th>Data wystawienia</th>
                    <th>Numer lekcji</th>
                    <th>Lektor</th>
                </tr>
                {filteredDates.map((item, i) => <TableRowForStudent item={item} index={i}/>)}
            </table>
        </div>
    );
}