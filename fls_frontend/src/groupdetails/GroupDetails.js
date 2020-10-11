import React from 'react';
import {LessonList} from "../lessonlist/LessonList";
import {ShowNoteProvider} from "../lessondetails/ShowNoteContext";

export const GroupDetails = (props) => {


    return (
        <ShowNoteProvider>
            <div id='groupDetails'>
                <h1>Szczegoly grupy</h1>
                <h4>Plan zajec</h4>
                <LessonList item={props.match.params.id}/>
            </div>
        </ShowNoteProvider>
    );
}