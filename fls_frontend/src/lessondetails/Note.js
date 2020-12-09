import React, {useContext, useEffect, useState} from 'react';
import {ShowNoteContext} from "./ShowNoteContext";

export const Note = () => {
    const [description, setDescription] = useState('');
    const [topic, setTopic] = useState('');
    const [show, setShow] = useContext(ShowNoteContext);
    const [created, setCreated] = useState('');
    var arr = [];

    useEffect(() => {
        let lesson = sessionStorage.getItem('lesson');
        fetch('http://127.0.0.1:8000/school/lesson/getnote', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": lesson
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    arr.push(data[0].fields.created);
                    arr.push(data[0].fields.description);
                    arr.push(data[0].fields.topic);
                }
                setCreated(arr[0]);
                setDescription(arr[1]);
                setTopic(arr[2]);
            });
    }, []);

    return (
        <div id='note'>
            {!show &&
            <h4>Brak notatki</h4>}
            <br/>
            {show &&
            <div id='shownNote'>
                <p><b>Temat:</b> {topic}</p>
                <p><b>Opis:</b> {description}</p>
                <p><b>Utworzono:</b> {created.substring(0, 10)}</p>
            </div>}
        </div>
    );
}