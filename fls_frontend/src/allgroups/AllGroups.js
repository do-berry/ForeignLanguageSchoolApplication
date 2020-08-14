import React from 'react';
import './GroupsForm.js';
import GroupsForm from "./GroupsForm";

class AllGroups extends React.Component {
    render() {
        return (
            <div className='groupsForm'>
                <GroupsForm/>
            </div>
        );
    }
}

export default AllGroups;