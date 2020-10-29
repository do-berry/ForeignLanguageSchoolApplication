import React, {useContext, useEffect} from 'react';
import {ShowNoteContext} from "./ShowNoteContext";

export const TableRow = (props) => {
    const [show, setShow] = useContext(ShowNoteContext);

    function handleClick(id) {
        sessionStorage.setItem('lesson', id);
        setShow(true);
    }

    useEffect(() => {
        console.log("value: " + props.value);
    }, []);

    function incIndex(i) {
        return ++i;
    }

    return (
        <tr key={props.index}>
            <td>{incIndex(props.index)}</td>
            <td>{props.value.date}</td>
            <td>
                <button
                    className='btn'
                    onClick={() => handleClick(props.value.id)}
                >
                    Wybierz
                </button>
            </td>
        </tr>
    );
};