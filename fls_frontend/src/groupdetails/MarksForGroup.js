import React, {useContext, useEffect, useState} from 'react';
import {TableRowForGroup} from "./TableRowForGroup";
import {AddNewMark} from "./AddNewMark";
import './GroupMarks.css';
import {Button} from "react-bootstrap";
import {AllDatesContext} from "../lessonlist/AllDatesContext";

export const MarksForGroup = (props) => {
    const [studentsMarks, setStudentsMarks] = useState([]);
    const [marks, setMarks] = useState([]);
    const [lessonCount, setLessonCount] = useState(0);
    const [lesson, setLesson] = useState(0);
    const [dates, setDates] = useContext(AllDatesContext);
    const [filtered, setFiltered] = useState([]);
    const [notFiltered, setNotFiltered] = useState([]);

    useEffect(() => {
        let tmp = [];
        let m = [];

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
                Object.entries(response).map(([key, value]) => {
                    return m.push(value.marks);
                });
                setMarks(m);
                setNotFiltered(tmp);
                setFiltered(tmp);
                setLessonCount(dates.length);
            });

    }, []);

    function setFilter() {
        if (lesson === "default") {
            setFiltered(studentsMarks);
        } else {
            setFiltered(studentsMarks);
            let a = marks;
            let arr = studentsMarks.slice();
            var counter = -1;
            arr.map(student => {
                counter++;
                student.marks = a[counter].filter(mark => mark.lesson.toString() === lesson.toString())
            });
            setFiltered(arr);
        }
    }

    return (
        <div>
            <h4>Oceny dla grupy</h4>
            <br/>
            <AddNewMark group={props.group}/>
            <br/>
            <div id='date' className='form-inline'>
                <select className="form-control"
                        id='date'
                        value={lesson}
                        onChange={e => setLesson(e.target.value)}>
                    <option value={"default"} selected>Wybierz numer lekcji</option>
                    {Array.from({length: lessonCount}, (_, key) => {
                        let val = key + 1;
                        return <option value={val}>{val}</option>;
                    })}
                </select>{'   '}
                <Button id='filter' bsStyle="info" onClick={setFilter}>Filtruj</Button>
            </div>
            <br/>
            <table>
                <tr id='mytr'>
                    <th id='myth'>l.p.</th>
                    <th id='myth'>Imię</th>
                    <th id='myth'>Nazwisko</th>
                    <th id='notmyth'>Ocena</th>
                </tr>
                {filtered.map((item, i) => <TableRowForGroup item={item} index={i}/>)}
            </table>
            <br/>
        </div>
    );
}