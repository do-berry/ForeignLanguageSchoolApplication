import React, {useContext, useEffect, useState} from 'react';
import {Alert, Table} from "react-bootstrap";
import TableRow from "../allusers/TableRow";
import {AllUsersContext} from "../AllUsersContext";
import {FilteredUsersContext} from "../FilteredUsersContext";
import ReactPaginate from 'react-paginate';
import './AllUsers.css';


const UsersTable = () => {
    const [users, setUsers] = useContext(AllUsersContext);
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredUsers, setFilteredUsers] = useContext(FilteredUsersContext);

    const PER_PAGE = 10;

    const offset = currentPage * PER_PAGE;

    const currentPageData = filteredUsers
        .slice(offset, offset + PER_PAGE);

    const pageCount = Math.ceil(filteredUsers.length / PER_PAGE);

    useEffect(() => {
        let myUsers = [];

        fetch('http://127.0.0.1:8000/allpersons', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(response => {
                console.log(response);
                if (Object.keys(response).length > 0) {
                    Object.entries(response).map(([key, value]) => {
                        return myUsers.push(value);
                    })
                    setUsers(myUsers);
                    setFilteredUsers(myUsers);
                } else {
                    setUsers([]);
                }
            });
    }, []);

    function handlePageClick({selected: selectedPage}) {
        setCurrentPage(selectedPage);
    }

    return (
        <div className='usersTable'>
            {filteredUsers.length <= 0 &&
            <Alert bsStyle="warning" id='alert'>
                <strong>Brak wynikow dla zapytania.</strong>
            </Alert>
            }
            <Table striped bordered condensed hover>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Przypisz do grupy</th>
                    <th>Płatności</th>
                </tr>
                {Object.entries(currentPageData).map(([key, value]) => (
                    <TableRow key={key} item={value}/>
                ))}
            </Table>
            <div
                id='pagination'>
                <ReactPaginate
                    previousLabel={"← Poprzednia"}
                    nextLabel={"Następna →"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    disabledClassName={"pagination__link--disabled"}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
            </div>
        </div>
    );
}

export default UsersTable;