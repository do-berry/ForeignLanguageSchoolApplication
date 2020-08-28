import React, {createContext, useState} from "react";

export const UserType = {
    STUDENT: 'student',
    TEACHER: 'teacher',
    CUSTOMER_ASSISTANT: 'customer_assistant',
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
