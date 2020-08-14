import React from 'react';
import {Alert, Table} from "react-bootstrap";
import TableRow from "../allgroups/TableRow";

class UsersTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    render() {
        return (
            <div className='usersTable'>
                {this.state.users.length <= 0 &&
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
                    {this.state.users.map((item) =>
                        <TableRow item={item}/>
                    )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default UsersTable;