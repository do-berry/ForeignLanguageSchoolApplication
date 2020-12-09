import React from 'react';
import UsersForm from "./UsersForm";

class AllUsers extends React.Component {

    componentDidMount() {
        sessionStorage.removeItem("person");
        sessionStorage.removeItem("group");
    }

    render() {
        return (
            <div className='alluserstable'>
                <h1>Wyszukiwanie użytkowników</h1>
                <UsersForm/>
            </div>
        );
    }
}

export default AllUsers;