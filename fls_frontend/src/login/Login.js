import React from 'react';
import LoginForm from './LoginForm';
import './Login.css';
import isLoggedIn from './UserStore.js';

class Login extends React.Component {
    logOut() {
        isLoggedIn = false;
    }

    render() {
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
