import React from 'react';
import UsersForm from "./UsersForm";

class AllUsers extends React.Component {
    render() {
        return (
            <div className='alluserstable'>
                <h1>Wyszukiwanie uzytkownikow</h1>
                <UsersForm/>
            </div>
        );
    }
}

export default AllUsers;