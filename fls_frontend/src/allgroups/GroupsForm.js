import React, {useContext, useEffect} from 'react';
import {Alert, Table} from 'react-bootstrap';
import TableRow from "./TableRow";
import './Table.css';
import {SavedAssignmentContext} from "../SavedAssignmentContext";
import {AllGroupsContext} from "./AllGroupsContext";
import {FilteredGroupsContext} from "./FilteredGroupsContext";

const GroupsForm = () => {
    const [groups, setGroups] = useContext(AllGroupsContext);
    const [filteredGroups, setFilteredGroups] = useContext(FilteredGroupsContext);
    const [savedAssignment, setSavedAssignment] = useContext(SavedAssignmentContext);

    useEffect(() => {
        let myGroups = []

        fetch('http://127.0.0.1:8000/school/allgroups')
            .then(response => response.json())
            .then(response => {
                Object.entries(response).map(([key, value]) => {
                    return myGroups.push(value);
                })
                setGroups(myGroups);
                setFilteredGroups(myGroups);
            });
    }, []);

    React.useEffect(() => {
        return () => {
            sessionStorage.removeItem('person');
        };
    }, []);

    return (
        <div className='groupsTable'>
            {savedAssignment === true &&
            <Alert id='okAlert' bsStyle="warning">
                Użytkownik został przypisany do grupy.
            </Alert>
            }
            {savedAssignment === false &&
            <Alert id='okAlert' bsStyle="warning">
                <strong>Użytkownik nie został przypisany do grupy.</strong> Należy wybrać inną grupę.
            </Alert>
            }
            <Table striped bordered condensed hover id='allgroups'>
                <tr>
                    <th>sala</th>
                    <th>godzina</th>
                    <th>dzień</th>
                    <th>język</th>
                    <th>poziom</th>
                    <th>opłata</th>
                    <th>plan zajęć</th>
                    {sessionStorage.getItem('person') && <th>Przypisz</th>}
                </tr>
                {Object.entries(filteredGroups).map(([key, value]) => (
                    <TableRow key={value} item={value}/>
                ))}
            </Table>
        </div>
    );
}

export default GroupsForm;