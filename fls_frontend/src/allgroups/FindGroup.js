import React, {useContext, useState} from 'react';
import {Button, FormGroup} from "react-bootstrap";
import {Language, LanguageLevel} from "../stores/SchoolStore";
import './Table.css';
import {AllGroupsContext} from "./AllGroupsContext";
import {FilteredGroupsContext} from "./FilteredGroupsContext";

const FindGroup = () => {
    const [noData, setNoDate] = useState(false);
    const [level, setLevel] = useState(LanguageLevel.A1);
    const [language, setLanguage] = useState(Language.ENG);
    const [groups, setGroups] = useContext(AllGroupsContext);
    const [filteredGroups, setFilteredGroups] = useContext(FilteredGroupsContext);

    function findGroups() {
        setFilteredGroups(groups.filter(item => {
            if (item.language_level === level
                && item.language_name === language) {
                return item;
            }
        }));
    }

    return (
        <div id='findGroup'>
            <br/>
            <form>
                <FormGroup controlId="formBasicText">
                    <div id='selects'>
                        <select id='myselect'
                                className="form-control"
                                value={level}
                                onChange={e => setLevel(e.target.value)}>
                            {Object.keys(LanguageLevel).map(item =>
                                <option value={item}>{LanguageLevel[item]}</option>
                            )}
                        </select>
                        <select id='myselect'
                                className="form-control"
                                value={language}
                                onChange={e => setLanguage(e.target.value)}>
                            {Object.keys(Language).map(item =>
                                <option value={item}>{Language[item]}</option>
                            )}
                        </select>
                    </div>
                </FormGroup>
                <Button bsStyle="info" onClick={findGroups}>Szukaj</Button>
            </form>
        </div>
    );
}

export default FindGroup;