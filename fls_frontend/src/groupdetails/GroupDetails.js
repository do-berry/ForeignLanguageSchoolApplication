import React, {useEffect, useState} from 'react';
import {LessonList} from "../lessonlist/LessonList";
import {ShowNoteProvider} from "../lessondetails/ShowNoteContext";
import {MarksForStudent} from "./MarksForStudent";
import {MarksForGroup} from "./MarksForGroup";
import {getLanguageLevelValue, getLanguageValue} from "../stores/SchoolStore";
import {AllDatesProvider} from "../lessonlist/AllDatesContext";

export const GroupDetails = (props) => {
    const [language, setLanguage] = useState('');
    const [level, setLevel] = useState('');

    useEffect(() => {
        setLanguage(getLanguageValue(sessionStorage.getItem('language')));
        setLevel(getLanguageLevelValue(sessionStorage.getItem('level')));
    }, []);


    return (
        <ShowNoteProvider>
            <AllDatesProvider>
                <div id='groupDetails'>
                    <h1>Szczegóły dla grupy: {language} {level}</h1>
                    <h4>Plan zajęć</h4>
                    <LessonList item={props.match.params.id}/>
                    <br/> <br/>
                    {sessionStorage.getItem('userType') === "STUDENT" &&
                    <MarksForStudent group={props.match.params.id}/>}
                    {sessionStorage.getItem('userType') === "TEACHER" &&
                    <MarksForGroup group={props.match.params.id}/>}
                </div>
            </AllDatesProvider>
        </ShowNoteProvider>
    );
}