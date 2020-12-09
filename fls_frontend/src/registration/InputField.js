import React from "react";
import {FormControl} from "react-bootstrap";

class InputField extends React.Component {
    render() {
        return (
            <div className='inputField'>
                <FormControl
                    type={this.props.type}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChange={(e) => this.props.onChange(e.target.value)}
                    disabled={this.props.disabled}
                />
            </div>
        );
    }
}

export default InputField;