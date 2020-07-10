import React, { Component } from "react";
import PropTypes from "prop-types";

class PasswordBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
            existingValue: this.props.existingValue
        };
    }

    onChange(event) {
        this.setState({
            existingValue: event.target.value,
            error:
                this.props.isRequired && event.target.value === ""
                    ? "Required field!"
                    : null,
            errorInfo:
                this.props.isRequired && event.target.value === ""
                    ? "This is a required field"
                    : null
        });

        if (this.props.match && this.props.match !== "") {
            let expectedValue = document.getElementById(this.props.match).value;

            if (event.target.value !== expectedValue) {
                this.setState({
                    error: "No match",
                    errorInfo: "Passwords do not match."
                });
            }
        }

        this.props.onChangeMethod(event);
    }

    render() {
        return (
            <div>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <input
                    type={"password"}
                    name={this.props.name}
                    id={this.props.name}
                    value={this.state.existingValue ?? ""}
                    onChange={this.onChange.bind(this)}
                />
                {this.state.error !== null ? (
                    <div>
                        <strong>Error: {this.state.error}</strong>
                        <p>{this.state.errorInfo}</p>
                    </div>
                ) : null}
            </div>
        );
    }
}

PasswordBox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    existingValue: PropTypes.string,
    onChangeMethod: PropTypes.func,
    match: PropTypes.string
};

export default PasswordBox;
