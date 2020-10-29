import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {AssignedGroupsTableRow} from "./AssignedGroupsTableRow";
import './UserProfile.css';

export const AssignedGroups = () => {
    let [assignedGroupsData, setAssignedGroupsData] = useState([]);

    useEffect(() => {
        let groups = [];
        fetch('http://127.0.0.1:8000/user/groupsassigned', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: sessionStorage.getItem('userId')
            })
        }).then(res => res.json())
            .then(data => {
                if (Object.keys(data).length > 0) {
                    data.map(item => {
                        groups.push(item)
                    });
                    setAssignedGroupsData(groups);
                } else {
                    setAssignedGroupsData([]);
                }
            });
    }, []);

    return (
        <div id='assignedGroups'>
            <h4>Przypisany do grup</h4>
            <Table striped bordered condensed hover>
                <thead>
                <th>Sala</th>
                <th>Godzina</th>
                <th>Dzien</th>
                <th>Jezyk</th>
                <th>Poziom</th>
                <th>Wybierz</th>
                </thead>
                <tbody>
                {Object.entries(assignedGroupsData).map(([key, value]) => (
                    <AssignedGroupsTableRow key={key} item={value}/>
                ))}
                </tbody>
            </Table>
        </div>
    );
}