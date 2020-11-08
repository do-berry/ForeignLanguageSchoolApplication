import React from 'react';
import {Redirect} from "react-router";

export const Homepage = () => {
    if (sessionStorage.getItem('isLoggedIn') === true) {
        return (
            <Redirect to='/user/profile'/>
        );
    } else {
        return (
            <Redirect to='/login'/>
        );
    }
}