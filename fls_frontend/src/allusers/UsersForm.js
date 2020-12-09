import React from 'react';
import UsersTable from "./UsersTable";
import './AllUsers.css';
import FindUser from "./FindUser";
import {AllUsersProvider} from "../AllUsersContext";
import {FilteredUsersProvider} from "../FilteredUsersContext";

class UsersForm extends React.Component {
    render() {
        return (
            <AllUsersProvider>
                <FilteredUsersProvider>
                    <div className='usersForm'>
                        <FindUser/>
                        <UsersTable/>
                    </div>
                </FilteredUsersProvider>
            </AllUsersProvider>
        );
    }
}

export default UsersForm;