import React from 'react';
import {UserProfileSchema} from "./UserProfileSchema";

export const UserProfile = () => {
    return (
        <div>
            <h1>Profil uzytkownika</h1>
            <UserProfileSchema/>
        </div>
    );
}