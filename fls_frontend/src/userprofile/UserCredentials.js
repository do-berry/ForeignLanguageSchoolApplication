import React, {useEffect, useState} from 'react';
import './UserProfile.css';
import {Alert, Button, ButtonToolbar, Col, ControlLabel, Form, FormControl, Row} from "react-bootstrap";

export const UserCredentials = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [mobileNumber, setMobileNumber] = useState(0);
    const [address, setAddress] = useState('');
    const [editIsDisabled, setEditIsDisabled] = useState(true);
    const [saved, setSaved] = useState(false);
    const [notSaved, setNotSaved] = useState(false);
    const [student, setStudent] = useState(true);
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    function saveData() {
        if (!editIsDisabled) {
            if (password.length > 0) {
                if (password.localeCompare(confPassword)) {
                    console.log("wewn");
                    setNotSaved(true);
                    setSaved(false);
                    return;
                }
                console.log("warunek");
                fetch('http://127.0.0.1:8000/user/changepassword', {
                    method: 'put',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: sessionStorage.getItem('userId'),
                        password: password
                    })
                }).then(res => res.json())
                    .then(res => console.log(res));
            }

            fetch('http://127.0.0.1:8000/user/update', {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: sessionStorage.getItem('userId'),
                    surname: surname,
                    name: name,
                    mobile_number: mobileNumber,
                    address: address
                })
            }).then(res => {
                if (res.ok) {
                    setSaved(true);
                    setNotSaved(false);
                }
            });
            setEditIsDisabled(true);
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("userType") !== "STUDENT") {
            setStudent(false);
        }

        fetch('http://127.0.0.1:8000/user/getuserdata', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: sessionStorage.getItem('userId')
            })
        }).then(res => res.json())
            .then(data => {
                setName(data[0].fields.name);
                setSurname(data[0].fields.surname);
                setMobileNumber(data[0].fields.mobile_number);
                setAddress(data[0].fields.address);
            });
    }, []);

    return (
        <div id='userCredentialsForm'>
            {saved &&
            <Alert bsStyle="warning" id='savedAlert'>
                Dane zostały zapisane.
            </Alert>}
            {notSaved &&
            <Alert bsStyle="warning" id='savedAlert'>
                Hasło nie zostało zmienione. Wprowadź poprawne hasło i potwierdź.
            </Alert>}
            <div id='userCredentials'>
                <Form horizontal>
                    <Row>
                        <Col componentClass={ControlLabel} sm={2}>
                            Imię
                        </Col>
                        <Col sm={1.5}>
                            <FormControl
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                disabled={editIsDisabled}
                            />
                        </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                            Nazwisko
                        </Col>
                        <Col sm={1.5}>
                            <FormControl
                                type="text"
                                value={surname}
                                onChange={e => setSurname(e.target.value)}
                                disabled={editIsDisabled}
                            />
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col componentClass={ControlLabel} sm={2}>
                            Numer telefonu
                        </Col>
                        <Col sm={1.5}>
                            <FormControl
                                type="number"
                                max="999999999"
                                value={mobileNumber}
                                onChange={e => setMobileNumber(e.target.value)}
                                disabled={editIsDisabled}
                            />
                        </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                            Adres
                        </Col>
                        <Col sm={1.5}>
                            <FormControl
                                type="text"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                disabled={editIsDisabled}
                            />
                        </Col>
                    </Row>
                    <br/>
                    <h5>Zmiana hasła</h5>
                    <br/>
                    <Row>
                        <Col componentClass={ControlLabel} sm={2}>
                            Nowe hasło:
                        </Col>
                        <Col sm={1.5}>
                            <FormControl
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                disabled={editIsDisabled}
                            />
                        </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                            Potwierdź hasło:
                        </Col>
                        <Col sm={1.5}>
                            <FormControl
                                type="password"
                                value={confPassword}
                                onChange={e => setConfPassword(e.target.value)}
                                disabled={editIsDisabled}
                            />
                        </Col>
                    </Row>
                    <br/>
                    <div id='buttons'>
                        <Row><ButtonToolbar>
                            <Button
                                id='saveButton'
                                bsStyle='info'
                                onClick={saveData}
                            >Zapisz</Button>
                            <Button
                                id='editButton'
                                bsStyle='info'
                                onClick={() => setEditIsDisabled(false)}
                            >Edytuj</Button>
                            <Button
                                id='editButton'
                                disabled={!student}
                                bsStyle='info'
                                href={'/user/' + sessionStorage.getItem('userId') + '/payments'}
                            >Płatności</Button>
                        </ButtonToolbar></Row>
                    </div>
                </Form>
            </div>
        </div>
    );
}