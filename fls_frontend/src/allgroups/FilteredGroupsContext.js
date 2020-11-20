import React, {createContext, useState} from 'react';

export const FilteredGroupsContext = createContext();

export const FilteredGroupsProvider = props => {
    const [filteredGroups, setFilteredGroups] = useState([]);

    return (
        <FilteredGroupsContext.Provider value={[filteredGroups, setFilteredGroups]}>
            {props.children}
        </FilteredGroupsContext.Provider>
    );
}