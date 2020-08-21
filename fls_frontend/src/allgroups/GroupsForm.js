import React from 'react';
import {Alert, Table} from 'react-bootstrap';
import TableRow from "./TableRow";
import './Table.css';

class GroupsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
        };
    }

    componentDidMount() {
        let myGroups = []

        fetch('http://127.0.0.1:8000/school/allgroups')
            .then(response => response.json())
            .then(response => {
                Object.entries(response).map(([key, value]) => {
                    myGroups.push(value);
                })
                this.setState({groups: myGroups})
            });
    }

    render() {
        return (
            <div className='groupsTable'>
                {sessionStorage.getItem('saved') === 'true' &&
                <Alert id='okAlert' bsStyle="warning">
                    Uzytkownik zostal przypisany do grupy.
                </Alert>
                }
                <Table striped bordered condensed hover>
                    <thead>
                    <th>sala</th>
                    <th>godzina</th>
                    <th>dzien</th>
                    <th>jezyk</th>
                    <th>poziom</th>
                    <th>oplata</th>
                    <th>x</th>
                    </thead>
                    <tbody>
                    {Object.entries(this.state.groups).map(([key, value]) => (
                        <TableRow key={value} item={value}/>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default GroupsForm;