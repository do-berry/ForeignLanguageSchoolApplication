import React, {useContext, useState} from 'react';
import {Alert, Button, FormGroup} from "react-bootstrap";
import './AllUsers.css';
import InputField from "../registration/InputField";
import {AllUsersContext} from "../AllUsersContext";

const FindUser = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [noData, setNoData] = useState(false);

    const [users, setUsers] = useContext(AllUsersContext);

    function findUser() {
        if (name === '' && surname === '') {
            setNoData(true);
            setUsers([]);
        } else {
            setNoData(false);

            let myUsers = [];

            fetch('http://127.0.0.1:8000/user/finduserbysurnameandname', {
                method: 'post',
                body: JSON.stringify({
                    name: name,
                    surname: surname
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => res.json())
                .then(response => {
                    if (Object.keys(response).length > 0) {
                        Object.entries(response).map(([key, value]) => {
                            return myUsers.push(value);
                        })
                        setUsers(myUsers);
                    } else {
                        setUsers([]);
                    }
                });
        }
    }

    return (
        <div className='findUser'>
            <br/>
            <form>
                {noData === true &&
                <Alert bsStyle="warning" id='noDataAlert'>
                    Należy wprowadzić dane.
                </Alert>
                }
                <FormGroup controlId="formBasicText">
                    <InputField
                        id='name'
                        type="text"
                        placeholder="Imie"
                        value={name}
                        onChange={setName}
                    />
                    <InputField
                        id='surname'
                        type="text"
                        placeholder="Nazwisko"
                        value={surname}
                        onChange={setSurname}
                    />
                </FormGroup>
                <Button bsStyle="info" onClick={findUser}>Szukaj</Button>
            </form>
        </div>
    );
}

export default FindUser;