import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {AssignedGroupsTableRow} from "./AssignedGroupsTableRow";
import './UserProfile.css';
import ReactPaginate from "react-paginate";

export const AssignedGroups = () => {
    let [assignedGroupsData, setAssignedGroupsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        let groups = [];
        fetch('http://127.0.0.1:8000/user/groupsassigned', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: sessionStorage.getItem('userId')
            })
        }).then(res => res.json())
            .then(data => {
                if (Object.keys(data).length > 0) {
                    data.map(item => {
                        groups.push(item)
                    });
                    setAssignedGroupsData(groups);
                } else {
                    setAssignedGroupsData([]);
                }
            });
    }, []);

    const PER_PAGE = 10;

    const offset = currentPage * PER_PAGE;

    const currentPageData = assignedGroupsData
        .slice(offset, offset + PER_PAGE);

    const pageCount = Math.ceil(assignedGroupsData.length / PER_PAGE);

    function handlePageClick({selected: selectedPage}) {
        setCurrentPage(selectedPage);
    }

    return (
        <div id='assignedGroups'>
            <h4>Przypisany do grup</h4>
            <Table striped bordered condensed hover>
                <thead>
                <th>Sala</th>
                <th>Godzina</th>
                <th>Dzień</th>
                <th>Język</th>
                <th>Poziom</th>
                <th>Wybierz</th>
                </thead>
                <tbody>
                {Object.entries(currentPageData).map(([key, value]) => (
                    <AssignedGroupsTableRow key={key} item={value}/>
                ))}
                </tbody>
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