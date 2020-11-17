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
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Przypisz do grupy</th>
                    <th>Płatności</th>
                </tr>
                {Object.entries(users).map(([key, value]) => (
                    <TableRow key={key} item={value}/>
                ))}
            </Table>
        </div>
    );
}

export default UsersTable;