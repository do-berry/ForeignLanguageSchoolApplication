import React from 'react';
import RegisterForm from "./RegisterForm";

class Register extends React.Component {
    componentDidMount() {
        sessionStorage.removeItem("person");
        sessionStorage.removeItem("group");
    }

    render() {
        return (
            <div className='registerForm'>
                <RegisterForm/>
            </div>
        );
    }
}

export default Register;