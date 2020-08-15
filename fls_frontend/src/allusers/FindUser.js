import React from 'react';
import {Alert, Button, ControlLabel, FormGroup} from "react-bootstrap";
import './AllUsers.css';
import InputField from "../registration/InputField";

class FindUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            noData: false,
        }
    }

    setInputValue(property, val) {
        this.setState({
            [property]: val
        });
        console.log(this.state[property]);
    }

    findUser = () => {
        if (this.state.name == '' && this.state.surname == '') {
            this.setState({noData: true})
        } else {
            this.setState({noData: false})

            fetch('http://127.0.0.1:8000/user/finduserbysurnameandname', {
                method: 'post',
                body: JSON.stringify({
                    name: this.state.name,
                    surname: this.state.surname
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => res.json())
                .then(data => {
                    this.state.users = data;
                    console.log(this.state.users);
                });
        }
    }

    render() {
        return (
            <div className='findUser'>
                <form>
                    {this.state.noData === true &&
                    <Alert bsStyle="warning" id='noDataAlert'>
                        Nalezy wprowadzic dane.
                    </Alert>
                    }
                    <FormGroup controlId="formBasicText">
                        <ControlLabel>Wyszukaj osobe:</ControlLabel>
                        <InputField
                            id='name'
                            type="text"
                            placeholder="Imie"
                            value={this.state.name}
                            onChange={(val) => this.setInputValue('name', val)}
                        />
                        <InputField
                            id='surname'
                            type="text"
                            placeholder="Nazwisko"
                            onChange={(val) => this.setInputValue('surname', val)}
                        />
                    </FormGroup>
                    <Button bsStyle="info" onClick={this.findUser}>Szukaj</Button>
                </form>
            </div>
        );
    }
}

export default FindUser;