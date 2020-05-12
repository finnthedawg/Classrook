import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Header from "./Header"
import Content from "./Content"

class Landing extends Component{
  render(){
    return (
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>
        <Grid item container justify="center" alignItems="center">
          <Grid item xs={false} sm={2} />
            <Content />
          </Grid>
        </Grid>
    );
  }
};

export default Landing;