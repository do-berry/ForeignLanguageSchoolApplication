import React, {useEffect} from 'react';
import {Redirect} from "react-router";

export const LogOut = () => {
    useEffect(() => {
        sessionStorage.clear();
    }, []);

    return (
        <Redirect to='/login'/>
    );
};