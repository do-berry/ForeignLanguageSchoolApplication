import React, {useEffect, useState} from 'react';
import {Redirect} from "react-router";

export const Homepage = () => {
    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("isLoggedIn") === "true") {
            setStatus(true);
            // window.location.reload(false);
        } else {
            setStatus(false);
        }
    }, []);


    return (
        <div>
            {status && <Redirect to='/user/profile'/>}
            {!status && <Redirect to='/login'/>}
        </div>
    );
}