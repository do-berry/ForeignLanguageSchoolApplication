import React from 'react';
import {Button, ControlLabel, FormGroup} from "react-bootstrap";
import './AllUsers.css';
import InputField from "../registration/InputField";

class FindUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
        }
    }

    setInputValue(property, val) {
        this.setState({
            [property]: val
        });
        console.log(this.state[property]);
    }

    findUser = () => {
        fetch('http://127.0.0.1:8000/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                surname: this.state.surname
            })
        }).then(res => {
            if (!res.ok) {
                console.log(res.error());
            }
        });
    }

    render() {
        return (
            <div className='findUser'>
                <form>
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