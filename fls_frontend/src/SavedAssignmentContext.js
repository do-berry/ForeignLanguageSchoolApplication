import React, {createContext, useState} from 'react';

export const SavedAssignmentContext = createContext();

export const SavedAssignmentProvider = props => {
    const [savedAssignment, setSavedAssignment] = useState(null);

    return (
        <SavedAssignmentContext.Provider value={[savedAssignment, setSavedAssignment]}>
            {props.children}
        </SavedAssignmentContext.Provider>
    );
}