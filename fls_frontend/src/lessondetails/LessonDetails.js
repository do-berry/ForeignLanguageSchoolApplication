import React, {useState} from 'react';
import {Note} from "./Note";
import {CreateUpdateNote} from "./CreateUpdateNote";

export const LessonDetails = () => {
    const [edit, setEdit] = useState(false);

    function enableEdit() {
        setEdit(!edit);
    }

    return (
        <div id='lessonDetails'>
            <Note/>
            <br/>
            {sessionStorage.getItem('userType') === "TEACHER" &&
            <button onClick={enableEdit}>Edytuj notatke</button>}
            <br/><br/>
            {edit ? <CreateUpdateNote/> : null}
        </div>
    );
}