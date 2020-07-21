import React from 'react';
import './Register.css';
import {Button, Checkbox, Col, ControlLabel, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import UserCredentials from "./UserCredentials";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            is_student: false,
            is_teacher: false,
            is_customer_assistant: false,
            is_admin: false,
            name: '',
            surname: '',
            mobile_number: '',
            address: '',
            isRegistered: false,
            user: UserCredentials
        }
    }

    async register() {
        try {
            await fetch('http://127.0.0.1:8000/createuser', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    surname: this.state.surname,
                    name: this.state.name,
                    user: this.state.user,
                    mobile_number: this.state.mobile_number,
                    address: this.state.address
                })
            }).then(res => {
                if (res.ok) {
                    this.setState({
                        correctLogin: true,
                    })
                    window.$isLoggedIn = true;
                    this.forceUpdate()
                } else {
                    this.setState({
                        correctLogin: false,
                    })
                }
            });
            console.log(window.$isLoggedIn);
        } catch (e) {
            console.log(e);
        }
    }

    setInputValue(property, val) {
        val = val.trim();
        this.setState({
            [property]: val
        });
    }

    checkCheckbox = (prop) => {
        this.setState({
            [prop]: !this.state[prop]
        })
        console.log(this.state[prop])
    }

    render() {
        return (
            <div className='register'>
                <h1>Rejestracja uzytkownika</h1>
                <br/>
                <div className='registerForm'>
                    <Form horizontal>
                        <FormGroup className='username'>
                            <Row>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Username:
                                </Col>
                                <Col sm={8}>
                                    <FormControl type="text" placeholder="Username"/>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalPassword">
                            <Row>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Password
                                </Col>
                                <Col sm={8}>
                                    <FormControl type="password" placeholder="Password"/>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup className='name'>
                            <Row>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Imie:
                                </Col>
                                <Col sm={8}>
                                    <FormControl type="text" placeholder="Imie"/>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup className='surname'>
                            <Row>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Nazwisko:
                                </Col>
                                <Col sm={8}>
                                    <FormControl type="text" placeholder="Nazwisko"/>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup className='mobile-number'>
                            <Row>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Numer telefonu:
                                </Col>
                                <Col sm={8}>
                                    <FormControl type="number" placeholder="Numer telefonu"/>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup className='address'>
                            <Row>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Adres:
                                </Col>
                                <Col sm={8}>
                                    <FormControl type="text" placeholder="Adres"/>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </div>
                <div className='checkboxes'>
                    <Form>
                        <FormGroup>
                            <Checkbox inline
                                      checked={this.state.is_student}
                                      onChange={() => this.checkCheckbox('is_student')}
                            >Sluchacz</Checkbox>
                            <Checkbox
                                checked={this.state.is_teacher}
                                onChange={() => this.checkCheckbox('is_teacher')}
                            >Lektor</Checkbox>{' '}
                            <Checkbox inline
                                      checked={this.state.is_customer_assistant}
                                      onChange={() => this.checkCheckbox('is_customer_assistant')}
                            >Doradca klienta</Checkbox>
                            <Checkbox inline
                                      checked={this.state.is_admin}
                                      onChange={() => this.checkCheckbox('is_admin')}
                            >Administrator</Checkbox>
                        </FormGroup>
                    </Form>
                </div>

                <Button bsStyle="info" bsSize="large">
                    Zarejestruj
                </Button>
            </div>
        );
    }
}

export default RegisterForm;