import React from 'react';
import './GroupsForm.js';
import GroupsForm from "./GroupsForm";
import {SavedAssignmentProvider} from "../SavedAssignmentContext";
import FindGroup from "./FindGroup";
import {AllGroupsProvider} from "./AllGroupsContext";
import {FilteredGroupsProvider} from "./FilteredGroupsContext";

class AllGroups extends React.Component {
    render() {
        return (
            <SavedAssignmentProvider>
                <AllGroupsProvider>
                    <FilteredGroupsProvider>
                        <div className='groupsForm'>
                            <h1>Wyszukiwanie grup</h1>
                            <FindGroup/>
                            <br/>
                            <GroupsForm/>
                        </div>
                    </FilteredGroupsProvider>
                </AllGroupsProvider>
            </SavedAssignmentProvider>
        );
    }
}

export default AllGroups;