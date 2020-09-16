import React, {useState} from 'react';
import './lessondetails.css';

export const CreateUpdateNote = () => {
    function save() {
        fetch('http://127.0.0.1:8000/school/lesson/createupdatenote', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                topic: topic,
                description: desc,
                lesson: {id: sessionStorage.getItem('lesson')}
            })
        });
        window.location.reload(false);
    }

    const [topic, setTopic] = useState('');
    const [desc, setDesc] = useState('');

    return (
        <div>
            <input type='text' placeholder='temat' id='topic'
                   value={topic}
                   onChange={e => setTopic(e.target.value)}/><br/><br/>
            <textarea placeholder='opis' rows='6' cols='47' id='description'
                      value={desc}
                      onChange={e => setDesc(e.target.value)}/><br/><br/>
            <button onClick={save}>Zapisz</button>
        </div>
    );
}