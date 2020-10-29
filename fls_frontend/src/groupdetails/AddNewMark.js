import React, {useEffect, useState} from 'react';
import './GroupMarks.css';
import {ButtonToolbar, DropdownButton} from "react-bootstrap";
import {MenuItem} from "react-bootstrap";
import {UserType} from "../static/UserType";

export const AddNewMark = (props) => {
    const [click, setClick] = useState(false);
    const [students, setStudents] = useState([]);
    const [buttonText, setButtonText] = useState('Dodaj nowa ocene');
    const [selected, setSelected] = useState({});
    const [mark, setMark] = useState(1);
    const [description, setDescription] = useState('');
    const [student, setStudent] = useState({});

    function fullName(item) {
        return item.name + " " + item.surname;
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

    }, []);

    function save() {
        if (description === '') {
            return;
        }
        fetch('http://127.0.0.1:8000/school/group/marks', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "value": mark,
                "description": description,
                "group_assignment": {
                    "person": student.person_id,
                    "group": props.group
                }
            })
        }).then(
            window.location.reload(false)
    )
    }

    function clicked() {
        setClick(!click);
        let text = click ? "Dodaj nowa ocene" : "Ukryj";
        setButtonText(text);
    }

    function selectStudent(value) {
        setSelected(value);
        setStudent(students[value[0]]);
        console.log(student);
        // console.log();
    }

    return (
        <div>
            <button onClick={() => clicked()}>{buttonText}</button>
            <br/><br/>
            {click &&
            <div id='newMark'>
                <select className="form-control"
                        value={selected}
                        onChange={e => selectStudent(e.target.value)}>
                    {Object.entries(students).map(item =>
                        <option value={item}>{fullName(item[1])}</option>
                    )}
                </select>
                <br/>
                <input type='number' placeholder='ocena' id='mark' min='1'
                       value={mark} max='6'
                       onChange={e => setMark(e.target.value)}/>
                {'    '}
                <input type='text' placeholder='opis' id='description'
                       value={description}
                       onChange={e => setDescription(e.target.value)}/>
                <br/><br/>
                <button onClick={save}>Zapisz</button>
            </div>
            }
        </div>
    );
}