import React from 'react';
import {Table} from 'react-bootstrap';
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
        fetch('http://127.0.0.1:8000/school/allgroups')
            .then(response => response.json())
            .then(response => this.setState({
                groups: Object.assign(this.state.groups, response)
            }));
        console.log(this.state.groups);
    }

    render() {
        return (
            <div className='groupsTable'>
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
                    {this.state.groups.map((item) =>
                        <TableRow item={item}/>
                    )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default GroupsForm;