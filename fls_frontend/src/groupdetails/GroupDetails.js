import React from 'react';
import {LessonList} from "../lessonlist/LessonList";
import {PaymentTable} from "./PaymentTable";

export const GroupDetails = (props) => {
    return (
        <div id='groupDetails'>
            <h1>Szczegoly grupy</h1>
            <h4>Plan zajec</h4>
            <LessonList item={props.match.params.id}/>
            <br/>
            <br/>
            {sessionStorage.getItem("person") !== null &&
            <PaymentTable group={props.match.params.id}/>}
        </div>
    );
}