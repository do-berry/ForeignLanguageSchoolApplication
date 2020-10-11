import React, {createContext, useState} from 'react';

export const ShowNoteContext = createContext();

export const ShowNoteProvider = props => {
    const [show, setShow] = useState(false);

    return (
        <ShowNoteContext.Provider value={[show, setShow]}>
            {props.children}
        </ShowNoteContext.Provider>
    );
}