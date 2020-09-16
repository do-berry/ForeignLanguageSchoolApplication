import React from 'react';
import UsersForm from "./UsersForm";

class AllUsers extends React.Component {
    render() {
        return (
            <div className='alluserstable'>
                <UsersForm/>
            </div>
        );
    }
}

export default AllUsers;