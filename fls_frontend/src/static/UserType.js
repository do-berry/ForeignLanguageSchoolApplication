import React, {createContext, useState} from "react";

export const UserType = {
    STUDENT: 'STUDENT',
    TEACHER: 'TEACHER',
    CUSTOMER_ASSISTANT: 'CUSTOMER_ASSISTANT',
    ADMIN: 'ADMIN',
}

export const UserTypeContext = createContext();

export const UserTypeProvider = props => {
    const [userType, setUserType] = useState('');

    return (
        <UserTypeContext.Provider value={[userType, setUserType]}>
            {props.children}
        </UserTypeContext.Provider>
    );
};
