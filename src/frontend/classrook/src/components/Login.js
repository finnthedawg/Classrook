import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
    container: {
        width: "100vw",
        height: "100vh",
        background: "#2E3B55",
        display: "flex"
    },
    subcontainer: {
        margin: "auto",
    },
    typo: {
        color: "white",
        marginTop: "50px",
        marginBottom: "25px"
    }
})

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            auth: false,
            invalid: false
        }
    }

    responseGoogle = (res) => {
        // send a request to get JWT

        if (sessionStorage.getItem("user") === null) {
            axios.post('http://localhost:8000/get_by_email/', { email: res.profileObj.email})
                .then(response => {
                    console.log(response)
                    if (response.data.email !== "notfound") {
                        sessionStorage.setItem("user", response.data.username)
                        this.setState({
                            auth: true,
                        })
                    } else {
                        this.setState({
                            invalid: true
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    render() {
        const { classes } = this.props

        if (this.state.auth !== true && sessionStorage.getItem("username") === null) {
            return (
                <div className={classes.container}>
                    <div className={classes.subcontainer}>
                        <Typography variant="h3" className={classes.typo}>Welcome to Classrook!</Typography>
                        <GoogleLogin
                            clientId="905854699284-dtmkc21n3alikca15cs78eeicmq9mioq.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                        />
                        {this.state.invalid ? (
                            <Typography variant='h4' className={classes.typo}>Sorry, you do not have permission to access this interface</Typography>
                        ) : (
                            null
                        )}
                    </div>
                </div>
            );
        }
        else {
            return (<Redirect to="/content" />)
        }
    }
}

const emailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
const alphanumericOnly = new RegExp("^[a-zA-Z0-9]*$")

function passwordLongEnough(password) {
    return password.length >= 8
}

function passwordHasSpecialChars(password) {
    return !alphanumericOnly.test(password)
}

function emailValid(email) {
    return emailRegex.test(email)
}

function checkSignedIn() {
    return true;
}

function checkSignInProvider() {
    return "google";
}

function availableSignInOptions() {
    return ["Google", "Guest"]
}

function checkEmailExists(email, listOfEmails) {
    return listOfEmails.includes(email);
}

function conversion(password) {
    return '*'.repeat(password.length)
}

function passwordEntered(password) {
    return !(password.length === 0)
}

export default withStyles(styles)(Login)

export { passwordEntered, conversion, checkEmailExists, checkSignedIn, checkSignInProvider, availableSignInOptions, emailValid, emailRegex, passwordHasSpecialChars, passwordLongEnough }
