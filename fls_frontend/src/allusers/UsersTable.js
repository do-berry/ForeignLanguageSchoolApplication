import React, {useContext} from 'react';
import {Alert, Table} from "react-bootstrap";
import TableRow from "../allusers/TableRow";
import {AllUsersContext} from "../AllUsersContext";

const UsersTable = () => {
    const [users] = useContext(AllUsersContext);

    return (
        <div className='usersTable'>
            {users.length <= 0 &&
            <Alert bsStyle="warning" id='alert'>
                <strong>Brak wynikow dla zapytania.</strong>
            </Alert>
            }
            <Table striped bordered condensed hover>
                <thead>
                <th>Imie</th>
                <th>Nazwisko</th>
                <th>x</th>
                </thead>
                <tbody>
                {Object.entries(users).map(([key, value]) => (
                    <TableRow key={key} item={value}/>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default UsersTable;