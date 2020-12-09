import React, {createContext, useState} from 'react';

export const AllGroupsContext = createContext();

export const AllGroupsProvider = props => {
    const [groups, setGroups] = useState([]);

    return (
        <AllGroupsContext.Provider value={[groups, setGroups]}>
            {props.children}
        </AllGroupsContext.Provider>
    );
}