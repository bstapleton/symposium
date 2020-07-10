import React, { Component, useEffect, useState } from "react";
import EmailBox from "../components/EmailBox";
import PasswordBox from "../components/PasswordBox";
import Notification from "../components/Notification";

const Login = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        console.log(errors.length, email, password);
    });

    function redirectOnSuccess(url) {
        // TODO - handle global state for successfully logged in - currently none of the header links dynamically update
        const { history } = this.props;

        history.push(url);
    }

    function handleFailure(status) {
        errors =
            status === 401
                ? "The email or password you entered was not correct."
                : "Something went wrong."; // TODO - make an error array for status code responses
    }

    function handleFieldChange(event) {
        setEmail(email => event.target.value);
        console.log(email);
        // this.setState({
        //     [event.target.name]: event.target.value
        // });
    }

    function handleLogin(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        if (email === "") {
            setErrors(errors => [...errors, "Email cannot be blank"]);
        }

        if (password === "") {
            setErrors(errors => [...errors, "Password cannot be blank"]);
        }

        console.log(errors);

        axios
            .post("/login", formData)
            .then(response => {
                if (response.data.token) {
                    // save app state with user date in local storage
                    localStorage["symposiumToken"] = response.data.token; // TODO - this is not global; a successful login is not reflected in other components, e.g. Header with its user links.

                    this.props.successMethod("/");
                } else {
                    errors =
                        errors.length > 0
                            ? errors
                            : "The email or password is incorrect, please try again.";
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className={"wrapper margin--center"}>
            {/* {errors.length ? (
                <div className={"notification notification--error"}>
                    {errors.map(error => {
                        <p key={error}>{error}</p>;
                    })}
                </div>
            ) : null} */}
            <form onSubmit={handleLogin.bind(this)}>
                {errors.length > 0 ? (
                    <Notification
                        title="Login failed"
                        type="error"
                        content={errors}
                    />
                ) : null}
                <div>
                    <EmailBox
                        name={"test"}
                        label={"test label"}
                        onChangeMethod={e => setEmail(e.target.value)}
                    />
                    <label htmlFor={"email"}>Email address</label>
                    <input
                        type={"email"}
                        name={"email"}
                        id={"email"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {/* TODO: see if the field component can handle its own error flagging so it doesn't need to be declared for every single field on the parent */}
                </div>
                <PasswordBox
                    name={"password"}
                    label={"Password"}
                    isRequired={true}
                    existingValue={""}
                    onChangeMethod={handleFieldChange.bind(this)}
                />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;
