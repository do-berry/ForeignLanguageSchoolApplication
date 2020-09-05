import React from 'react';
import {AssignedGroups} from "./AssignedGroups";
import {UserCredentials} from "./UserCredentials";

export const UserProfileSchema = () => {
    return (
        <div>
            <h4>Dane uzytkownika</h4>
            <UserCredentials/>
            <h4>Przypisany do grup</h4>
            <AssignedGroups/>
        </div>
    );
}