import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmailBox from "../EmailBox";
import PasswordBox from "../PasswordBox";
import Notification from '../Notification';

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
        let errors = [];

        let formData = new FormData();
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);

        if (this.state.email === '') {
            errors.push('Email cannnot be blank');
        }

        if (this.state.password === '') {
            errors.push('Password cannnot be blank');
        }

        axios.post('/api/user/login', formData)
            .then(json => {
                if (json.data.success) {
                    let userData = {
                        name: json.data.data.name,
                        id: json.data.data.id,
                        role_id: json.data.data.role_id,
                        rank_id: json.data.data.rank_id,
                        email: json.data.data.email,
                        auth_token: json.data.data.auth_token,
                        timestamp: new Date().toString()
                    };

                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    };

                    // save app state with user date in local storage
                    localStorage["appState"] = JSON.stringify(appState); // TODO - this is not global; a successful login is not reflected in other components, e.g. Header with its user links.

                    this.setState({
                        isLoggedIn: appState.isLoggedIn,
                        user: appState.user
                    });

                    this.props.successMethod('/');
                } else {
                    this.setState({ errors: errors.length > 0 ? errors : 'The email or password is incorrect, please try again.' });
                }
            })
            .catch(error => {
                this.setState({ errors: [error] });
            });
    }

    render() {
        return(
            <form onSubmit={this.handleLogin}>
                {this.state.errors.length > 0 ?
                    <Notification
                        title='Login failed'
                        type='error'
                        content={this.state.errors}
                    />
                : null}
                <EmailBox
                    name={'email'}
                    label={'Email address'}
                    isRequired={true}
                    existingValue={this.state.email}
                    onChangeMethod={this.handleFieldChange}
                />
                <PasswordBox
                    name={'password'}
                    label={'Password'}
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
