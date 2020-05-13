import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Reviews extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log("reviews mounted")
    }

    render(){
        return(
            <div>Here are the reviews</div>
        );
    }
};
export default Reviews;