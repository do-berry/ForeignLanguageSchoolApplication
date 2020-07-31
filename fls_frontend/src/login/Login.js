import React from 'react';
import LoginForm from './LoginForm';
import SubmitButton from './SubmitButton';
import './Login.css';
import isLoggedIn from './UserStore.js';
import {Button} from "react-bootstrap";

class Login extends React.Component {
    logOut() {
        isLoggedIn = false;
    }

    render() {
        // if (UserStore.loading) {
        //     return (
        //         <div className='login'>
        //             <div className='container'>
        //                 Loading, please wait...
        //             </div>
        //         </div>
        //     );
        // }
        // else {
        //     if (UserStore.isLoggedIn) {
        //         return (
        //             <div className='login'>
        //                 <div className='container'>
        //                     Welcome {UserStore.username}
        //                     <SubmitButton
        //                         text={'Log out'}
        //                         disabled={false}
        //                         onClick={() => this.doLogout()}
        //                     />
        //                 </div>
        //             </div>
        //         );
        //     }
        //}
        return (
            <div className='login'>
                <div className='container'>
                    <LoginForm />
                </div>
            </div>
        );
    }
}

export default Login;
