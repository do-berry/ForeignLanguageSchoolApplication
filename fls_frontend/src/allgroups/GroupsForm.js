import React, {useContext, useEffect, useState} from 'react';
import {Alert, Table} from 'react-bootstrap';
import TableRow from "./TableRow";
import './Table.css';
import {SavedAssignmentContext} from "../SavedAssignmentContext";

const GroupsForm = () => {
    const [groups, setGroups] = useState([]);
    const [savedAssignment, setSavedAssignment] = useContext(SavedAssignmentContext);

    useEffect(() => {
        let myGroups = []
        setSavedAssignment(null);

        fetch('http://127.0.0.1:8000/school/allgroups')
            .then(response => response.json())
            .then(response => {
                Object.entries(response).map(([key, value]) => {
                    myGroups.push(value);
                })
                setGroups(myGroups);
            });
    }, []);

    return (
        <div className='groupsTable'>
            {savedAssignment === true &&
            <Alert id='okAlert' bsStyle="warning">
                Uzytkownik zostal przypisany do grupy.
            </Alert>
            }
            {savedAssignment === false &&
            <Alert id='okAlert' bsStyle="warning">
                <strong>Uzytkownik nie zostal przypisany do grupy.</strong> Nalezy wybrac inna grupe.
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
                {Object.entries(groups).map(([key, value]) => (
                    <TableRow key={value} item={value}/>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default GroupsForm;