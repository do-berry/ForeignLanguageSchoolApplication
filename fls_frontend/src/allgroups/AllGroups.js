import React from 'react';
import './GroupsForm.js';
import GroupsForm from "./GroupsForm";
import {SavedAssignmentProvider} from "../SavedAssignmentContext";

class AllGroups extends React.Component {
    render() {
        return (
            <SavedAssignmentProvider>
                <div className='groupsForm'>
                    <h1>Wyszukiwanie grup</h1>
                    <br/>
                    <GroupsForm/>
                </div>
            </SavedAssignmentProvider>
        );
    }
}

export default AllGroups;