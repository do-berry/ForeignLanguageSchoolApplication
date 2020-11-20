import React, {useContext, useEffect} from 'react';
import {Alert, Table} from "react-bootstrap";
import TableRow from "../allusers/TableRow";
import {AllUsersContext} from "../AllUsersContext";
import {FilteredUsersContext} from "../FilteredUsersContext";

const UsersTable = () => {
    const [users, setUsers] = useContext(AllUsersContext);
    const [filteredUsers, setFilteredUsers] = useContext(FilteredUsersContext);

    useEffect(() => {
        let myUsers = [];

        fetch('http://127.0.0.1:8000/allpersons', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(response => {
                console.log(response);
                if (Object.keys(response).length > 0) {
                    Object.entries(response).map(([key, value]) => {
                        return myUsers.push(value);
                    })
                    setUsers(myUsers);
                    setFilteredUsers(myUsers);
                } else {
                    setUsers([]);
                }
            });
    }, []);

    return (
        <div className='usersTable'>
            {users.length <= 0 &&
            <Alert bsStyle="warning" id='alert'>
                <strong>Brak wynikow dla zapytania.</strong>
            </Alert>
            }
            <Table striped bordered condensed hover>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Przypisz do grupy</th>
                    <th>Płatności</th>
                </tr>
                {Object.entries(filteredUsers).map(([key, value]) => (
                    <TableRow key={key} item={value}/>
                ))}
            </Table>
        </div>
    );
}

export default UsersTable;