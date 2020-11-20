import React, {useContext, useState} from 'react';
import {Alert, Button, FormGroup} from "react-bootstrap";
import './AllUsers.css';
import InputField from "../registration/InputField";
import {AllUsersContext} from "../AllUsersContext";
import {FilteredUsersContext} from "../FilteredUsersContext";

const FindUser = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [noData, setNoData] = useState(false);

    const [users, setUsers] = useContext(AllUsersContext);
    const [filteredUsers, setFilteredUsers] = useContext(FilteredUsersContext);

    function findUser() {
        if (name === '' && surname === '') {
            setNoData(true);
            setUsers([]);
        } else {
            setNoData(false);

            setFilteredUsers(users.filter(item => {
                if (name === '') {
                    if (item.surname === surname) {
                        return item;
                    }
                } else {
                    if (item.name === name) {
                        return item;
                    }
                }
            }));

            console.log(filteredUsers);
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