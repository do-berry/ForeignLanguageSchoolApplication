import React, {useContext, useEffect, useState} from 'react';
import {Alert, Table} from 'react-bootstrap';
import TableRow from "./TableRow";
import './Table.css';
import {SavedAssignmentContext} from "../SavedAssignmentContext";
import {AllGroupsContext} from "./AllGroupsContext";
import {FilteredGroupsContext} from "./FilteredGroupsContext";
import ReactPaginate from "react-paginate";

const GroupsForm = () => {
    const [groups, setGroups] = useContext(AllGroupsContext);
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredGroups, setFilteredGroups] = useContext(FilteredGroupsContext);
    const [savedAssignment, setSavedAssignment] = useContext(SavedAssignmentContext);

    useEffect(() => {
        let myGroups = []

        fetch('http://127.0.0.1:8000/school/allgroups')
            .then(response => response.json())
            .then(response => {
                Object.entries(response).map(([key, value]) => {
                    return myGroups.push(value);
                })
                setGroups(myGroups);
                setFilteredGroups(myGroups);
            });
    }, []);

    React.useEffect(() => {
        return () => {
            sessionStorage.removeItem('person');
        };
    }, []);

    const PER_PAGE = 10;

    const offset = currentPage * PER_PAGE;

    const currentPageData = filteredGroups
        .slice(offset, offset + PER_PAGE);

    const pageCount = Math.ceil(filteredGroups.length / PER_PAGE);

    function handlePageClick({selected: selectedPage}) {
        setCurrentPage(selectedPage);
    }

    return (
        <div className='groupsTable'>
            {savedAssignment === true &&
            <Alert id='okAlert' bsStyle="warning">
                Użytkownik został przypisany do grupy.
            </Alert>
            }
            {savedAssignment === false &&
            <Alert id='okAlert' bsStyle="warning">
                <strong>Użytkownik nie został przypisany do grupy.</strong> Należy wybrać inną grupę.
            </Alert>
            }
            <Table striped bordered condensed hover id='allgroups'>
                <tr>
                    <th>sala</th>
                    <th>godzina</th>
                    <th>dzień</th>
                    <th>język</th>
                    <th>poziom</th>
                    <th>opłata</th>
                    <th>plan zajęć</th>
                    {sessionStorage.getItem('person') && <th>Przypisz</th>}
                </tr>
                {Object.entries(currentPageData).map(([key, value]) => (
                    <TableRow key={value} item={value}/>
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

export default GroupsForm;