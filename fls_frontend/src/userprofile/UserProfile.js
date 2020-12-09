import React, {useEffect} from 'react';
import {UserProfileSchema} from "./UserProfileSchema";

export const UserProfile = () => {
    useEffect(() => {
        sessionStorage.removeItem("person");
        sessionStorage.removeItem("group");
    }, []);

    return (
        <div>
            <h1>Profil użytkownika</h1>
            <UserProfileSchema/>
        </div>
    );
}