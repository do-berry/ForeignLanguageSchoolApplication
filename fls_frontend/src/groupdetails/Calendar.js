import React, {useState} from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const Calendar = (props) => {
    const [date, setDate] = useState(new Date());

    function appendLeadingZeroes(n) {
        if (n <= 9) {
            return "0" + n;
        }
        return n
    }

    function formatDate(input) {
        let current_datetime = input;
        let formatted_date = current_datetime.getFullYear() + "-"
            + appendLeadingZeroes(current_datetime.getMonth() + 1) + "-"
            + appendLeadingZeroes(current_datetime.getDate());
        return formatted_date;
    }

    function addDate() {
        let dateToSend = formatDate(date);
        fetch('http://127.0.0.1:8000/school/createlesson', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: dateToSend,
                group: {id: props.id}
            })
        }).then(res => res.json());
        window.location.reload(false);
    }

    return (
        <div id='addDate'>
            <DatePicker
                selected={date}
                onChange={tmp => setDate(tmp)}
            />{'     '}
            <button type='button' onClick={addDate}>Dodaj datę</button>
        </div>
    );
}