import React, { Component } from 'react';
import LoginForm from "../forms/LoginForm";

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            error: '',
        }

        this.redirectOnSuccess = this.redirectOnSuccess.bind(this);
        this.handleFailure = this.handleFailure.bind(this);
    }

    redirectOnSuccess(url) {
        // TODO - handle global state for successfully logged in - currently none of the header links dynamically update
        const { history } = this.props;

        history.push(url);
    }

    handleFailure(status) {
        this.setState({
            error: status === 401 ? 'The email or password you entered was not correct.' : 'Something went wrong.', // TODO - make an error array for status code responses
        });
    }

    render () {
        return (
            <div className={'wrapper margin--center'}>
                {this.state.error !== '' ?
                    <div className={'notification notification--error'}>
                        {this.state.error}
                    </div>
                : null}
                <LoginForm
                    successMethod={this.redirectOnSuccess}
                    failMethod={this.handleFailure}
                />
            </div>
        )
    }
}

export default Login;
