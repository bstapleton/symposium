import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmailBox from "../EmailBox";
import PasswordBox from "../PasswordBox";
import Notification from '../Notification';
import TextBox from '../TextBox';

class RegisterForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password_confirm: '',
            name: '',
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
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        formData.append('name', this.state.name);

        if (this.state.email === '') {
            errors.push('Email cannnot be blank');
        }

        if (this.state.password === '') {
            errors.push('Password cannnot be blank');
        }

        if (this.state.name === '') {
            errors.push('Display name cannot be blank');
        }

        if (this.state.password_confirm !== this.state.password) {
            errors.push('Passwords do not match');
        }

        axios.post('/api/user/register', formData)
            .then(response => {
                console.log(response);
                return response;
            })
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
                    localStorage["appState"] = JSON.stringify(appState);

                    this.setState({
                        isLoggedIn: appState.isLoggedIn,
                        user: appState.user
                    });

                    this.props.successMethod('/');
                } else {
                    this.setState({ errors: errors.length > 0 ? errors : 'There was a problem D:' });
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
                <TextBox
                    name={'name'}
                    label={'Display name'}
                    isRequired={true}
                    existingValue={this.state.name}
                    onChangeMethod={this.handleFieldChange}
                />
                <PasswordBox
                    name={'password'}
                    label={'Password'}
                    isRequired={true}
                    existingValue={null}
                    onChangeMethod={this.handleFieldChange}
                />
                <PasswordBox
                    name={'password_confirm'}
                    label={'Password confirmation'}
                    isRequired={true}
                    existingValue={null}
                    onChangeMethod={this.handleFieldChange}
                    match={'password'}
                />
                <button>Register</button>
            </form>
        );
    }
}

RegisterForm.propTypes = {
    successMethod: PropTypes.func.isRequired,
    failMethod: PropTypes.func.isRequired,
}

export default RegisterForm;
