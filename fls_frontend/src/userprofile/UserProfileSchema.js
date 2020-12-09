import React from 'react';
import {AssignedGroups} from "./AssignedGroups";
import {UserCredentials} from "./UserCredentials";
import {UserType} from "../static/UserType";

export const UserProfileSchema = () => {
    return (
        <div>
            <h4>Dane użytkownika</h4>
            <UserCredentials/>
            {sessionStorage.getItem('userType') !== UserType.CUSTOMER_ASSISTANT &&
            <AssignedGroups/>}
        </div>
    );
}