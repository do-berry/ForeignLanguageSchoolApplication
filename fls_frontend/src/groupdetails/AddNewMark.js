import React, {useEffect, useState} from 'react';
import './GroupMarks.css';
import moment from "moment";
import {Alert} from "react-bootstrap";

export const AddNewMark = (props) => {
    const [click, setClick] = useState(false);
    const [students, setStudents] = useState([]);
    const [buttonText, setButtonText] = useState('Dodaj nową ocenę');
    const [selected, setSelected] = useState({});
    const [selectedL, setSelectedL] = useState({});
    const [mark, setMark] = useState(1);
    const [description, setDescription] = useState('');
    const [student, setStudent] = useState({});
    const [lesson, setLesson] = useState({});
    const [lessons, setLessons] = useState(0);
    const [late, setLate] = useState(false);

    function fullName(item) {
        return item.name + " " + item.surname;
    }

    function getItemDate(item) {
        return item.date;
    }

    useEffect(() => {
        let tmp = [];

        fetch('http://127.0.0.1:8000/school/group/get_students_by_group', {
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
                setStudents(tmp);
            });

        let l = [];
        fetch('http://127.0.0.1:8000/school/alllessons', {
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
                    return l.push(value);
                });
                setLessons(l);
            });

    }, []);

    function save() {
        if (description === '' && student === {} && lesson === {}) {
            return;
        }

        moment().locale('pl');
        let current = moment().format('lll');
        console.log(current);
        let sel = moment(lesson.date).format('lll');
        console.log(sel);
        if (current >= sel) {
            console.log("Wczesniej");
            fetch('http://127.0.0.1:8000/school/group/marks', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "value": mark,
                    "description": description,
                    "lesson": {
                        "id": lesson.id
                    },
                    "group_assignment": {
                        "person": student.person_id,
                        "group": props.group
                    },
                    "teacher": {
                        "id": sessionStorage.getItem('userId')
                    }
                })
            });
            setLate(false);
        } else {
            console.log("Pozniej");
            setLate(true);
        }
    }

    function clicked() {
        setClick(!click);
        let text = click ? "Dodaj nową ocenę" : "Ukryj";
        setButtonText(text);
    }

    function selectStudent(value) {
        setSelected(value);
        setStudent(students[value[0]]);
        console.log(student);
        // console.log();
    }

    function selectLesson(value) {
        setSelectedL(value);
        setLesson(lessons[value[0]]);
        console.log(lesson);
        console.log(value);
    }

    return (
        <div id='form'>
            <button onClick={() => clicked()}>{buttonText}</button>
            <br/><br/>
            {late &&
            <div>
                <Alert bsStyle="warning" id='alert'>
                    <strong>Nie można wystawić oceny, jeśli lekcja się nie odbyła!</strong>
                </Alert>
            </div>
            }
            <br/>
            {click &&
            <div id='newMark'>Student:{'     '}
                <select id='select' className="form-control"
                        value={selected}
                        onChange={e => selectStudent(e.target.value)}>
                    <option>Wybierz studenta</option>
                    {Object.entries(students).map(item =>
                        <option value={item}>{fullName(item[1])}</option>
                    )}
                </select>
                {'     '}Lekcja:{'     '}
                <select id='select' className="form-control"
                        value={selectedL}
                        onChange={e => selectLesson(e.target.value)}>
                    <option>Wybierz lekcję</option>
                    {Object.entries(lessons).map(item =>
                        <option value={item}>{getItemDate(item[1])}</option>
                    )}
                </select>
                <br/>
                <br/>Ocena:{'     '}
                <input type='number' placeholder='ocena' id='mark' min='1'
                       value={mark} max='6'
                       onChange={e => setMark(e.target.value)}/>
                {'    '}Opis:{'     '}
                <input type='text' placeholder='opis' id='description'
                       value={description}
                       onChange={e => setDescription(e.target.value)}/>
                <br/><br/>
                <button onClick={save}>Zapisz</button>
            </div>
            }
            <br/>
        </div>
    );
}