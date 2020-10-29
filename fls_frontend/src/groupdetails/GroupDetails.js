import React from 'react';
import {LessonList} from "../lessonlist/LessonList";
import {ShowNoteProvider} from "../lessondetails/ShowNoteContext";
import {MarksForStudent} from "./MarksForStudent";
import {MarksForGroup} from "./MarksForGroup";

export const GroupDetails = (props) => {


    return (
        <ShowNoteProvider>
            <div id='groupDetails'>
                <h1>Szczegoly</h1>
                <h4>Plan zajec</h4>
                <LessonList item={props.match.params.id}/>
                <br/> <br/>
                {sessionStorage.getItem('userType') === "STUDENT" &&
                    <MarksForStudent group={props.match.params.id}/>}
                {sessionStorage.getItem('userType') === "TEACHER" &&
                    <MarksForGroup group={props.match.params.id}/>}
            </div>
        </ShowNoteProvider>
    );
}