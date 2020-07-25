import React from 'react';
import {Alert, Button, Control, Form} from "react-bootstrap";
import InputField from "./InputField";
import FormGroup from "reactstrap/es/FormGroup";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      correctLogin: null,
      isLoggedIn: false
    }
  }

  logOut() {
    window.$isLoggedIn = false;
    console.log(window.$isLoggedIn);
  }

  setInputValue(property, val) {
    val = val.trim();
    this.setState({
      [property]: val
    });
  }

  async doLogin() {
    try {
      let res = await fetch('http://127.0.0.1:8000/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      }).then(res => {
        if (res.ok) {
          this.setState({
            correctLogin: true,
          })
          window.$isLoggedIn = true;
          this.forceUpdate()
        }
        else {
          this.setState({
            correctLogin: false,
          })}
      });
      console.log(window.$isLoggedIn);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (!window.$isLoggedIn) {
      return (
        <div className='loginForm'>
          {this.state.correctLogin === false &&
          <Alert bsStyle="warning">
            <strong>Niepowodzenie logowania!</strong> Wprowadz poprawny login i haslo.
          </Alert>
          }
          <h1>Logowanie</h1>
          <br />
          <Form>
            <FormGroup controlId='usernameInput'>
              <InputField
                type='username'
                placeholder='Nazwa uzytkownika'
                value={this.state.username}
                onChange={(val) => this.setInputValue('username', val)}
              />
            </FormGroup>
            <FormGroup controlId='passwordInput'>
              <InputField
                type='password'
                placeholder='Haslo'
                value={this.state.password}
                onChange={(val) => this.setInputValue('password', val)}
              />
            </FormGroup>
            <Button
                bsStyle='info'
                bsSize="primary"
                onClick={this.doLogin.bind(this)}
                disabled={!this.state.username || !this.state.password}
            >
              Zaloguj
            </Button>
          </Form>
        </div>
      )}
    else {
      return(
          <div>
            <h1>Witaj {this.state.username}!</h1>
            <Button
                bsStyle="primary"
                bsSize="large"
                active
                onClick={this.logOut()}
            >
              Wyloguj
            </Button>
          </div>
      );
    }
  }
}

export default LoginForm;
