import React from 'react';
import './GroupsForm.js';
import GroupsForm from "./GroupsForm";
import {SavedAssignmentProvider} from "../SavedAssignmentContext";
import FindGroup from "./FindGroup";
import {AllGroupsProvider} from "./AllGroupsContext";
import {FilteredGroupsProvider} from "./FilteredGroupsContext";

class AllGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: 0
        }
    }

    componentDidMount() {
        this.setState({
            person: sessionStorage.getItem('person')
        });
        sessionStorage.removeItem('person');
    }

    render() {
        return (
            <SavedAssignmentProvider>
                <AllGroupsProvider>
                    <FilteredGroupsProvider>
                        <div className='groupsForm'>
                            <h1>Wyszukiwanie grup</h1>
                            <FindGroup/>
                            <br/>
                            <GroupsForm person={this.state.person}/>
                        </div>
                    </FilteredGroupsProvider>
                </AllGroupsProvider>
            </SavedAssignmentProvider>
        );
    }
}

export default AllGroups;