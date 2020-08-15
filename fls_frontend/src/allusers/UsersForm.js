import React from 'react';
import UsersTable from "./UsersTable";
import './AllUsers.css';
import FindUser from "./FindUser";

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