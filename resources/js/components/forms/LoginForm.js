import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmailBox from "../EmailBox";
import PasswordBox from "../PasswordBox";

class LoginForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: []
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRedirection = this.handleRedirection.bind(this);
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleRedirection(url) {
        this.props.handleRedirection(url);
    }

    handleLogin(event) {
        event.preventDefault();

        const auth = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post('/api/login', auth)
            .then(response => {
                if (response.status === 200) {
                    this.props.successMethod('/');
                }
            })
            .catch((error) => {
                this.props.failMethod(error.response.status);
            });
    }

    render() {
        return(
            <form onSubmit={this.handleLogin}>
                <EmailBox
                    name={'email'}
                    isRequired={true}
                    existingValue={this.state.email}
                    onChangeMethod={this.handleFieldChange}
                />
                <PasswordBox
                    name={'password'}
                    isRequired={true}
                    existingValue={this.state.password}
                    onChangeMethod={this.handleFieldChange}
                />
                <button>Login</button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    successMethod: PropTypes.func.isRequired,
    failMethod: PropTypes.func.isRequired,
}

export default LoginForm;
