import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Cat from './CatLoad';
import Header from './Header';
import { Grid } from "@material-ui/core";
class Majors extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log("majors mounted")
    }

    render(){
        return (
          <Grid container direction="column">
            <Grid item container justify="center" alignItems="center">
              <Grid item xs={false} sm={2} />
                <Cat />
              </Grid>
            </Grid>
        );
      }
};
export default Majors;