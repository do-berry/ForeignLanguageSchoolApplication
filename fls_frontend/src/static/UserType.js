import React, {createContext, useState} from "react";

export const UserType = {
    STUDENT: 'student',
    TEACHER: 'lektor',
    CUSTOMER_ASSISTANT: 'doradca klienta',
    ADMIN: 'admin',
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
