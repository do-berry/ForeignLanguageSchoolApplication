import React from 'react';
import FindUser from "./FindUser";
import UsersTable from "./UsersTable";
import './AllUsers.css';

class UsersForm extends React.Component {
    render() {
        return (
            <div className='usersForm'>
                <FindUser/>
                <UsersTable/>
            </div>
        );
    }
}

export default UsersForm;