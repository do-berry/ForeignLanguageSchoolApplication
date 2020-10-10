import React from 'react';
import {LessonListTable} from "./LessonListTable";
import {AddLessons} from "./AddLessons";

export const LessonList = (props) => {


    return (
        <div id='lessonlist'>
            <LessonListTable item={props.item}/>
            {sessionStorage.getItem('userType') === "CUSTOMER_ASSISTANT" &&
            <AddLessons item={props.item}/>}
        </div>
    );
}