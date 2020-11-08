import React from 'react';
import './Register.css';
import {Alert, Button, Col, ControlLabel, Form, FormGroup, Row} from "react-bootstrap";
import InputField from "./InputField";
import {UserType} from "../static/UserType";

const UserCredentials = {
    username: '',
    password: '',
    is_student: false,
    is_teacher: false,
    is_customer_assistant: false,
    is_admin: false
};

const TmpUserType = {
    STUDENT: 'SLUCHACZ',
    TEACHER: 'LEKTOR',
    CUSTOMER_ASSISTANT: 'DORADCA KLIENTA'
};

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            mobile_number: '',
            address: '',
            username: '',
            password: '',
            userType: UserType.STUDENT,
            isRegistered: null,
            user: UserCredentials
        }
    }

    register() {
        try {
            fetch('http://127.0.0.1:8000/createuser', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    surname: this.state.surname,
                    name: this.state.name,
                    user: {
                        username: this.state.username,
                        password: this.state.password,
                        user_type: this.state.userType
                    },
                    mobile_number: this.state.mobile_number,
                    address: this.state.address
                })
            }).then(res => {
                if (res.ok) {
                    this.setState({
                        isRegistered: true,
                    })
                    this.forceUpdate()
                } else {
                    this.setState({
                        isRegistered: false,
                    })
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    setInputValue(property, val) {
        this.setState({
            [property]: val
        });
        console.log(this.state[property])
    }

    setInputValueForUserCredentials(property, val) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [property]: val
            }
        }));
    }

    checkCheckbox = (property) => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [property]: !prevState.user[property]
            }
        }));
    }

    render() {
        return (
            <div className='register'>
                {this.state.isRegistered === false &&
                <Alert id='registered' bsStyle="warning">
                    <strong>Nie udało się stworzyć użytkownika!</strong> Wprowadz poprawne dane.
                </Alert>
                }
                {this.state.isRegistered === true &&
                <Alert bsStyle="warning" id='registered'>
                    <strong>Uzytkownik zostal utworzony.</strong>
                </Alert>
                }
                <h1>Rejestracja uzytkownika</h1>
                <br/>
                <div className='registerForm'>
                    <Form horizontal>
                        <FormGroup className='username'>
                            <Row>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Username:
                                </Col>
                                <Col sm={9}>
                                    <InputField
                                        type="text"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={(val) => this.setInputValue(
                                            'username', val)}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalPassword">
                            <Row>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Password
                                </Col>
                                <Col sm={9}>
                                    <InputField
                                        type="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={(val) => this.setInputValue(
                                            'password', val)}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup className='name'>
                            <Row>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Imie:
                                </Col>
                                <Col sm={9}>
                                    <InputField
                                        type="text"
                                        placeholder="Imie"
                                        value={this.state.name}
                                        onChange={(val) => this.setInputValue('name', val)}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup className='surname'>
                            <Row>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Nazwisko:
                                </Col>
                                <Col sm={9}>
                                    <InputField
                                        type="text"
                                        placeholder="Nazwisko"
                                        value={this.state.surname}
                                        onChange={(val) => this.setInputValue('surname', val)}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup className='mobile-number'>
                            <Row>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Numer telefonu:
                                </Col>
                                <Col sm={9}>
                                    <InputField
                                        type="number"
                                        placeholder="Numer telefonu"
                                        value={this.state.mobile_number}
                                        onChange={(val) => this.setInputValue(
                                            'mobile_number', val)}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup className='address'>
                            <Row>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Adres:
                                </Col>
                                <Col sm={9}>
                                    <InputField
                                        type="text"
                                        placeholder="Adres"
                                        value={this.state.address}
                                        onChange={(val) => this.setInputValue(
                                            'address', val)}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </div>
                <div className='checkboxes'>
                    <Form>
                        <FormGroup>
                            <select className="form-control"
                                    value={this.state.userType}
                                    onChange={e => this
                                        .setInputValue('userType', e.target.value)}>
                                {Object.keys(TmpUserType).map(item =>
                                    <option value={item}>{TmpUserType[item]}</option>
                                )}
                            </select>
                        </FormGroup>
                    </Form>
                </div>
                <br/>
                <Button
                    bsStyle="info"
                    bsSize="large"
                    onClick={this.register.bind(this)}
                    disabled={!this.state.user || !this.state.name || !this.state.surname
                    || !this.state.mobile_number || !this.state.address}
                >
                    Zarejestruj
                </Button>
            </div>
        );
    }
}

export default RegisterForm;