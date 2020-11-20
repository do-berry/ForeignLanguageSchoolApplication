import React, {createContext, useContext, useState} from 'react';
import {AllUsersContext} from "./AllUsersContext";

export const FilteredUsersContext = createContext();

export const FilteredUsersProvider = props => {
    const [users, setUsers] = useContext(AllUsersContext);
    const [filteredUsers, setFilteredUsers] = useState([]);

    return (
        <FilteredUsersContext.Provider value={[filteredUsers, setFilteredUsers]}>
            {props.children}
        </FilteredUsersContext.Provider>
    );
}