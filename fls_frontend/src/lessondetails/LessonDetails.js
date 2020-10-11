import React, {useContext, useState} from 'react';
import {Note} from "./Note";
import {CreateUpdateNote} from "./CreateUpdateNote";
import {ShowNoteContext} from "./ShowNoteContext";

export const LessonDetails = () => {
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useContext(ShowNoteContext);

    function enableEdit() {
        setEdit(!edit);
    }

    function hideNote() {
        setShow(false);
    }

    return (
        <div id='lessonDetails'>
            <Note/>
            <br/>
            <div>
                {sessionStorage.getItem('userType') === "TEACHER" &&
                <button onClick={enableEdit}>Edytuj</button>}
                <button onClick={hideNote}>Ukryj</button>
            </div>
            <br/><br/>
            {edit ? <CreateUpdateNote/> : null}
        </div>
    );
}