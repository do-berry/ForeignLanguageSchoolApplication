import React from "react";

class TableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.surname}</td>
                <td><Button bsStyle="info">Wybierz</Button></td>
            </tr>
        );
    }
}

export default TableRow;