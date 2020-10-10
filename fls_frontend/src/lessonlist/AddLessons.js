import React, {useState} from 'react';
import {Calendar} from "../groupdetails/Calendar";

export const AddLessons = (props) => {
    const [calendarDisabled, setCalendarDisabled] = useState(false);

    function enable() {
        setCalendarDisabled(!calendarDisabled);
    }

    return (
        <div>
            <br/>
            <button type='button' onClick={enable}>Uzupelnij daty zajec</button>
            <br/>
            <br/>
            {calendarDisabled ? <Calendar id={props.item}/> : null}
        </div>
    );
};