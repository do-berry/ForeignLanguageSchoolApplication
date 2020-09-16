import React from 'react';
import UsersTable from "./UsersTable";
import './AllUsers.css';
import FindUser from "./FindUser";
import {AllUsersProvider} from "../AllUsersContext";

class UsersForm extends React.Component {
    render() {
        return (
            <AllUsersProvider>
                <div className='usersForm'>
                    <FindUser/>
                    <UsersTable/>
                </div>
            </AllUsersProvider>
        );
    }
}

export default UsersForm;