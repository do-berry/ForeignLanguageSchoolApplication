import React, {useState} from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import InputField from "./InputField";
import FormGroup from "reactstrap/es/FormGroup";
import {Redirect} from "react-router";

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [correctLogin, setCorrectLogin] = useState(null);

    function doLogin() {
        try {
            fetch('http://127.0.0.1:8000/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.length !== 1) {
                        setCorrectLogin(false);
                    } else {
                        setCorrectLogin(true);

                        var type;
                        fetch('http://127.0.0.1:8000/user/type', {
                            method: 'post',
                            body: JSON.stringify({
                                username: username,
                                password: password
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }).then(resp => resp.json())
                            .then(resp => {
                                type = resp.user_type;
                                console.log(type);
                                sessionStorage.setItem("userType", type.toString());
                            });
                        sessionStorage.setItem("username", username.toString());
                        sessionStorage.setItem("userId", data[0]['pk']);
                        window.location.reload(false);
                    }
                });
        } catch (e) {
            console.log(e);
        }
    }

    if (sessionStorage.getItem("username") != null) {
        return (
            <Redirect to='/'/>
            // <div>
            //     <h1>Witaj {sessionStorage.getItem("username")}!</h1>
            //     <Button
            //         bsStyle="primary"
            //         bsSize="large"
            //         active
            //         onClick={doLogout.bind(this)}
            //     >
            //         Wyloguj
            //     </Button>
            // </div>
        );
    } else {
        return (
            <div className='loginForm'>
                {correctLogin === false &&
                <Alert bsStyle="warning">
                    <strong>Niepowodzenie logowania!</strong> Wprowadz poprawny login i haslo.
                </Alert>
                }
                <h1>Logowanie</h1>
                <br/>
                <Form>
                    <FormGroup controlId='usernameInput'>
                        <InputField
                            type='username'
                            placeholder='Nazwa uzytkownika'
                            value={username}
                            onChange={setUsername}
                        />
                    </FormGroup>
                    <FormGroup controlId='passwordInput'>
                        <InputField
                            type='password'
                            placeholder='Haslo'
                            value={password}
                            onChange={setPassword}
                        />
                    </FormGroup>
                    <Button
                        bsStyle='info'
                        bsSize="primary"
                        onClick={doLogin.bind(this)}
                        disabled={!username || !password}
                    >
                        Zaloguj
                    </Button>
                </Form>
            </div>
        )
    }
}

export default LoginForm;
