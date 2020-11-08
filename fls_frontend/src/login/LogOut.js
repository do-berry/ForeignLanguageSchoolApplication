import React, {useEffect} from 'react';
import {Redirect} from "react-router";

export const LogOut = () => {
    useEffect(() => {
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userType");
    }, []);

    return (
        <Redirect to='/login'/>
    );
};