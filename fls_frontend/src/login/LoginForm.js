import React, {useState} from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import InputField from "./InputField";
import FormGroup from "reactstrap/es/FormGroup";
import {Redirect} from "react-router";

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    // const isLoggedIn = useSelector(state => state.isLoggedIn);
    const [correctLogin, setCorrectLogin] = useState(null);

    // const dispatch = useDispatch();

    function doLogin() {
        try {
            fetch('http://127.0.0.1:8000/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: btoa(JSON.stringify({
                        username: username,
                        password: password
                    }))
                })
            }).then(res => res.json())
                .then(data => {
                    if ((data === "User does not exist") ||
                        (data === "Incorrect password was used")) {
                        setCorrectLogin(false);
                        sessionStorage.setItem("isLoggedIn", false);
                    } else {
                        setCorrectLogin(true);
                        data = JSON.parse(atob(data));

                        sessionStorage.setItem("userType", data['user_type']);
                        //dispatch(isLoggedIn());
                        sessionStorage.setItem("isLoggedIn", true);
                        sessionStorage.setItem("userId", data['userId']);
                    }
                });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='loginForm'>
            {correctLogin &&
            <Redirect to='/'/>
            }
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

export default LoginForm;
