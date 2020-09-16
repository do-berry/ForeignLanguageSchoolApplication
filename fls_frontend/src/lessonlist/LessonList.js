import React, {useState} from 'react';
import {LessonListTable} from "./LessonListTable";
import {Calendar} from "../groupdetails/Calendar";

export const LessonList = (props) => {
    const [calendarDisabled, setCalendarDisabled] = useState(false);

    function enable() {
        setCalendarDisabled(!calendarDisabled);
    }

    return (
        <div id='lessonlist'>
            <LessonListTable item={props.item}/>
            <br/>
            <button type='button' onClick={enable}>Uzupelnij daty zajec</button>
            <br/>
            <br/>
            {calendarDisabled ? <Calendar id={props.item}/> : null}
        </div>
    );
}