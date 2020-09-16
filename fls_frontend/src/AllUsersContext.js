import React, {createContext, useState} from 'react';

export const AllUsersContext = createContext();

export const AllUsersProvider = props => {
    const [users, setUsers] = useState([]);

    return (
        <AllUsersContext.Provider value={[users, setUsers]}>
            {props.children}
        </AllUsersContext.Provider>
    );
}