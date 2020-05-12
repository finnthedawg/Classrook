import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Majors extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log("majors mounted")
    }

    render(){
        return(
            <div>Majors Here</div>
        );
    }
};
export default Majors;