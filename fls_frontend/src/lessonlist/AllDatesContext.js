import React, {createContext, useState} from 'react';

export const AllDatesContext = createContext();

export const AllDatesProvider = props => {
    const [dates, setDates] = useState([]);

    return (
        <AllDatesContext.Provider value={[dates, setDates]}>
            {props.children}
        </AllDatesContext.Provider>
    );
}