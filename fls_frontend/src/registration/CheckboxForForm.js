import React from 'react';
import {Checkbox} from "react-bootstrap";

class CheckboxForForm extends React.Component {
    handleChange = (e) => {
        this.props.onChange(e.target.checked);
    }

    render() {
        return(
            <div className='checkbox'>
                <Checkbox
                    onChange={this.handleChange()}
                />
            </div>
        );
    }
}

export default CheckboxForForm;