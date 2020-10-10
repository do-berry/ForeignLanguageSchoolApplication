import React, {useContext} from 'react';
import {Alert} from "react-bootstrap";
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
            <table>
                <tr>
                    <th>Imie</th>
                    <th>Nazwisko</th>
                    <th>Przypisz do grupy</th>
                    <th>Szczegoly</th>
                </tr>
                {Object.entries(users).map(([key, value]) => (
                    <TableRow key={key} item={value}/>
                ))}
            </table>
        </div>
    );
}

export default UsersTable;