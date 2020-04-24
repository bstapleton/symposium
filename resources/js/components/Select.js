import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
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
                <select
                    name={this.props.name}
                    id={this.props.name}
                    onChange={this.onChange.bind(this)}
                    defaultValue={this.state.existingValue}
                >
                    <option value={this.props.defaultOption.value}>{this.props.defaultOption.text}</option>
                    {this.props.options.map(option =>
                        <option key={option.id} value={option.id}>{option.title}</option>
                    )}
                </select>
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

Select.propTypes = {
    name: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    existingValue: PropTypes.string,
    options: PropTypes.array.isRequired,
    defaultOption: PropTypes.object,
    onChangeMethod: PropTypes.func,
}

export default Select;
