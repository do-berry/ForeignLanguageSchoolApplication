import React from 'react';
import './GroupMarks.css';

export const TableRowForGroupMarks = (props) => {
    function formatText() {
        let result = "";
        for (let i = 0; i < props.marks.length; i++) {
            let tmp = props.marks[i].value + " (" + props.marks[i].description + ", wyst.: " +
                props.marks[i].date + ", lekcja: " + props.marks[i].lesson + ")\n";
            result += tmp;
        }
        return result;
    }

    return (
      <td id='marks'>
          {formatText()}
      </td>
    );
}