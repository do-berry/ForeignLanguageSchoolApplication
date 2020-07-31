import React from 'react';
import { FormControl } from 'react-bootstrap';

class InputField extends React.Component {
  render() {
    return (
        <div>
            <FormControl
                className='inputField'
                type={this.props.type}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={(e) => this.props.onChange(e.target.value)}
            />
        </div>
    )
  }
}

export default InputField;
