import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PasswordBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
            existingValue: this.props.existingValue,
        }
    }

    onChange(event) {
        this.setState({
            existingValue: event.target.value,
            error: this.props.isRequired && event.target.value === '' ? 'Required field!' : null,
            errorInfo: this.props.isRequired && event.target.value === '' ? 'This is a required field' : null
        });

        this.props.onChangeMethod(event);
    }

    render() {
        return (
            <div>
                <input
                    type={'password'}
                    name={this.props.name}
                    id={this.props.name}
                    value={this.state.existingValue}
                    onChange={this.onChange.bind(this)}
                />
                {this.state.error !== null ?
                    <div>
                        <strong>Error: {this.state.error}</strong>
                        <p>{this.state.errorInfo}</p>
                    </div>
                : null}
            </div>
        )
    }
}

PasswordBox.propTypes = {
    name: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    existingValue: PropTypes.string,
    onChangeMethod: PropTypes.func,
}

export default PasswordBox;
