import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Reviews extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log("reviews mounted")
    }

    render(){
        return(
            <div>Reviews Here</div>
        );
    }
};
export default Reviews;