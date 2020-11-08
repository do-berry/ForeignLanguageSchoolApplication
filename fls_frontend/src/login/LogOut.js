import React, {useEffect} from 'react';
import {Redirect} from "react-router";

export const LogOut = () => {
    useEffect(() => {
        sessionStorage.clear();
        window.location.reload(false);
    }, []);

    return (
        <Redirect to='/login'/>
    );
};