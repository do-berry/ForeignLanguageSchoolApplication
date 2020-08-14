import React from 'react';
import {Button} from "react-bootstrap";


class AssignToGroupButton extends React.Component {
    constructor(props) {
        super();
        this.state = {
            person: null,
            group: null,
            saved: null
        }
    }

    handleChange = () => {
        fetch('http://127.0.0.1:8000/user/assigntogroup', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                person: this.state.person,
                group: this.state.group,
            })
        }).then(res => {
            if (res.ok) {
                console.log("ok");
            } else {
                console.log("not ok");
            }
        });
    }

    render() {
        return (
            <div className='saveInGroupButton'>
                {/*{this.state.saved === true &&*/}
                {/*    <AssignmentResultPopover strong_message="aaa"/>*/}
                {/*}*/}
                <Button onClick={this.handleChange} overlay={this.popoverForButton}>Zapisz</Button>
            </div>
        );
    }
}

export default AssignToGroupButton;