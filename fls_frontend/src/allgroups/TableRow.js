import React from 'react';
import {Day, Language, LanguageLevel} from '../stores/SchoolStore';
import AssignToGroupButton from "./AssignToGroupButton";
import './Table.css';

class TableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.item.room}</td>
                <td>{this.props.item.date_hour}</td>
                <td>{Day[this.props.item.date_day]}</td>
                <td>{Language[this.props.item.language.name]}</td>
                <td>{LanguageLevel[this.props.item.language.level]}</td>
                <td>{this.props.item.language.cost}</td>
                <td><AssignToGroupButton/></td>
            </tr>
        );
    }
}

export default TableRow;