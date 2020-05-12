import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Header from './Header';

class User extends Component{
    constructor(props){
        super(props)
        this.state = {
            username : sessionStorage.getItem("user"),
            email : sessionStorage.getItem("email"),
            credits : sessionStorage.getItem("credits")
        }
    }

    componentDidMount(){
        console.log("user mounted")
    }

    render(){
       return(
        <>
       <div>Welcome {this.state.username}</div>
       <div>Email: {this.state.email}</div>
       <div>Number of available credits: {this.state.credits}</div>
        </>
    );
    }
};
export default User;