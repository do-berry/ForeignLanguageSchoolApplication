import React, {useContext} from 'react';
import {LessonListTable} from "./LessonListTable";
import {AddLessons} from "./AddLessons";
import {ShowNoteContext} from "../lessondetails/ShowNoteContext";
import {LessonDetails} from "../lessondetails/LessonDetails";

export const LessonList = (props) => {
    const [show, setShow] = useContext(ShowNoteContext);

    function handleClick() {
        console.log(show.toString());
    }

    return (
        <div id='lessonlist'>
            <LessonListTable item={props.item}/>
            {sessionStorage.getItem('userType') === "CUSTOMER_ASSISTANT" &&
            <AddLessons item={props.item}/>}
            {show && <LessonDetails/>}
        </div>
    );
}